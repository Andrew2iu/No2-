# Vue2 文章管理系统

一个基于 Vue2 + Element UI 的文章管理系统，支持用户登录注册、文章分类管理、文章发布编辑删除等功能。

## 技术栈

-   **前端框架**: Vue 2.6.x
-   **UI 组件库**: Element UI
-   **状态管理**: Vuex
-   **路由管理**: Vue Router
-   **HTTP 请求**: Axios
-   **富文本编辑器**: Vue-Quill-Editor
-   **构建工具**: Vue CLI
-   **持久化存储**: vuex-persistedstate

## 功能特性

-   ✅ 用户登录与注册
-   ✅ 文章分类管理（添加、编辑、删除）
-   ✅ 文章管理（发布、编辑、删除、预览）
-   ✅ 用户信息管理
-   ✅ 用户密码修改
-   ✅ 文章封面图片上传与预览
-   ✅ 富文本编辑
-   ✅ 响应式设计
-   ✅ 表单验证
-   ✅ 状态持久化

## 项目结构

```
src/
├── api/              # API接口定义
├── assets/           # 静态资源
├── components/       # 自定义组件
├── elementUI/        # Element UI配置
├── router/           # 路由配置
├── store/            # Vuex状态管理
├── utils/            # 工具函数
├── views/            # 页面组件
│   ├── article/      # 文章相关页面
│   ├── home/         # 首页
│   ├── layout/       # 布局组件
│   ├── login/        # 登录页面
│   ├── register/     # 注册页面
│   └── user/         # 用户相关页面
├── App.vue           # 根组件
└── main.js           # 入口文件
```

## 安装和运行

### 环境要求

-   Node.js >= 12.x
-   npm >= 6.x 或 yarn >= 1.x

### 安装依赖

```bash
# 使用npm
npm install

# 使用yarn
yarn install
```

### 开发环境运行

```bash
# 使用npm
npm run serve

# 使用yarn
yarn serve
```

### 生产环境构建

```bash
# 使用npm
npm run build

# 使用yarn
yarn build
```

### 代码检查

```bash
# 使用npm
npm run lint

# 使用yarn
yarn lint
```

### 自定义配置

See [Configuration Reference](https://cli.vuejs.org/config/).

## API 接口说明

### 认证相关

-   `POST /api/reg` - 用户注册
-   `POST /api/login` - 用户登录

### 用户管理

-   `GET /my/userinfo` - 获取用户信息
-   `PUT /my/userinfo` - 更新用户信息
-   `PATCH /my/update/avatar` - 更新用户头像
-   `PATCH /my/updatepwd` - 更新用户密码

### 文章分类管理

-   `GET /my/cate/list` - 获取文章分类列表
-   `POST /my/cate/add` - 添加文章分类
-   `PUT /my/cate/info` - 更新文章分类
-   `DELETE /my/cate/del` - 删除文章分类

### 文章管理

-   `POST /my/article/add` - 发布文章
-   `GET /my/article/list` - 获取文章列表
-   `GET /my/article/info` - 获取文章详情
-   `DELETE /my/article/del` - 删除文章

## 开发指南

### 代码规范

-   使用 ES6+语法
-   使用 ESLint 进行代码检查
-   组件命名使用 PascalCase
-   工具函数命名使用 camelCase

### 提交规范

-   feat: 新功能
-   fix: 修复 bug
-   docs: 文档变更
-   style: 代码格式调整
-   refactor: 代码重构
-   test: 测试相关
-   chore: 构建或配置变更

## 许可证

MIT License

## 作者

您的名字

## 致谢

-   Vue.js 团队
-   Element UI 团队
-   Quill 团队
