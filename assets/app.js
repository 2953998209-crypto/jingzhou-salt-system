/* ============================================================
   湖北盐业荆州分公司 · 营销智能管理系统
   核心应用逻辑
   ============================================================ */

// ===== 全局数据 =====
var inventoryData = [];
var customerData = [];
var kpiData = [];
var deliveryMap = null;
var mapInitialized = false;
var chartInstances = {};

// ===== 初始化库存数据（来自Excel） =====
function initInventoryData() {
  inventoryData = [
    {
      name: '500g碘盐（九凤来）',
      records: [
        {date:'期初', summary:'上期结存', opening:3048, increase:null, decrease:null, closing:3048},
        {date:'2026/6/7', summary:'6月初入库', opening:null, increase:67, decrease:null, closing:3115},
        {date:'2026/6/7', summary:'销售出库（门店）', opening:null, increase:null, decrease:3, closing:3112},
        {date:'2026/6/8', summary:'沙市长港路门店', opening:null, increase:null, decrease:29, closing:3083},
        {date:'2026/6/8', summary:'沙市湖滨门店', opening:null, increase:null, decrease:120, closing:2963},
        {date:'2026/6/8', summary:'小袁代理商', opening:null, increase:null, decrease:6, closing:2957},
        {date:'2026/6/9', summary:'沙市超市代理', opening:null, increase:null, decrease:5, closing:2952},
        {date:'2026/6/10', summary:'沙市等4户到货', opening:null, increase:1600, decrease:null, closing:4552},
        {date:'2026/6/10', summary:'沙市批发商', opening:null, increase:null, decrease:95, closing:4457},
        {date:'2026/6/11', summary:'沙市超市补货', opening:null, increase:null, decrease:2, closing:4455},
        {date:'2026/6/11', summary:'沙市代理商', opening:null, increase:null, decrease:50, closing:4405},
        {date:'2026/6/12', summary:'无名代理', opening:null, increase:null, decrease:2, closing:4403},
        {date:'2026/6/12', summary:'电商批单入库', opening:null, increase:200, decrease:null, closing:4603},
        {date:'2026/6/12', summary:'沙市超市补货入库', opening:null, increase:400, decrease:null, closing:5003},
        {date:'2026/6/12', summary:'盘点确认出库', opening:null, increase:null, decrease:5, closing:4998},
        {date:'2026/6/12', summary:'盘点调整出库', opening:null, increase:null, decrease:2, closing:1741},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:1741}
      ]
    },
    {
      name: '500g纸塑盐（九凤来）',
      records: [
        {date:'期初', summary:'上期结存', opening:3848, increase:null, decrease:null, closing:3848},
        {date:'2026/6/4', summary:'期初结存确认', opening:null, increase:null, decrease:null, closing:3848},
        {date:'2026/6/5', summary:'销售出库', opening:null, increase:null, decrease:8, closing:3840},
        {date:'2026/6/5', summary:'门店补货出库', opening:null, increase:null, decrease:1, closing:3839},
        {date:'2026/6/5', summary:'代理商取货出库', opening:null, increase:null, decrease:470, closing:3369},
        {date:'2026/6/10', summary:'沙市批发到货', opening:null, increase:1200, decrease:null, closing:4569},
        {date:'2026/6/10', summary:'出库', opening:null, increase:null, decrease:3, closing:4566},
        {date:'2026/6/11', summary:'出库', opening:null, increase:null, decrease:1, closing:4565},
        {date:'2026/6/11', summary:'出库', opening:null, increase:null, decrease:10, closing:4555},
        {date:'2026/6/12', summary:'沙市超市补货出库', opening:null, increase:null, decrease:2, closing:4553},
        {date:'2026/6/12', summary:'盘点调整出库', opening:null, increase:null, decrease:15, closing:4538},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:714}
      ]
    },
    {
      name: '400g绿色精制碘盐',
      records: [
        {date:'期初', summary:'上期结存', opening:1047, increase:null, decrease:null, closing:1047},
        {date:'2026/3/5', summary:'期初结存', opening:null, increase:null, decrease:null, closing:1047},
        {date:'2026/3/12', summary:'出库', opening:null, increase:null, decrease:5, closing:1042},
        {date:'2026/3/12', summary:'出库', opening:null, increase:null, decrease:1, closing:1041},
        {date:'2026/3/17', summary:'出库', opening:null, increase:null, decrease:3, closing:1038},
        {date:'2026/3/20', summary:'出库', opening:null, increase:null, decrease:50, closing:988},
        {date:'2026/3/22', summary:'入库', opening:null, increase:50, decrease:null, closing:1038},
        {date:'2026/3/23', summary:'出库调整', opening:null, increase:null, decrease:8, closing:1030},
        {date:'2026/3/24', summary:'出库', opening:null, increase:null, decrease:9, closing:1021},
        {date:'2026/4/15', summary:'出库', opening:null, increase:null, decrease:20, closing:1001},
        {date:'2026/4/30', summary:'出库', opening:null, increase:null, decrease:10, closing:991},
        {date:'2026/5/11', summary:'出库', opening:null, increase:null, decrease:5, closing:986},
        {date:'2026/6/10', summary:'出库', opening:null, increase:null, decrease:4, closing:982},
        {date:'2026/6/10', summary:'出库', opening:null, increase:null, decrease:4, closing:978},
        {date:'2026/6/11', summary:'出库', opening:null, increase:null, decrease:3, closing:975},
        {date:'2026/6/12', summary:'出库', opening:null, increase:null, decrease:2, closing:973},
        {date:'2026/6/12', summary:'出库', opening:null, increase:null, decrease:11, closing:962},
        {date:'2026/6/12', summary:'出库', opening:null, increase:null, decrease:2, closing:960},
        {date:'2026/6/13', summary:'盘点结转', opening:null, increase:null, decrease:null, closing:359}
      ]
    },
    {
      name: '400g绿色未加碘盐',
      records: [
        {date:'期初', summary:'上期结存', opening:411, increase:null, decrease:null, closing:411},
        {date:'2026/6/1', summary:'期初结存', opening:null, increase:null, decrease:null, closing:411},
        {date:'2026/6/8', summary:'期初结存确认', opening:null, increase:null, decrease:null, closing:411},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:411}
      ]
    },
    {
      name: '320g低钠盐',
      records: [
        {date:'期初', summary:'上期结存', opening:147, increase:null, decrease:null, closing:147},
        {date:'2026/3/17', summary:'期初结存', opening:null, increase:null, decrease:null, closing:147},
        {date:'2026/3/20', summary:'入库', opening:null, increase:50, decrease:null, closing:197},
        {date:'2026/3/22', summary:'出库', opening:null, increase:null, decrease:1, closing:196},
        {date:'2026/3/23', summary:'入库', opening:null, increase:8, decrease:null, closing:204},
        {date:'2026/3/24', summary:'出库', opening:null, increase:null, decrease:1, closing:203},
        {date:'2026/4/15', summary:'出库', opening:null, increase:null, decrease:1, closing:202},
        {date:'2026/4/30', summary:'出库', opening:null, increase:null, decrease:2, closing:200},
        {date:'2026/5/11', summary:'出库', opening:null, increase:null, decrease:9, closing:191},
        {date:'2026/6/2', summary:'出库', opening:null, increase:null, decrease:6, closing:185},
        {date:'2026/6/10', summary:'出库', opening:null, increase:null, decrease:9, closing:176},
        {date:'2026/6/11', summary:'出库', opening:null, increase:null, decrease:8, closing:168},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:168}
      ]
    },
    {
      name: '350g海藻碘盐',
      records: [
        {date:'期初', summary:'上期结存', opening:22, increase:null, decrease:null, closing:22},
        {date:'2026/3/17', summary:'期初结存', opening:null, increase:null, decrease:null, closing:22},
        {date:'2026/3/20', summary:'入库', opening:null, increase:50, decrease:null, closing:72},
        {date:'2026/3/22', summary:'出库', opening:null, increase:null, decrease:1, closing:71},
        {date:'2026/3/24', summary:'出库', opening:null, increase:null, decrease:1, closing:70},
        {date:'2026/4/15', summary:'出库', opening:null, increase:null, decrease:2, closing:68},
        {date:'2026/4/30', summary:'出库', opening:null, increase:null, decrease:2, closing:66},
        {date:'2026/6/2', summary:'出库', opening:null, increase:null, decrease:9, closing:57},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:57}
      ]
    },
    {
      name: '200g加碘雪花盐',
      records: [
        {date:'期初', summary:'上期结存', opening:50, increase:null, decrease:null, closing:50},
        {date:'2026/3/2', summary:'期初结存', opening:null, increase:null, decrease:null, closing:50},
        {date:'2026/3/5', summary:'出库', opening:null, increase:null, decrease:5, closing:45},
        {date:'2026/3/5', summary:'出库', opening:null, increase:null, decrease:1, closing:44},
        {date:'2026/4/4', summary:'出库', opening:null, increase:null, decrease:4, closing:40},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:40}
      ]
    },
    {
      name: '200g未加碘雪花盐',
      records: [
        {date:'期初', summary:'上期结存', opening:147, increase:null, decrease:null, closing:147},
        {date:'2025/12/1', summary:'期初结存', opening:null, increase:null, decrease:null, closing:147},
        {date:'2025/12/19', summary:'入库', opening:null, increase:50, decrease:null, closing:197},
        {date:'2025/12/21', summary:'出库', opening:null, increase:null, decrease:20, closing:177},
        {date:'2025/12/26', summary:'出库', opening:null, increase:null, decrease:10, closing:167},
        {date:'2025/12/26', summary:'出库', opening:null, increase:null, decrease:4, closing:163},
        {date:'2026/1/2', summary:'出库', opening:null, increase:null, decrease:3, closing:160},
        {date:'2026/6/3', summary:'出库', opening:null, increase:null, decrease:4, closing:156},
        {date:'2026/6/5', summary:'出库', opening:null, increase:null, decrease:5, closing:151},
        {date:'2026/6/11', summary:'出库', opening:null, increase:null, decrease:11, closing:140},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:140}
      ]
    },
    {
      name: '350g未加碘海精盐',
      records: [
        {date:'期初', summary:'上期结存', opening:79, increase:null, decrease:null, closing:79},
        {date:'2026/3/2', summary:'期初结存', opening:null, increase:null, decrease:null, closing:79},
        {date:'2026/4/30', summary:'出库', opening:null, increase:null, decrease:1, closing:78},
        {date:'2026/6/9', summary:'出库', opening:null, increase:null, decrease:4, closing:74},
        {date:'2026/6/9', summary:'出库', opening:null, increase:null, decrease:5, closing:69},
        {date:'2026/6/12', summary:'出库', opening:null, increase:null, decrease:1, closing:68},
        {date:'2026/6/12', summary:'出库', opening:null, increase:null, decrease:2, closing:66},
        {date:'2026/6/13', summary:'盘点调整出库', opening:null, increase:null, decrease:1, closing:65},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:65}
      ]
    },
    {
      name: '320g未加碘藏青盐',
      records: [
        {date:'期初', summary:'上期结存', opening:40, increase:null, decrease:null, closing:40},
        {date:'2026/6/1', summary:'期初结存', opening:null, increase:null, decrease:null, closing:40},
        {date:'2026/6/15', summary:'结转下期', opening:null, increase:null, decrease:null, closing:40}
      ]
    }
  ];
}

