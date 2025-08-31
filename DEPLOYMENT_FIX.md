# GitHub Pages 部署修复说明

## 问题
之前的部署导致GitHub Pages显示空白页面。

## 原因
1. **依赖冲突**: `@typechain/hardhat@9.1.0` 要求 `hardhat@^2.9.9`，但项目使用 `hardhat@^3.0.7`
2. **路径配置**: index.html 中的资源路径需要与 vite.config.ts 中的 base 路径一致

## 解决方案

### 1. 添加 .npmrc 文件
创建了 `.npmrc` 文件来解决依赖冲突:
```
legacy-peer-deps=true
```

### 2. 更新 vercel.json (如果使用Vercel部署)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --legacy-peer-deps",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. 修复 index.html 中的图标路径
将 `href="./vite.svg"` 改为 `href="/PropertyTrading/vite.svg"` 以匹配生产环境的 base 路径。

### 4. vite.config.ts 配置
确保生产环境使用正确的 base 路径:
```typescript
base: process.env.NODE_ENV === 'production' ? '/PropertyTrading/' : './'
```

## 部署步骤

### GitHub Pages部署:
1. 提交所有更改到仓库
2. GitHub Actions 会自动触发部署
3. 确保仓库设置中 Pages 源设置为 "GitHub Actions"

### 本地测试:
```bash
# 安装依赖
npm install --legacy-peer-deps

# 构建
npm run build

# 预览
npm run preview
```

## 验证
部署完成后，访问 https://deangelokreiger.github.io/PropertyTrading/ 应该可以看到完整的应用界面。

## 文件清单
已修改的文件:
- ✅ `.npmrc` (新建)
- ✅ `vercel.json` (新建)
- ✅ `index.html` (更新图标路径)
- ✅ `vite.config.ts` (已有正确配置)
- ✅ `.github/workflows/deploy.yml` (已有正确配置)

## 注意事项
- 所有的hardhat相关依赖都在devDependencies中，不会影响前端应用的运行
- 使用 `--legacy-peer-deps` 标志允许npm安装不完全兼容的peer dependencies
- 这不会影响应用的功能，因为hardhat只用于智能合约开发，不用于前端构建
