# ViberSpace

USYD Vibe Coding Club 官网。首页是一张可以点的社团地图，每栋楼对应一个页面：AI 早报、作品展示、活动通知、社团介绍、入门教程、VibeWiki、加入我们、留言板。

纯 HTML / CSS / JS，没有构建步骤。

## 本地预览

```bash
python3 serve.py
```

打开 http://localhost:5173

## 改内容

所有文字内容都在 `js/data.js`：早报、作品、活动、社团介绍、教程、Wiki、常见问题。图片放在 `assets/`。

## 部署（Railway）

仓库根目录有 `Dockerfile`，Railway 会自动用它构建，用 `serve.py` 提供网页，端口读取 Railway 设置的 `PORT`。

1. Railway → New Project → Deploy from GitHub repo → 选这个仓库
2. 部署完成后，在服务的 Settings → Networking 里点 Generate Domain 拿到网址

## 还没接后端的功能

- 留言板和报名表目前只保存在访客自己的浏览器里。报名表在 `js/data.js` 的 `CONFIG.joinFormEndpoint` 填上表单服务地址后会提交过去。
