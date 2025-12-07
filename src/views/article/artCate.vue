<template>
  <div>
    <!-- 文章分类列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addCateShowDialogBtnFn"
          >添加分类</el-button
        >
      </div>
      <el-table style="width: 100%" border stripe :data="cateList">
        <el-table-column
          label="序号"
          width="100"
          type="index"
        ></el-table-column>
        <el-table-column label="分类名称" prop="cate_name"></el-table-column>
        <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" size="mini" @click="updateFn(scope.row)"
              >修改</el-button
            >
            <el-button type="danger" size="mini" @click="delFn(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加文章分类弹窗 -->
    <el-dialog
      title="添加文章分类"
      :visible.sync="addVisible"
      width="30%"
      :before-close="handleClose"
      @closed="dialogClosedFn"
    >
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addRef"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input v-model="addForm.cate_alias"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancelFn">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmFn"
          >添 加</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCateListAPI, addCateAPI, updateCateAPI, delCateAPI } from "@/api";

export default {
  name: "ArtCate",
  data() {
    return {
      cateList: [],
      addVisible: false,
      //添加文章分类弹窗表单数据
      addForm: {
        cate_name: "",
        cate_alias: "",
      },
      //添加文章分类弹窗表单验证规则
      addRules: {
        cate_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "分类名称只能包含中文、字母、数字",
            trigger: "blur",
          },
        ],
        cate_alias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: "分类别名只能包含字母、数字",
            trigger: "blur",
          },
        ],
      },
      isEdit: false, //false 新增 true 修改
      editId: "", //修改的分类id
    };
  },
  created() {
    this.getArtCateFn();
  },
  methods: {
    //获取文章分类列表
    async getArtCateFn() {
      const { data: res } = await getCateListAPI();
      console.log(res);

      if (res.code === 0) {
        this.cateList = res.data;
      }
    },
    //添加文章分类弹窗显示按钮点击事件
    addCateShowDialogBtnFn() {
      this.isEdit = false;
      this.editId = "";
      this.addVisible = true;
    },
    //添加文章分类弹窗关闭时触发
    handleClose(done) {
      done();
    },
    //添加文章分类弹窗取消按钮点击事件
    cancelFn() {
      this.addVisible = false;
    },
    //添加文章分类弹窗添加按钮点击事件
    confirmFn() {
      this.$refs.addRef.validate(async (valid) => {
        if (valid) {
          if (!this.isEdit) {
            const { data: res } = await addCateAPI(this.addForm);
            if (res.code === 0) {
              this.$message.success("添加成功");
            }
          } else {
            const { data: res } = await updateCateAPI({
              id: this.editId,
              ...this.addForm,
            });
            if (res.code === 0) {
              this.$message.success("修改成功");
            }
          }
          this.getArtCateFn();
          this.addVisible = false;
        } else {
          return false;
        }
      });
      this.addVisible = false;
    },
    //添加文章分类弹窗关闭时触发
    dialogClosedFn() {
      this.$refs.addRef.resetFields();
    },
    //修改文章分类弹窗点击事件
    updateFn(obj) {
      this.isEdit = true;
      this.editId = obj.id;
      this.addVisible = true;
      // 数据回显 等真实DOM更新后再赋值
      this.$nextTick(() => {
        this.addForm.cate_name = obj.cate_name;
        this.addForm.cate_alias = obj.cate_alias;
      });
    },
    //删除文章分类弹窗点击事件
    delFn(obj) {
      this.$confirm("确认删除分类 " + obj.cate_name + " 吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const { data: res } = await delCateAPI({ id: obj.id });
        if (res.code === 0) {
          this.$message.success("删除成功");
          this.getArtCateFn();
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
