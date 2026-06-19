#!/bin/bash
# ============================================================
# 湖北盐业荆州分公司 · 营销智能管理系统
# GitHub Pages 一键部署脚本
# ============================================================
# 使用方法：
#   1. 安装 GitHub CLI: https://cli.github.com/
#   2. 登录: gh auth login
#   3. 运行: bash deploy.sh
# ============================================================

set -e

REPO_NAME="jingzhou-salt-system"
DEPLOY_DIR="/workspace/jingzhou-salt-system"

echo "=========================================="
echo "  湖北盐业荆州分公司 · 智能管理系统部署"
echo "=========================================="
echo ""

# 检查 gh CLI
if ! command -v gh &> /dev/null; then
    echo "❌ 未安装 GitHub CLI"
    echo "请先安装: https://cli.github.com/"
    echo "macOS: brew install gh"
    echo "Ubuntu: sudo apt install gh"
    exit 1
fi

# 检查登录状态
if ! gh auth status &> /dev/null; then
    echo "❌ 未登录 GitHub，请先运行: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI 已就绪"
echo ""

# 获取用户名
USERNAME=$(gh api user --jq .login)
echo "👤 GitHub 用户: $USERNAME"
echo ""

# 检查仓库是否已存在
REPO_EXISTS=$(gh repo view "$USERNAME/$REPO_NAME" --json name 2>/dev/null || echo "")

if [ -n "$REPO_EXISTS" ]; then
    echo "📦 仓库已存在: $USERNAME/$REPO_NAME"
    echo "   将更新现有文件..."
    cd /tmp
    rm -rf "$REPO_NAME"
    gh repo clone "$USERNAME/$REPO_NAME" "$REPO_NAME"
    cd "$REPO_NAME"
else
    echo "📦 创建新仓库: $USERNAME/$REPO_NAME"
    gh repo create "$REPO_NAME" --public --description "湖北盐业荆州分公司营销智能管理系统" --source "$DEPLOY_DIR"
    cd /tmp
    rm -rf "$REPO_NAME"
    gh repo clone "$USERNAME/$REPO_NAME" "$REPO_NAME"
    cd "$REPO_NAME"
fi

# 复制文件
echo "📁 复制文件..."
cp "$DEPLOY_DIR/index.html" .
cp -r "$DEPLOY_DIR/.github" .
cp "$DEPLOY_DIR/README.md" .

# 提交和推送
echo "⬆️ 推送到 GitHub..."
git add -A
git commit -m "部署荆州盐业智能管理系统 $(date +%Y-%m-%d)" || true
git branch -M main
git push origin main --force

# 启用 GitHub Pages
echo "🌐 启用 GitHub Pages..."
gh api "repos/$USERNAME/$REPO_NAME/pages" -X POST -f "build_type=workflow" 2>/dev/null || true

echo ""
echo "=========================================="
echo "  ✅ 部署完成！"
echo "=========================================="
echo ""
echo "📍 系统地址: https://$USERNAME.github.io/$REPO_NAME/"
echo "👤 登录账号: admin"
echo "🔑 登录密码: jzsalt2024"
echo ""
echo "⏳ 首次部署约需1-2分钟生效"
echo "📊 查看部署状态: https://github.com/$USERNAME/$REPO_NAME/actions"
echo ""