// ===== 初始化客户数据 =====
function initCustomerData() {
  var areas = ['沙市城区','荆州城区','流通西片区','流通东片区'];
  var types = ['商超零售','餐饮配送','食品加工','批发代理','便利店'];
  var contacts = ['张经理','李主任','王主管','刘店长','陈老板','赵经理','孙总','周主任','吴经理','郑店长','钱主管','冯老板'];
  var streets_shashi = ['北京路','长港路','湖滨路','江汉路','红门路','塔桥路','白云路','园林路','三湾路','豉湖路'];
  var streets_jingzhou = ['荆南路','荆州大道','郢都路','学苑路','屈原路','西门街','东门街','南门大街','御河路','武德路'];
  var streets_west = ['太湖港路','李埠镇','弥市镇','马山镇','川店镇','八岭山镇','纪南镇'];
  var streets_east = ['观音垱镇','岑河镇','锣场镇','关沮镇','立新乡','联合乡'];
  var allStreets = [streets_shashi, streets_jingzhou, streets_west, streets_east];
  var shopNames = ['好邻居超市','中百仓储','武商量贩','大润发','沃尔玛','永辉超市','家乐福','本地便利','惠民超市','鑫盛商行','华联超市','万方超市','福星超市','天天便利','百佳超市','顺达商行','宏达超市','金鑫便利','利民超市','新天地超市','兴隆商行','万家乐','喜洋洋超市','佳乐福','亿客隆','诚信商行','兴旺超市','福满家','家和超市','汇丰商行'];
  var credits = ['A','A','A','B','B','B','C'];

  customerData = [];
  var id = 1;
  for (var a = 0; a < areas.length; a++) {
    var count = [180, 140, 95, 85][a];
    for (var i = 0; i < count; i++) {
      var typeIdx = Math.floor(Math.random() * types.length);
      var street = allStreets[a][Math.floor(Math.random() * allStreets[a].length)];
      var shop = shopNames[Math.floor(Math.random() * shopNames.length)] + '(' + street + (Math.floor(Math.random()*50)+1) + '号)';
      var vol = typeIdx === 3 ? Math.floor(Math.random()*500)+100 : Math.floor(Math.random()*80)+5;
      customerData.push({
        id: 'JZ' + String(id++).padStart(4,'0'),
        name: shop,
        area: areas[a],
        type: types[typeIdx],
        contact: contacts[Math.floor(Math.random()*contacts.length)],
        phone: '1' + ['3','5','7','8','9'][Math.floor(Math.random()*5)] + String(Math.floor(Math.random()*900000000)+100000000),
        volume: vol,
        credit: credits[Math.floor(Math.random()*credits.length)],
        status: Math.random() > 0.05 ? '活跃' : '休眠'
      });
    }
  }
}

