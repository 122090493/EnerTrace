## EnerTrace 网页交付说明

本项目已经可以导出为网页静态站点，核心页面包括：

- Daily
- Weekly
- Monthly
- Report
- Settings

对应网页产物目录：

- `dist`

## 本地测试

1. 打开终端并进入项目目录：

```powershell
cd "d:\桌面\GEB2509\成品演示\EnerTraceApp"
```

2. 安装依赖：

```powershell
npm install
```

3. 生成网页：

```powershell
npm run build
```

4. 启动静态网页：

```powershell
npx serve -s dist
```

启动后在浏览器打开终端显示的本地地址即可。

## 直接交付静态网页

- 将 `dist` 文件夹整体打包发送给老师
- 老师将其部署到 Netlify、Vercel 或任意静态服务器即可访问

如果使用 Netlify：

- Build command: `npm run build`
- Publish directory: `dist`

项目中已经提供 `netlify.toml`，可直接用于部署。

## 当前功能说明

- 支持五个底部导航页面切换
- 支持 Quick Check-In 弹窗录入数据
- 支持日、周、月维度浏览
- 支持周报分析与建议展示
- 支持设置页切换与重置示例数据

## 说明

- 当前示例数据已内置，首次打开即可看到与演示图接近的效果
- 用户新增数据会保存在浏览器本地存储中
