import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import { throttle, debounce } from './utils/throttle-debounce'
// Element UI 按需引入
import {
  Container, Header, Aside, Main, Footer,
  Menu, Submenu, MenuItem,
  Form, FormItem, Input, Select, Option,
  Button,
  Table, TableColumn,
  Pagination,
  Dialog,
  Card,
  Row, Col,
  Link,
  Divider,
  Message,
  MessageBox
} from 'element-ui';
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import dayjs from 'dayjs';
Vue.prototype.$formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

// 配置图片懒加载
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/error.svg'),
  loading: require('./assets/images/loading.svg'),
  attempt: 1
})

// 全局注册富文本编辑器
Vue.use(VueQuillEditor)
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Link);
Vue.use(Divider);
// 挂载Message和MessageBox到Vue原型
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
// 挂载节流防抖函数到Vue原型
Vue.prototype.$throttle = throttle
Vue.prototype.$debounce = debounce

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
