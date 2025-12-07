# Vue2 文章管理系统

一个基于 Vue2 + Element UI 的文章管理系统，支持用户登录注册、文章分类管理、文章发布编辑删除等功能。

此系统覆盖文章管理前端应用与用户认证两大核心模块，实现从用户注册登录、文章发布编辑到分类管理的全流程功能，同时融入企业级开发规范，具备完整的用户权限控制和数据安全机制。

## 技术栈

-   **前端框架**: Vue 2.6.x
-   **UI 组件库**: Element UI
-   **状态管理**: Vuex
-   **路由管理**: Vue Router
-   **HTTP 请求**: Axios
-   **富文本编辑器**: Vue-Quill-Editor
-   配置了生产环境的 CDN 外部资源引入，减少打包体积
-   使用路由懒加载优化初始加载速度
-   通过 Vue CLI 配置实现了灵活的开发与生产环境构建

### 7. 表单验证与用户体验

-   集成 Element UI 表单验证功能，提供友好的错误提示
-   响应式设计，适配不同屏幕尺寸
-   统一的错误处理机制，提升用户体验

## 功能特性

-   ✅ 用户登录与注册
-   ✅ 文章分类管理（添加、编辑、删除）
支持文章分类的添加、编辑、删除功能，实现了分类与文章的关联管理。

### 6. 状态持久化

使用 vuex-persistedstate 实现 Vuex 状态持久化，确保用户登录状态等关键数据在页面刷新后不丢失。

### 7. 表单验证与用户体验

集成 Element UI 表单验证功能，提供友好的错误提示，优化用户操作体验。
-   ✅ 文章管理（发布、编辑、删除、预览）
-   ✅ 用户信息管理
-   ✅ 用户密码修改
-   ✅ 文章封面图片上传与预览
-   ✅ 富文本编辑
-   ✅ 响应式设计
-   ✅ 表单验证
-   ✅ 状态持久化
-   ✅ 基于 Axios 的请求拦截和响应处理机制

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
```

yarn install

````
### 开发环境运行

```bash
# 使用npm
npm run serve

# 使用yarn

````

yarn serve

### 生产环境构建

```bash
# 使用npm
npm run build

# 使用yarn
### Compiles and minifies for production

```

### 代码检查

```bash
# 使用npm
npm run lint

# 使用yarn

### Lints and fixes files

### 自定义配置

yarn lint

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

```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