// ===== 初始化考核数据 =====
function initKpiData() {
  kpiData = [
    {name:'利润（毛利）', target:41.0, actual:33.61, unit:'万元', weight:8, category:'财务'},
    {name:'基础盐+中高端盐', target:298, actual:263, unit:'吨', weight:25, category:'销量'},
    {name:'中高端盐', target:40, actual:29, unit:'吨', weight:15, category:'销量'},
    {name:'大包盐', target:93, actual:70, unit:'吨', weight:6, category:'销量'},
    {name:'武当醋+料酒', target:340, actual:230, unit:'件', weight:6, category:'品类'},
    {name:'小包装白糖', target:2.9, actual:1.8, unit:'吨', weight:6, category:'品类'},
    {name:'渠道品牌维权', target:100, actual:85, unit:'分', weight:30, category:'管理'},
    {name:'日常绩效', target:100, actual:92, unit:'分', weight:6, category:'管理'}
  ];
}

// ===== 工具函数 =====
function showToast(msg, type) {
  var c = document.getElementById('toastContainer');
  var t = document.createElement('div');
  t.className = 'toast ' + (type || 'info');
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(function() { t.style.opacity = '0'; setTimeout(function() { c.removeChild(t); }, 300); }, 3000);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

function formatNum(n) {
  if (n === null || n === undefined) return '-';
  return Number(n).toLocaleString();
}

function getProductStats(product) {
  var totalIn = 0, totalOut = 0, lastStock = 0;
  product.records.forEach(function(r) {
    if (r.increase) totalIn += r.increase;
    if (r.decrease) totalOut += r.decrease;
    if (r.closing !== null) lastStock = r.closing;
  });
  return { totalIn: totalIn, totalOut: totalOut, stock: lastStock };
}

// ===== Tab切换 =====
function switchTab(tab) {
  document.querySelectorAll('.nav-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
  document.querySelector('[data-tab="'+tab+'"]').classList.add('active');
  document.getElementById('panel-'+tab).classList.add('active');

  if (tab === 'delivery' && !mapInitialized) {
    setTimeout(initMap, 100);
  }
  if (tab === 'delivery' && mapInitialized) {
    setTimeout(function() { deliveryMap.invalidateSize(); }, 100);
  }
  if (tab === 'inventory') {
    setTimeout(function() {
      Object.keys(chartInstances).forEach(function(k) {
        if (chartInstances[k]) chartInstances[k].resize();
      });
    }, 100);
  }
}

// ===== 时钟 =====
function updateClock() {
  var now = new Date();
  var str = now.getFullYear() + '-' +
    String(now.getMonth()+1).padStart(2,'0') + '-' +
    String(now.getDate()).padStart(2,'0') + ' ' +
    String(now.getHours()).padStart(2,'0') + ':' +
    String(now.getMinutes()).padStart(2,'0') + ':' +
    String(now.getSeconds()).padStart(2,'0');
  document.getElementById('headerTime').textContent = str;
}

// ============================================================
// TAB 1: 库存进销存看板
// ============================================================
function renderInventoryDashboard() {
  renderInventoryKpi();
  renderProductGrid();
  renderInventoryCharts();
  renderProductFilter();
  renderDetailTable();
}

function renderInventoryKpi() {
  var totalStock = 0, totalIn = 0, totalOut = 0, productCount = inventoryData.length;
  inventoryData.forEach(function(p) {
    var s = getProductStats(p);
    totalStock += s.stock;
    totalIn += s.totalIn;
    totalOut += s.totalOut;
  });

  var html = '';
  html += '<div class="kpi-card blue"><div class="kpi-label">产品品类</div><div class="kpi-value">'+productCount+'</div><div class="kpi-sub">在管盐产品数</div></div>';
  html += '<div class="kpi-card green"><div class="kpi-label">当前总库存</div><div class="kpi-value">'+formatNum(totalStock)+'</div><div class="kpi-sub">件</div></div>';
  html += '<div class="kpi-card orange"><div class="kpi-label">累计入库</div><div class="kpi-value">'+formatNum(totalIn)+'</div><div class="kpi-sub">件</div></div>';
  html += '<div class="kpi-card yellow"><div class="kpi-label">累计出库</div><div class="kpi-value">'+formatNum(totalOut)+'</div><div class="kpi-sub">件</div></div>';
  document.getElementById('inventoryKpiRow').innerHTML = html;
}

function renderProductGrid() {
  var html = '';
  inventoryData.forEach(function(p, idx) {
    var s = getProductStats(p);
    html += '<div class="product-card" onclick="selectProduct('+idx+')">';
    html += '<div class="name">'+p.name+'</div>';
    html += '<div class="stats">';
    html += '<div class="stat-item"><span class="stat-label">当前库存</span><span class="stat-value stock">'+formatNum(s.stock)+'</span></div>';
    html += '<div class="stat-item"><span class="stat-label">累计入库</span><span class="stat-value in">+'+formatNum(s.totalIn)+'</span></div>';
    html += '<div class="stat-item"><span class="stat-label">累计出库</span><span class="stat-value out">-'+formatNum(s.totalOut)+'</span></div>';
    html += '<div class="stat-item"><span class="stat-label">周转率</span><span class="stat-value">'+(s.stock>0?(s.totalOut/s.stock).toFixed(1):'0')+'</span></div>';
    html += '</div></div>';
  });
  document.getElementById('productGrid').innerHTML = html;
}

function selectProduct(idx) {
  document.querySelectorAll('.product-card').forEach(function(c) { c.classList.remove('selected'); });
  document.querySelectorAll('.product-card')[idx].classList.add('selected');
  document.getElementById('productFilter').value = inventoryData[idx].name;
  renderDetailTable();
}

function renderProductFilter() {
  var sel = document.getElementById('productFilter');
  sel.innerHTML = '<option value="all">全部产品</option>';
  inventoryData.forEach(function(p) {
    sel.innerHTML += '<option value="'+p.name+'">'+p.name+'</option>';
  });

  var sel2 = document.getElementById('recProduct');
  sel2.innerHTML = '';
  inventoryData.forEach(function(p) {
    sel2.innerHTML += '<option value="'+p.name+'">'+p.name+'</option>';
  });
}

function renderDetailTable() {
  var pf = document.getElementById('productFilter').value;
  var tf = document.getElementById('typeFilter').value;
  var tbody = document.getElementById('detailTableBody');
  var html = '';

  inventoryData.forEach(function(p) {
    if (pf !== 'all' && p.name !== pf) return;
    p.records.forEach(function(r) {
      if (r.date === '期初' || r.summary === '上期结存' || r.summary === '结转下期') return;
      var type = '其他';
      var qty = 0;
      if (r.increase && r.increase > 0) { type = '入库'; qty = r.increase; }
      if (r.decrease && r.decrease > 0) { type = '出库'; qty = r.decrease; }
      if (tf !== 'all' && type !== tf && type !== '其他') return;
      if (tf !== 'all' && type === '其他') return;

      var badge = type === '入库' ? 'badge-green' : type === '出库' ? 'badge-red' : 'badge-blue';
      html += '<tr>';
      html += '<td>'+r.date+'</td>';
      html += '<td>'+p.name+'</td>';
      html += '<td>'+(r.summary||'-')+'</td>';
      html += '<td><span class="badge '+badge+'">'+type+'</span></td>';
      html += '<td>'+(qty>0?(type==='入库'?'+':'-')+formatNum(qty):'-')+'</td>';
      html += '<td>'+formatNum(r.closing)+'</td>';
      html += '</tr>';
    });
  });
  tbody.innerHTML = html;
}

function renderInventoryCharts() {
  renderStockBarChart();
  renderStockPieChart();
  renderTrendChart();
  renderTurnoverChart();
}

function renderStockBarChart() {
  var names = [], stocks = [];
  inventoryData.forEach(function(p) {
    names.push(p.name.length > 8 ? p.name.substring(0,8)+'...' : p.name);
    stocks.push(getProductStats(p).stock);
  });

  var chart = echarts.init(document.getElementById('chartStockBar'), null, {renderer:'svg'});
  chart.setOption({
    tooltip: {trigger:'axis', appendToBody:true},
    grid: {left:60, right:20, top:20, bottom:80},
    xAxis: {type:'category', data:names, axisLabel:{color:'#7a8ba8', rotate:30, fontSize:10}, axisLine:{lineStyle:{color:'#253553'}}},
    yAxis: {type:'value', axisLabel:{color:'#7a8ba8'}, splitLine:{lineStyle:{color:'#253553'}}, axisLine:{lineStyle:{color:'#253553'}}},
    series: [{
      type:'bar', data:stocks, barWidth:'50%',
      itemStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'#00d4ff'},{offset:1,color:'#006688'}])},
      label:{show:true, position:'top', color:'#e8edf5', fontSize:11}
    }]
  });
  chartInstances.stockBar = chart;
  window.addEventListener('resize', function(){chart.resize();});
}

