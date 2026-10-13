# 张立博的博客

> 博客站点：<https://zhang-libo.github.io>
> 基于 [Jekyll](https://jekyllrb.com/) + [GitHub Pages](https://pages.github.com/) 搭建

## 关于

记录技术学习与思考，主要涉及 Java / Linux / Flutter 方向。
源码在本仓库 [`master`](https://github.com/zhang-libo/zhang-libo.github.io) 分支，
通过 GitHub Actions 自动部署到 `gh-pages` 分支。

## 本地预览

```bash
bundle install
bundle exec jekyll serve --watch
# 访问 http://localhost:4000
```

样式源码在 `less/`，修改后用 `grunt less` 编译到 `css/`（详细见 Gruntfile.js）。

## 文章列表

按发布时间倒序排列，完整列表与历史归档见
[Tags 页面](https://zhang-libo.github.io/tags) 与
[Archive 页面](https://zhang-libo.github.io/archive)。

## 反馈

- 评论区：在每篇文章底部
- Issues：<https://github.com/zhang-libo/zhang-libo.github.io/issues>
- 邮件：zhanglibo610@gmail.com

## License

[MIT](LICENSE)
