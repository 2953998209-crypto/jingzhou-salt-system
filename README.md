# 湖北盐业荆州分公司 · 营销智能管理系统

## 系统简介

本系统是湖北盐业集团有限公司荆州分公司营销中心的盐产品库存动态进销存管理看板系统，集成了四大核心看板模块：

- **库存进销存看板**：10个盐产品的实时库存监控、入库出库趋势分析
- **客户资料台账看板**：500+客户信息管理、区域分布与类型分析
- **分区配送线路看板**：荆州四大片区配送路线地图、配送效率分析
- **销售考核看板**：8项KPI指标考核、月度完成进度追踪

## 在线访问

部署后访问地址：`https://<你的GitHub用户名>.github.io/jingzhou-salt-system/`

默认登录账号：
- 用户名：`admin`
- 密码：`jzsalt2024`

## 部署步骤

### 方法一：使用GitHub Actions自动部署（推荐）

1. **Fork或创建仓库**
   - 登录GitHub账号
   - 创建新仓库，命名为 `jingzhou-salt-system`
   - 设置为 **Public**（GitHub Pages免费版需要公开仓库）

2. **上传文件**
   - 将本目录下所有文件上传到仓库根目录
   - 确保 `index.html` 在根目录
   - 确保 `.github/workflows/deploy.yml` 存在

3. **启用GitHub Pages**
   - 进入仓库 Settings -> Pages
   - Source 选择 **GitHub Actions**
   - 系统会自动识别 `deploy.yml` 工作流

4. **等待部署**
   - 进入 Actions 标签页查看部署进度
   - 部署完成后，访问 `https://<用户名>.github.io/jingzhou-salt-system/`

### 方法二：手动部署（传统方式）

1. 创建仓库 `jingzhou-salt-system`
2. 上传 `index.html` 到仓库根目录
3. Settings -> Pages -> Source 选择 `main` 分支，`/` 根目录
4. 保存后等待几分钟，访问生成的URL

## 系统功能

### 库存进销存看板
- 10个盐产品实时库存概览
- 入库/出库趋势图表
- 库存周转率分析
- 进销存明细记录表
- 支持新增记录和导出CSV

### 客户资料台账看板
- 500+客户数据管理
- 区域分布与类型构成图表
- 客户筛选与搜索
- 支持新增客户

### 分区配送线路看板
- Leaflet交互式地图
- 四大片区配送路线
- 配送量与效率统计
- 片区卡片点击聚焦

### 销售考核看板
- 8项KPI指标追踪
- 月度完成进度对比
- 销售趋势与排名分析
- 支持编辑考核指标

## 技术栈

- 纯HTML/CSS/JavaScript，零后端依赖
- ECharts 数据可视化
- Leaflet 地图组件
- 完全自包含，单文件运行

## 自定义配置

### 修改登录密码
编辑 `index.html` 中的 `LOGIN_CONFIG` 对象：

```javascript
var LOGIN_CONFIG = {
  username: 'admin',
  password: '你的新密码'
};
```

### 修改系统标题
编辑 `index.html` 中 header 部分的标题文字。

### 更新库存数据
编辑 `index.html` 中 `initInventoryData()` 函数内的数据。

## 许可证

仅供湖北盐业荆州分公司内部使用。