function renderStockPieChart() {
  var data = [];
  var colors = ['#00d4ff','#ff6b35','#00e676','#ffd740','#ff4757','#a855f7','#06b6d4','#f97316','#84cc16','#ec4899'];
  inventoryData.forEach(function(p, i) {
    data.push({value:getProductStats(p).stock, name:p.name, itemStyle:{color:colors[i%colors.length]}});
  });

  var chart = echarts.init(document.getElementById('chartStockPie'), null, {renderer:'svg'});
  chart.setOption({
    tooltip:{trigger:'item', appendToBody:true, formatter:'{b}: {c}件 ({d}%)'},
    legend:{type:'scroll', bottom:0, textStyle:{color:'#7a8ba8',fontSize:10}, pageTextStyle:{color:'#7a8ba8'}},
    series:[{
      type:'pie', radius:['35%','65%'], center:['50%','45%'],
      label:{color:'#e8edf5', fontSize:10},
      data:data
    }]
  });
  chartInstances.stockPie = chart;
  window.addEventListener('resize', function(){chart.resize();});
}

function renderTrendChart() {
  var dates = ['6/7','6/8','6/9','6/10','6/11','6/12','6/13','6/15'];
  var inData = [67,0,0,1600,0,600,0,0];
  var outData = [3,155,5,98,52,24,0,0];

  var chart = echarts.init(document.getElementById('chartTrend'), null, {renderer:'svg'});
  chart.setOption({
    tooltip:{trigger:'axis', appendToBody:true},
    legend:{data:['入库','出库'], textStyle:{color:'#7a8ba8'}, top:0},
    grid:{left:50, right:20, top:40, bottom:30},
    xAxis:{type:'category', data:dates, axisLabel:{color:'#7a8ba8'}, axisLine:{lineStyle:{color:'#253553'}}},
    yAxis:{type:'value', axisLabel:{color:'#7a8ba8'}, splitLine:{lineStyle:{color:'#253553'}}, axisLine:{lineStyle:{color:'#253553'}}},
    series:[
      {name:'入库', type:'line', data:inData, smooth:true, lineStyle:{color:'#00e676'}, itemStyle:{color:'#00e676'}, areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,230,118,0.3)'},{offset:1,color:'rgba(0,230,118,0)'}])}},
      {name:'出库', type:'line', data:outData, smooth:true, lineStyle:{color:'#ff6b35'}, itemStyle:{color:'#ff6b35'}, areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(255,107,53,0.3)'},{offset:1,color:'rgba(255,107,53,0)'}])}}
    ]
  });
  chartInstances.trend = chart;
  window.addEventListener('resize', function(){chart.resize();});
}

function renderTurnoverChart() {
  var names = [], rates = [];
  inventoryData.forEach(function(p) {
    var s = getProductStats(p);
    names.push(p.name.length > 6 ? p.name.substring(0,6)+'...' : p.name);
    rates.push(s.stock > 0 ? parseFloat((s.totalOut / s.stock).toFixed(2)) : 0);
  });

  var chart = echarts.init(document.getElementById('chartTurnover'), null, {renderer:'svg'});
  chart.setOption({
    tooltip:{trigger:'axis', appendToBody:true},
    grid:{left:100, right:30, top:20, bottom:30},
    xAxis:{type:'value', axisLabel:{color:'#7a8ba8'}, splitLine:{lineStyle:{color:'#253553'}}, axisLine:{lineStyle:{color:'#253553'}}},
    yAxis:{type:'category', data:names, axisLabel:{color:'#7a8ba8',fontSize:10}, axisLine:{lineStyle:{color:'#253553'}}},
    series:[{
      type:'bar', data:rates.map(function(v,i){
        return {value:v, itemStyle:{color: v > 1 ? '#ff6b35' : v > 0.5 ? '#ffd740' : '#00d4ff'}};
      }),
      barWidth:'55%',
      label:{show:true, position:'right', color:'#e8edf5', fontSize:10, formatter:'{c}x'}
    }]
  });
  chartInstances.turnover = chart;
  window.addEventListener('resize', function(){chart.resize();});
}

// ===== 新增记录 =====
function openAddRecordModal() {
  document.getElementById('addRecordModal').classList.add('show');
  document.getElementById('recDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('recQty').value = '';
  document.getElementById('recSummary').value = '';
}

function submitRecord() {
  var product = document.getElementById('recProduct').value;
  var date = document.getElementById('recDate').value;
  var type = document.getElementById('recType').value;
  var qty = parseInt(document.getElementById('recQty').value);
  var summary = document.getElementById('recSummary').value;

  if (!product || !date || !qty || qty <= 0) {
    showToast('请填写完整的记录信息', 'error');
    return;
  }

  var p = inventoryData.find(function(x) { return x.name === product; });
  if (!p) return;

  var lastRecord = p.records[p.records.length - 1];
  var prevStock = lastRecord.closing || 0;
  var newStock = type === 'in' ? prevStock + qty : prevStock - qty;

  p.records.push({
    date: date.replace(/-/g,'/'),
    summary: summary || (type === 'in' ? '手动入库' : '手动出库'),
    opening: null,
    increase: type === 'in' ? qty : null,
    decrease: type === 'out' ? qty : null,
    closing: newStock
  });

  closeModal('addRecordModal');
  showToast('记录已成功录入！', 'success');
  renderInventoryDashboard();
}

function exportInventoryData() {
  var csv = '产品名称,日期,摘要,类型,数量,期末结存\n';
  inventoryData.forEach(function(p) {
    p.records.forEach(function(r) {
      if (r.date === '期初') return;
      var type = r.increase ? '入库' : r.decrease ? '出库' : '其他';
      var qty = r.increase || r.decrease || 0;
      csv += p.name+','+r.date+','+(r.summary||'')+','+type+','+qty+','+(r.closing||'')+'\n';
    });
  });
  var blob = new Blob(['\uFEFF'+csv], {type:'text/csv;charset=utf-8'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = '荆州盐业进销存数据_'+new Date().toISOString().split('T')[0]+'.csv';
  a.click();
  showToast('数据导出成功', 'success');
}

// ============================================================
// TAB 2: 客户资料台账看板
// ============================================================
function renderCustomerDashboard() {
  renderCustomerKpi();
  renderCustomerCharts();
  renderCustomerFilters();
  renderCustomerTable();
}

function renderCustomerKpi() {
  var total = customerData.length;
  var active = customerData.filter(function(c){return c.status==='活跃';}).length;
  var areas = {};
  customerData.forEach(function(c){ areas[c.area] = (areas[c.area]||0)+1; });
  var totalVol = customerData.reduce(function(s,c){return s+c.volume;},0);

  var html = '';
  html += '<div class="kpi-card blue"><div class="kpi-label">客户总数</div><div class="kpi-value">'+total+'</div><div class="kpi-sub">活跃 <span class="up">'+active+'</span> / 休眠 <span class="down">'+(total-active)+'</span></div></div>';
  html += '<div class="kpi-card green"><div class="kpi-label">覆盖区域</div><div class="kpi-value">'+Object.keys(areas).length+'</div><div class="kpi-sub">四大片区全覆盖</div></div>';
  html += '<div class="kpi-card orange"><div class="kpi-label">月均总用量</div><div class="kpi-value">'+formatNum(totalVol)+'</div><div class="kpi-sub">件/月</div></div>';
  html += '<div class="kpi-card yellow"><div class="kpi-label">A级客户</div><div class="kpi-value">'+customerData.filter(function(c){return c.credit==='A';}).length+'</div><div class="kpi-sub">优质信用客户</div></div>';
  document.getElementById('customerKpiRow').innerHTML = html;
}

function renderCustomerCharts() {
  var areaData = {};
  var typeData = {};
  customerData.forEach(function(c) {
    areaData[c.area] = (areaData[c.area]||0)+1;
    typeData[c.type] = (typeData[c.type]||0)+1;
  });

  var colors = ['#00d4ff','#ff6b35','#00e676','#ffd740','#a855f7'];

  var chart1 = echarts.init(document.getElementById('chartCustomerArea'), null, {renderer:'svg'});
  chart1.setOption({
    tooltip:{trigger:'axis', appendToBody:true},
    grid:{left:80, right:30, top:20, bottom:30},
    xAxis:{type:'value', axisLabel:{color:'#7a8ba8'}, splitLine:{lineStyle:{color:'#253553'}}, axisLine:{lineStyle:{color:'#253553'}}},
    yAxis:{type:'category', data:Object.keys(areaData), axisLabel:{color:'#7a8ba8'}, axisLine:{lineStyle:{color:'#253553'}}},
    series:[{type:'bar', data:Object.keys(areaData).map(function(k,i){return{value:areaData[k],itemStyle:{color:colors[i%colors.length]}};}), barWidth:'55%', label:{show:true,position:'right',color:'#e8edf5'}}]
  });
  chartInstances.custArea = chart1;
  window.addEventListener('resize',function(){chart1.resize();});

  var chart2 = echarts.init(document.getElementById('chartCustomerType'), null, {renderer:'svg'});
  chart2.setOption({
    tooltip:{trigger:'item', appendToBody:true, formatter:'{b}: {c}户 ({d}%)'},
    series:[{type:'pie', radius:['35%','65%'], center:['50%','50%'], label:{color:'#e8edf5',fontSize:11},
      data:Object.keys(typeData).map(function(k,i){return{value:typeData[k],name:k,itemStyle:{color:colors[i%colors.length]}};})
    }]
  });
  chartInstances.custType = chart2;
  window.addEventListener('resize',function(){chart2.resize();});
}

function renderCustomerFilters() {
  var areas = {}, types = {};
  customerData.forEach(function(c) {
    areas[c.area] = true;
    types[c.type] = true;
  });
  var sel1 = document.getElementById('custAreaFilter');
  sel1.innerHTML = '<option value="all">全部区域</option>';
  Object.keys(areas).forEach(function(a) { sel1.innerHTML += '<option value="'+a+'">'+a+'</option>'; });

  var sel2 = document.getElementById('custTypeFilter');
  sel2.innerHTML = '<option value="all">全部类型</option>';
  Object.keys(types).forEach(function(t) { sel2.innerHTML += '<option value="'+t+'">'+t+'</option>'; });
}

function renderCustomerTable() {
  var af = document.getElementById('custAreaFilter').value;
  var tf = document.getElementById('custTypeFilter').value;
  var search = document.getElementById('custSearch').value.toLowerCase();
  var tbody = document.getElementById('customerTableBody');
  var html = '';

  var filtered = customerData.filter(function(c) {
    if (af !== 'all' && c.area !== af) return false;
    if (tf !== 'all' && c.type !== tf) return false;
    if (search && c.name.toLowerCase().indexOf(search) === -1) return false;
    return true;
  });

  filtered.slice(0, 100).forEach(function(c) {
    var creditBadge = c.credit === 'A' ? 'badge-green' : c.credit === 'B' ? 'badge-yellow' : 'badge-red';
    var statusBadge = c.status === '活跃' ? 'badge-green' : 'badge-red';
    html += '<tr>';
    html += '<td>'+c.id+'</td>';
    html += '<td>'+c.name+'</td>';
    html += '<td>'+c.area+'</td>';
    html += '<td>'+c.type+'</td>';
    html += '<td>'+c.contact+'</td>';
    html += '<td>'+c.phone+'</td>';
    html += '<td>'+formatNum(c.volume)+'</td>';
    html += '<td><span class="badge '+creditBadge+'">'+c.credit+'</span></td>';
    html += '<td><span class="badge '+statusBadge+'">'+c.status+'</span></td>';
    html += '<td><button class="btn" onclick="editCustomer(\''+c.id+'\')">编辑</button></td>';
    html += '</tr>';
  });

  if (filtered.length > 100) {
    html += '<tr><td colspan="10" style="text-align:center;color:#7a8ba8">显示前100条，共'+filtered.length+'条记录</td></tr>';
  }
  tbody.innerHTML = html;
}

function openAddCustomerModal() {
  document.getElementById('addCustomerModal').classList.add('show');
  document.getElementById('custName').value = '';
  document.getElementById('custContact').value = '';
  document.getElementById('custPhone').value = '';
  document.getElementById('custVolume').value = '';
}

function submitCustomer() {
  var name = document.getElementById('custName').value;
  var area = document.getElementById('custArea').value;
  var type = document.getElementById('custType').value;
  var contact = document.getElementById('custContact').value;
  var phone = document.getElementById('custPhone').value;
  var volume = parseInt(document.getElementById('custVolume').value) || 0;
  var credit = document.getElementById('custCredit').value;

  if (!name || !contact || !phone) {
    showToast('请填写完整的客户信息', 'error');
    return;
  }

  var id = 'JZ' + String(customerData.length + 1).padStart(4, '0');
  customerData.push({id:id, name:name, area:area, type:type, contact:contact, phone:phone, volume:volume, credit:credit, status:'活跃'});

  closeModal('addCustomerModal');
  showToast('客户添加成功！', 'success');
  renderCustomerDashboard();
}

function editCustomer(id) {
  showToast('双击客户行可编辑信息（功能开发中）', 'info');
}

// ============================================================
// TAB 3: 分区配送线路看板
// ============================================================
var deliveryZones = [
  {name:'沙市城区', color:'#00d4ff', center:[30.335,112.249], points:[
    {name:'中百仓储北京路店',lat:30.338,lng:112.255},
    {name:'武商量贩长港路店',lat:30.342,lng:112.238},
    {name:'好邻居湖滨路店',lat:30.330,lng:112.242},
    {name:'沃尔玛江汉路店',lat:30.336,lng:112.260},
    {name:'永辉红门路店',lat:30.328,lng:112.248},
    {name:'大润发塔桥路店',lat:30.345,lng:112.235},
    {name:'鑫盛商行白云路',lat:30.332,lng:112.230},
    {name:'惠民超市园林路',lat:30.340,lng:112.245}
  ], volume:2800, orders:156, distance:45},
  {name:'荆州城区', color:'#ff6b35', center:[30.328,112.241], points:[
    {name:'中百仓储荆南路店',lat:30.325,lng:112.240},
    {name:'武商量贩荆州大道',lat:30.335,lng:112.230},
    {name:'好邻居郢都路店',lat:30.320,lng:112.235},
    {name:'万方超市学苑路',lat:30.318,lng:112.250},
    {name:'福星超市屈原路',lat:30.322,lng:112.245},
    {name:'百佳超市西门街',lat:30.330,lng:112.238},
    {name:'顺达商行东门街',lat:30.315,lng:112.242}
  ], volume:2200, orders:128, distance:38},
  {name:'流通西片区', color:'#00e676', center:[30.310,112.200], points:[
    {name:'李埠镇配送点',lat:30.305,lng:112.195},
    {name:'弥市镇配送点',lat:30.280,lng:112.180},
    {name:'马山镇配送点',lat:30.320,lng:112.175},
    {name:'川店镇配送点',lat:30.340,lng:112.165},
    {name:'八岭山镇配送点',lat:30.315,lng:112.190},
    {name:'纪南镇配送点',lat:30.330,lng:112.210}
  ], volume:1600, orders:85, distance:62},
  {name:'流通东片区', color:'#ffd740', center:[30.350,112.280], points:[
    {name:'观音垱镇配送点',lat:30.355,lng:112.285},
    {name:'岑河镇配送点',lat:30.370,lng:112.300},
    {name:'锣场镇配送点',lat:30.345,lng:112.270},
    {name:'关沮镇配送点',lat:30.360,lng:112.260},
    {name:'立新乡配送点',lat:30.338,lng:112.275},
    {name:'联合乡配送点',lat:30.365,lng:112.290}
  ], volume:1400, orders:72, distance:55}
];

function renderDeliveryDashboard() {
  renderDeliveryKpi();
  renderRouteCards();
  renderDeliveryCharts();
}

function renderDeliveryKpi() {
  var totalVol = 0, totalOrders = 0, totalDist = 0;
  deliveryZones.forEach(function(z) { totalVol += z.volume; totalOrders += z.orders; totalDist += z.distance; });

  var html = '';
  html += '<div class="kpi-card blue"><div class="kpi-label">配送片区</div><div class="kpi-value">'+deliveryZones.length+'</div><div class="kpi-sub">覆盖荆州全域</div></div>';
  html += '<div class="kpi-card green"><div class="kpi-label">月配送总量</div><div class="kpi-value">'+formatNum(totalVol)+'</div><div class="kpi-sub">件</div></div>';
  html += '<div class="kpi-card orange"><div class="kpi-label">月订单数</div><div class="kpi-value">'+totalOrders+'</div><div class="kpi-sub">单</div></div>';
  html += '<div class="kpi-card yellow"><div class="kpi-label">总配送里程</div><div class="kpi-value">'+totalDist+'</div><div class="kpi-sub">公里</div></div>';
  document.getElementById('deliveryKpiRow').innerHTML = html;
}

function renderRouteCards() {
  var html = '';
  deliveryZones.forEach(function(z, i) {
    html += '<div class="route-card" onclick="focusZone('+i+')">';
    html += '<div class="route-name"><span class="route-color" style="background:'+z.color+'"></span>'+z.name+'</div>';
    html += '<div class="route-stats">';
    html += '<div><span class="route-stat-label">配送量</span><br><span class="route-stat-value">'+formatNum(z.volume)+'件</span></div>';
    html += '<div><span class="route-stat-label">订单数</span><br><span class="route-stat-value">'+z.orders+'单</span></div>';
    html += '<div><span class="route-stat-label">配送点</span><br><span class="route-stat-value">'+z.points.length+'个</span></div>';
    html += '<div><span class="route-stat-label">里程</span><br><span class="route-stat-value">'+z.distance+'km</span></div>';
    html += '</div></div>';
  });
  document.getElementById('routeCards').innerHTML = html;
}

function initMap() {
  if (mapInitialized) return;
  deliveryMap = L.map('deliveryMap').setView([30.335, 112.249], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'OpenStreetMap'
  }).addTo(deliveryMap);

  deliveryZones.forEach(function(zone) {
    var points = zone.points.map(function(p) { return [p.lat, p.lng]; });
    if (points.length > 1) {
      L.polyline(points, {color:zone.color, weight:3, opacity:0.8, dashArray:'10,5'}).addTo(deliveryMap);
    }
    zone.points.forEach(function(p) {
      L.circleMarker([p.lat, p.lng], {
        radius:6, fillColor:zone.color, color:'#fff', weight:1, opacity:1, fillOpacity:0.9
      }).bindTooltip(p.name, {permanent:false, direction:'top', offset:[0,-10]}).addTo(deliveryMap);
    });
    L.circleMarker(zone.center, {
      radius:10, fillColor:zone.color, color:'#fff', weight:2, opacity:1, fillOpacity:0.7
    }).bindTooltip('<b>'+zone.name+'</b><br>配送量: '+zone.volume+'件', {permanent:false}).addTo(deliveryMap);
  });

  mapInitialized = true;
}

function focusZone(idx) {
  if (!deliveryMap) return;
  var z = deliveryZones[idx];
  document.querySelectorAll('.route-card').forEach(function(c) { c.classList.remove('active'); });
  document.querySelectorAll('.route-card')[idx].classList.add('active');
  deliveryMap.setView(z.center, 13);
}

function renderDeliveryCharts() {
  var names = [], volumes = [], orders = [];
  deliveryZones.forEach(function(z) {
    names.push(z.name);
    volumes.push(z.volume);
    orders.push(z.orders);
  });

  var chart1 = echarts.init(document.getElementById('chartDeliveryVolume'), null, {renderer:'svg'});
  chart1.setOption({
    tooltip:{trigger:'axis', appendToBody:true},
    legend:{data:['配送量(件)','订单数(单)'], textStyle:{color:'#7a8ba8'}, top:0},
    grid:{left:60, right:60, top:40, bottom:30},
    xAxis:{type:'category', data:names, axisLabel:{color:'#7a8ba8'}, axisLine:{lineStyle:{color:'#253553'}}},
    yAxis:{type:'value', axisLabel:{color:'#7a8ba8'}, splitLine:{lineStyle:{color:'#253553'}}, axisLine:{lineStyle:{color:'#253553'}}},
    series:[
      {name:'配送量(件)', type:'bar', data:volumes, barWidth:'35%', itemStyle:{color:'#00d4ff'}},
      {name:'订单数(单)', type:'bar', data:orders, barWidth:'35%', itemStyle:{color:'#ff6b35'}}
    ]
  });
  chartInstances.delVol = chart1;
  window.addEventListener('resize',function(){chart1.resize();});

  var chart2 = echarts.init(document.getElementById('chartDeliveryEfficiency'), null, {renderer:'svg'});
  var efficiency = deliveryZones.map(function(z) { return parseFloat((z.volume / z.distance).toFixed(1)); });
  chart2.setOption({
    tooltip:{trigger:'axis', appendToBody:true},
    radar:{
      indicator: deliveryZones.map(function(z) { return {name:z.name, max:60}; }),
      axisName:{color:'#7a8ba8',fontSize:11},
      splitArea:{areaStyle:{color:['rgba(0,212,255,0.02)','rgba(0,212,255,0.05)']}},
      splitLine:{lineStyle:{color:'#253553'}},
      axisLine:{lineStyle:{color:'#253553'}}
    },
    series:[{
      type:'radar',
      data:[{value:efficiency, name:'配送效率(件/km)',
        areaStyle:{color:'rgba(0,212,255,0.2)'},
        lineStyle:{color:'#00d4ff'},
        itemStyle:{color:'#00d4ff'}
      }]
    }]
  });
  chartInstances.delEff = chart2;
  window.addEventListener('resize',function(){chart2.resize();});
}

// ============================================================
// TAB 4: 销售考核看板
// ============================================================
function renderPerformanceDashboard() {
  renderPerfKpi();
  renderKpiProgressChart();
  renderKpiGaugeRow();
  renderSalesTrendChart();
  renderSalesRankChart();
  renderKpiTable();
}

function renderPerfKpi() {
  var totalScore = 0, totalWeight = 0, completedCount = 0;
  kpiData.forEach(function(k) {
    var rate = k.target > 0 ? k.actual / k.target : 0;
    var score = Math.min(rate, 1) * k.weight;
    totalScore += score;
    totalWeight += k.weight;
    if (rate >= 1) completedCount++;
  });
  var overallRate = totalWeight > 0 ? (totalScore / totalWeight * 100).toFixed(1) : 0;

  var html = '';
  html += '<div class="kpi-card blue"><div class="kpi-label">综合得分</div><div class="kpi-value">'+overallRate+'</div><div class="kpi-sub">满分100分</div></div>';
  html += '<div class="kpi-card green"><div class="kpi-label">已达标项目</div><div class="kpi-value">'+completedCount+'/'+kpiData.length+'</div><div class="kpi-sub">完成率 '+(completedCount/kpiData.length*100).toFixed(0)+'%</div></div>';
  html += '<div class="kpi-card orange"><div class="kpi-label">考核项目</div><div class="kpi-value">'+kpiData.length+'</div><div class="kpi-sub">4大类指标</div></div>';
  html += '<div class="kpi-card yellow"><div class="kpi-label">总权重</div><div class="kpi-value">'+totalWeight+'</div><div class="kpi-sub">分</div></div>';
  document.getElementById('perfKpiRow').innerHTML = html;
}

function renderKpiProgressChart() {
  var names = [], targets = [], actuals = [];
  kpiData.forEach(function(k) {
    names.push(k.name);
    targets.push(k.target);
    actuals.push(k.actual);
  });

  var chart = echarts.init(document.getElementById('chartKpiProgress'), null, {renderer:'svg'});
  chart.setOption({
    tooltip:{trigger:'axis', appendToBody:true},
    legend:{data:['目标','实际'], textStyle:{color:'#7a8ba8'}, top:0},
    grid:{left:120, right:40, top:40, bottom:30},
    xAxis:{type:'value', axisLabel:{color:'#7a8ba8'}, splitLine:{lineStyle:{color:'#253553'}}, axisLine:{lineStyle:{color:'#253553'}}},
    yAxis:{type:'category', data:names, axisLabel:{color:'#e8edf5',fontSize:11}, axisLine:{lineStyle:{color:'#253553'}}},
    series:[
      {name:'目标', type:'bar', data:targets, barWidth:'30%', itemStyle:{color:'#253553'}, label:{show:true,position:'right',color:'#7a8ba8',fontSize:10}},
      {name:'实际', type:'bar', data:actuals.map(function(v,i){
        var rate = targets[i] > 0 ? v / targets[i] : 0;
        return {value:v, itemStyle:{color: rate >= 1 ? '#00e676' : rate >= 0.7 ? '#ffd740' : '#ff4757'}};
      }), barWidth:'30%', label:{show:true,position:'right',color:'#e8edf5',fontSize:10}}
    ]
  });
  chartInstances.kpiProgress = chart;
  window.addEventListener('resize',function(){chart.resize();});
}

function renderKpiGaugeRow() {
  var html = '';
  kpiData.forEach(function(k) {
    var rate = k.target > 0 ? (k.actual / k.target * 100).toFixed(1) : 0;
    var score = Math.min(rate/100, 1) * k.weight;
    var color = rate >= 100 ? '#00e676' : rate >= 70 ? '#ffd740' : '#ff4757';
    html += '<div class="kpi-gauge-card">';
    html += '<div class="gauge-title">'+k.category+'</div>';
    html += '<div class="gauge-name">'+k.name+'</div>';
    html += '<div class="gauge-score" style="color:'+color+'">'+rate+'%</div>';
    html += '<div class="gauge-detail">实际 '+k.actual+k.unit+' / 目标 '+k.target+k.unit+'</div>';
    html += '<div class="progress-bar"><div class="progress-fill" style="width:'+Math.min(rate,100)+'%;background:'+color+'"></div></div>';
    html += '<div class="gauge-detail" style="margin-top:8px">权重 '+k.weight+'分 | 得分 '+score.toFixed(1)+'分</div>';
    html += '</div>';
  });
  document.getElementById('kpiGaugeRow').innerHTML = html;
}

function renderSalesTrendChart() {
  var months = ['1月','2月','3月','4月','5月','6月'];
  var baseSalt = [42,38,45,40,48,52];
  var midHigh = [3,4,5,6,7,8];
  var bigPack = [12,10,14,11,15,13];

  var chart = echarts.init(document.getElementById('chartSalesTrend'), null, {renderer:'svg'});
  chart.setOption({
    tooltip:{trigger:'axis', appendToBody:true},
    legend:{data:['基础盐(吨)','中高端盐(吨)','大包盐(吨)'], textStyle:{color:'#7a8ba8'}, top:0},
    grid:{left:50, right:20, top:40, bottom:30},
    xAxis:{type:'category', data:months, axisLabel:{color:'#7a8ba8'}, axisLine:{lineStyle:{color:'#253553'}}},
    yAxis:{type:'value', name:'吨', nameTextStyle:{color:'#7a8ba8'}, axisLabel:{color:'#7a8ba8'}, splitLine:{lineStyle:{color:'#253553'}}, axisLine:{lineStyle:{color:'#253553'}}},
    series:[
      {name:'基础盐(吨)', type:'line', data:baseSalt, smooth:true, lineStyle:{color:'#00d4ff'}, itemStyle:{color:'#00d4ff'}, areaStyle:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,212,255,0.3)'},{offset:1,color:'rgba(0,212,255,0)'}])}},
      {name:'中高端盐(吨)', type:'line', data:midHigh, smooth:true, lineStyle:{color:'#ff6b35'}, itemStyle:{color:'#ff6b35'}},
      {name:'大包盐(吨)', type:'line', data:bigPack, smooth:true, lineStyle:{color:'#00e676'}, itemStyle:{color:'#00e676'}}
    ]
  });
  chartInstances.salesTrend = chart;
  window.addEventListener('resize',function(){chart.resize();});
}

function renderSalesRankChart() {
  var products = ['500g碘盐','500g纸塑盐','400g绿色碘盐','320g低钠盐','350g海藻碘盐','200g雪花盐','350g海精盐','320g藏青盐','400g未加碘盐','200g未加碘雪花盐'];
  var sales = [488, 515, 140, 38, 17, 10, 18, 0, 0, 57];

  var chart = echarts.init(document.getElementById('chartSalesRank'), null, {renderer:'svg'});
  chart.setOption({
    tooltip:{trigger:'axis', appendToBody:true},
    grid:{left:120, right:40, top:10, bottom:20},
    xAxis:{type:'value', axisLabel:{color:'#7a8ba8'}, splitLine:{lineStyle:{color:'#253553'}}, axisLine:{lineStyle:{color:'#253553'}}},
    yAxis:{type:'category', data:products.reverse(), axisLabel:{color:'#7a8ba8',fontSize:10}, axisLine:{lineStyle:{color:'#253553'}}},
    series:[{type:'bar', data:sales.reverse().map(function(v,i){
      return {value:v, itemStyle:{color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:'#006688'},{offset:1,color:'#00d4ff'}])}};
    }), barWidth:'55%', label:{show:true,position:'right',color:'#e8edf5',fontSize:10}}]
  });
  chartInstances.salesRank = chart;
  window.addEventListener('resize',function(){chart.resize();});
}

