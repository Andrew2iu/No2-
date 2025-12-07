<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.cate_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="choseFn"
              >筛选</el-button
            >
            <el-button type="info" size="small" @click="resetFn"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="showPubDialogFn"
          >发表文章</el-button
        >
      </div>

      <!-- 文章表格区域 -->
      <div v-if="loading">
        <Skeleton
          :count="3"
          :lines="3"
          :showImage="false"
          :showHeader="false"
        />
      </div>
      <div v-else>
        <el-table :data="artList" style="width: 100%" border stripe>
          <el-table-column label="文章标题" prop="title">
            <template slot-scope="scope">
              <el-link type="primary" @click="showDetailFn(scope.row.id)">{{
                scope.row.title
              }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="分类" prop="cate_name"></el-table-column>
          <el-table-column label="发表时间" prop="pub_date">
            <template slot-scope="scope">
              {{ $formatDate(scope.row.pub_date) }}
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="state"></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button type="danger" size="mini" @click="removeFn(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChangeFn"
          @current-change="handleCurrentChangeFn"
          :current-page.sync="q.pagenum"
          :page-sizes="[2, 3, 5, 10]"
          :page-size.sync="q.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>

    <el-dialog
      title="发表文章"
      :visible.sync="pubDialogVisible"
      fullscreen
      :before-close="handleClose"
      @close="dialogCloseFn"
    >
      <el-form
        :model="pubForm"
        :rules="pubFormRules"
        ref="pubFormRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 文章内容 -->
        <el-form-item label="文章内容" prop="content">
          <quill-editor
            v-model="pubForm.content"
            @blur="contentChangeFn"
          ></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面">
          <!-- 用来显示封面的图片 -->
          <img
            v-lazy="require('../../assets/images/cover.jpg')"
            alt=""
            class="cover-img"
            ref="imgRef"
          />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="iptFileRef"
            @change="coverChangeFn"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="selCoverFn">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticleFn('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticleFn('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="文章预览" :visible.sync="detailVisible" width="80%">
      <h1 class="title">{{ artDetail.title }}</h1>

      <div class="info">
        <span>作者：{{ artDetail.nickname || artDetail.username }} </span>
        <span>发布时间：{{ $formatDate(artDetail.pub_date) }} </span>
        <span>所属分类：{{ artDetail.cate_name }} </span>
        <span>状态：{{ artDetail.state }} </span>
      </div>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 文章的封面 -->
      <img v-lazy="baseURL + artDetail.cover_img" alt="" />

      <!-- 文章的详情 -->
      <div v-html="artDetail.content" class="detail-box"></div>
    </el-dialog>
  </div>
</template>

<script>
import { delArticleAPI } from "@/api";
import { baseURL } from "@/utils/request";
import {
  getCateListAPI,
  uploadArticleAPI,
  getArticleListAPI,
  getArticleDetailAPI,
} from "@/api";
import Skeleton from "@/components/Skeleton.vue";
export default {
  name: "ArtList",
  components: {
    Skeleton,
  },
  data() {
    return {
      // 查询参数对象
      q: {
        pagenum: 1,
        pagesize: 5,
        cate_id: "",
        state: "",
      },
      // 发表文章弹窗是否显示
      pubDialogVisible: false,
      // 发表文章弹窗表单数据
      pubForm: {
        title: "",
        cate_id: "",
        content: "", // 文章的内容
        cover_img: null, // 文章的封面图片
        state: "", // 文章的发布状态 已发布 草稿
      },
      // 发表文章弹窗表单验证规则
      pubFormRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            pattern: /^\S{1,20}$/,
            message: "文章标题只能包含中文、字母、数字",
            trigger: "blur",
          },
        ],
        cate_id: [
          { required: true, message: "请选择文章分类", trigger: "change" },
        ],
        content: [
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        cover_img: [
          { required: true, message: "请选择文章封面", trigger: "change" },
        ],
      },
      // 文章分类列表
      cateList: [],
      artList: [], // 文章的列表数据
      total: 0, // 总数据条数
      detailVisible: false, // 文章详情弹窗是否显示
      artDetail: {}, // 文章详情数据
      baseURL,
      // 加载状态
      loading: true,
      // 默认封面图片
      defaultImg: require("../../assets/images/cover.jpg"),
    };
  },
  created() {
    this.getCateListFn();
    this.getArticleListFn();
  },
  methods: {
    // 显示发表文章弹窗
    showPubDialogFn() {
      this.pubDialogVisible = true;
    },
    // 发表文章弹窗关闭时触发
    async handleClose(done) {
      const confirmResult = await this.$confirm(
        "确认取消发表文章吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult === "cancel") {
        return;
      }
      done();
    },
    // 获取文章分类列表
    async getCateListFn() {
      const { data: res } = await getCateListAPI();
      console.log(res);
      if (res.code === 0) {
        this.cateList = res.data;
      }
    },
    // 选择封面的函数
    selCoverFn() {
      this.$refs.iptFileRef.click();
    },
    // 封面图片选择框change事件
    coverChangeFn(e) {
      // 获取用户选择的文件列表
      const files = e.target.files;
      if (files.length === 0) {
        // 用户没有选择封面
        this.pubForm.cover_img = null;
        // 清空封面图片预览
        this.$nextTick(() => {
          this.$refs.imgRef.src = "../../assets/images/cover.jpg";
        });
      } else {
        // 用户选择了封面
        this.pubForm.cover_img = files[0];
        // 预览封面图片
        this.$nextTick(() => {
          this.$refs.imgRef.src = URL.createObjectURL(this.pubForm.cover_img);
        });
      }
      this.$refs.pubFormRef.validateField("cover_img");
    },
    async pubArticleFn(str) {
      this.pubForm.state = str;
      try {
        await new Promise((resolve, reject) => {
          this.$refs.pubFormRef.validate((valid) => {
            if (valid) {
              resolve();
            } else {
              reject(new Error("表单验证失败"));
            }
          });
        });
        // 表单验证通过，提交数据
        const formData = new FormData();
        formData.append("title", this.pubForm.title);
        formData.append("cate_id", this.pubForm.cate_id);
        formData.append("content", this.pubForm.content);
        formData.append("cover_img", this.pubForm.cover_img);
        formData.append("state", this.pubForm.state);
        const { data: res } = await uploadArticleAPI(formData);
        if (res.code === 0) {
          this.$message.success("发表文章成功");
          // 发表文章成功后，关闭弹窗
          this.pubDialogVisible = false;
          this.getArticleListFn();
        }
      } catch (error) {
        // 表单验证不通过，提示用户输入正确信息
        this.$message.error("请输入正确的信息");
      }
    },
    // 文章内容change事件
    contentChangeFn() {
      this.$refs.pubFormRef.validateField("content");
    },
    // 发表文章弹窗关闭时触发
    dialogCloseFn() {
      this.$refs.pubFormRef.resetFields();
      // 因为这2个变量对应的标签不是表单绑定的, 所以需要单独控制
      this.pubForm.content = "";
      this.$refs.imgRef.setAttribute("src", defaultImg);
    },
    async getArticleListFn() {
      this.loading = true;
      try {
        const { data: res } = await getArticleListAPI(this.q);
        if (res.code !== 0) return this.$message.error("获取文章列表失败!");
        this.artList = res.data;
        this.total = res.total;
      } finally {
        this.loading = false;
      }
    },
    // 分页大小改变时触发
    handleSizeChangeFn(val) {
      this.q.pagesize = val;
      this.q.pagenum = 1;
      this.getArticleListFn();
    },
    // 分页当前页改变时触发
    handleCurrentChangeFn(val) {
      this.q.pagenum = val;
      this.getArticleListFn();
    },
    // 筛选按钮点击事件
    choseFn() {
      // 让页码重置为第一页,条数重置为5
      this.q.pagesize = 5;
      this.q.pagenum = 1;
      this.getArticleListFn();
    },
    // 重置按钮点击事件
    resetFn() {
      // 让页码重置为第一页,条数重置为5
      this.q.pagesize = 5;
      this.q.pagenum = 1;
      // 让分类id和状态重置为空
      this.q.cate_id = "";
      this.q.state = "";
      this.getArticleListFn();
    },
    // 显示文章详情弹窗
    async showDetailFn(artid) {
      const { data: res } = await getArticleDetailAPI(artid);
      if (res.code !== 0) return this.$message.error("获取文章详情失败!");
      this.detailVisible = true;
      this.artDetail = res.data;
    },
    // 删除文章
    async removeFn(artid) {
      const confirmResult = await this.$confirm("确认删除文章吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (confirmResult === "cancel") {
        return;
      }
      const { data: res } = await delArticleAPI(artid);
      if (res.code !== 0) return this.$message.error("删除文章失败!");
      this.$message.success("删除文章成功!");
      if (this.artList.length === 1 && this.q.pagenum !== 1) {
        this.q.pagenum--;
      }
      this.getArticleListFn();
    },
  },
};
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
::v-deep .ql-editor {
  min-height: 300px;
}
.cover-img {
  width: 400px;
  height: 280px;
  object-fit: cover;
}
</style>
