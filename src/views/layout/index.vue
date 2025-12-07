<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img v-lazy="require('../../assets/images/logo.png')" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img v-lazy="require('../../assets/images/logo.png')" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="quitFn"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 左侧边栏的用户信息 -->
      <el-aside width="200px">
        <!-- 左侧边栏的用户信息 -->
        <div class="user-box">
          <img v-lazy="user_pic" alt="" v-if="user_pic" />
        <img v-lazy="require('../../assets/images/logo.png')" alt="" v-else />
          <span>欢迎 {{ nickname || username }}</span>
        </div>
        <!-- 左侧导航菜单 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          router
        >
          <template v-for="item in menus">
            <!-- 不包含子菜单的“一级菜单” -->
            <el-menu-item
              v-if="!item.children"
              :index="item.indexPath"
              :key="item.indexPath"
              ><i :class="item.icon"></i
              ><span>{{ item.title }}</span></el-menu-item
            >
            <!-- 包含子菜单的“一级菜单” -->
            <el-submenu
              v-else
              :index="item.indexPath"
              :key="'sub-' + item.indexPath"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :index="child.indexPath"
                :key="child.indexPath"
                ><i :class="child.icon"></i
                ><span>{{ child.title }}</span></el-menu-item
              >
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { getMenusListAPI } from "@/api";
export default {
  name: "my-layout",
  data() {
    return {
      // 侧边栏数据
      menus: [],
    };
  },
  computed: {
    ...mapGetters(["username", "nickname", "user_pic"]),
  },
  methods: {
    quitFn() {
      this.$confirm("确认退出吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 确认退出后，清除本地存储中的 token
          this.$store.commit("updateToken", "");
          this.$store.commit("updateUserInfo", {});
          // 跳转到登录页面
          this.$router.push("/login");
          this.$message({
            message: "退出成功",
            type: "success",
          });
        })
        .catch(() => {
          // 取消退出，不做任何操作
        });
    },
    // 获取侧边栏数据的方法
    async getMenusListFn() {
      const res = await getMenusListAPI();
      this.menus = res.data.data;
    },
  },
  created() {
    // 页面创建时，调用获取侧边栏数据的方法
    this.getMenusListFn();
  },
};
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
// 左侧边栏用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
// 侧边栏菜单的样式
.el-aside {
  .el-submenu,
  .el-menu-item {
    width: 200px;
    user-select: none;
  }
}
</style>