function renderKpiTable() {
  var tbody = document.getElementById('kpiTableBody');
  var html = '';
  kpiData.forEach(function(k) {
    var rate = k.target > 0 ? (k.actual / k.target * 100).toFixed(1) : 0;
    var score = Math.min(rate/100, 1) * k.weight;
    var badge = rate >= 100 ? 'badge-green' : rate >= 70 ? 'badge-yellow' : 'badge-red';
    var status = rate >= 100 ? '已达标' : rate >= 70 ? '进行中' : '需加速';
    html += '<tr>';
    html += '<td><span class="badge badge-blue">'+k.category+'</span> '+k.name+'</td>';
    html += '<td>'+k.target+' '+k.unit+'</td>';
    html += '<td>'+k.actual+' '+k.unit+'</td>';
    html += '<td><span class="badge '+badge+'">'+rate+'%</span></td>';
    html += '<td>'+k.weight+'分</td>';
    html += '<td>'+score.toFixed(1)+'分</td>';
    html += '<td><span class="badge '+badge+'">'+status+'</span></td>';
    html += '</tr>';
  });
  tbody.innerHTML = html;
}

function openEditKpiModal() {
  var form = document.getElementById('kpiEditForm');
  var html = '';
  kpiData.forEach(function(k, i) {
    html += '<div style="margin-bottom:16px;padding:12px;background:var(--bg2);border-radius:8px">';
    html += '<div style="font-weight:600;margin-bottom:8px;color:var(--ink)">'+k.name+'</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">';
    html += '<div class="form-group"><label>目标值</label><input type="number" id="kpi_target_'+i+'" value="'+k.target+'" step="0.1"></div>';
    html += '<div class="form-group"><label>实际值</label><input type="number" id="kpi_actual_'+i+'" value="'+k.actual+'" step="0.1"></div>';
    html += '<div class="form-group"><label>权重</label><input type="number" id="kpi_weight_'+i+'" value="'+k.weight+'"></div>';
    html += '</div></div>';
  });
  form.innerHTML = html;
  document.getElementById('editKpiModal').classList.add('show');
}

function submitKpiEdit() {
  kpiData.forEach(function(k, i) {
    k.target = parseFloat(document.getElementById('kpi_target_'+i).value) || k.target;
    k.actual = parseFloat(document.getElementById('kpi_actual_'+i).value) || k.actual;
    k.weight = parseInt(document.getElementById('kpi_weight_'+i).value) || k.weight;
  });
  closeModal('editKpiModal');
  showToast('考核指标已更新！', 'success');
  renderPerformanceDashboard();
}

function resetKpiData() {
  initKpiData();
  showToast('考核数据已重置', 'info');
  renderPerformanceDashboard();
}

// ============================================================
// 初始化
// ============================================================
function init() {
  initInventoryData();
  initCustomerData();
  initKpiData();

  renderInventoryDashboard();
  renderCustomerDashboard();
  renderDeliveryDashboard();
  renderPerformanceDashboard();

  updateClock();
  setInterval(updateClock, 1000);
}

document.addEventListener('DOMContentLoaded', init);
