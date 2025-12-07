<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img
        class="the_img"
        v-if="!this.avatar"
        v-lazy="require('../../assets/images/avatar.jpg')"
        alt=""
      />
      <img class="the_img" v-else v-lazy="this.avatar" alt="" />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input
          type="file"
          accept="image/*"
          style="display: none"
          ref="iptRef"
          @change="onFileChange"
        />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg"
          >选择图片</el-button
        >
        <el-button
          type="success"
          icon="el-icon-upload"
          :disabled="avatar === ''"
          @click="uploadFn"
          >上传头像</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
import { updateUserAvatarAPI } from "@/api";
export default {
  name: "UserAvatar",
  data() {
    return {
      avatar: "",
    };
  },
  methods: {
    chooseImg() {
      this.$refs.iptRef.click();
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return this.$message.error("请选择图片");
      // 1. 创建 FileReader 对象
      const fr = new FileReader();
      // 2. 调用 readAsDataURL 函数，读取文件内容
      fr.readAsDataURL(file);
      // 3. 监听 fr 的 onload 事件
      fr.onload = (e) => {
        // 4. 通过 e.target.result 获取到读取的结果，值是字符串（base64 格式的字符串）
        this.avatar = e.target.result;
      };
      console.log(file);
    },
    async uploadFn() {
      const { data: res } = await updateUserAvatarAPI(this.avatar);
      if (res.code !== 0) return this.$message.error(res.message);
      this.$message.success("上传头像成功");
      this.$store.dispatch("getUserInfoActions");
    },
  },
};
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  object-fit: cover;
}
.the_img {
  width: 350px;
  height: 350px;
}
</style>
