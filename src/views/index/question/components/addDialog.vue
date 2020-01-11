<template>
  <el-dialog @opened="opened" fullscreen center title="新增试题" :visible.sync="dialogFormVisible">
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <el-form-item label="学科" prop="role_id">
        <el-select v-model="addForm.role_id" placeholder="请选择学科">
          <el-option label="学科1" :value="1"></el-option>
          <el-option label="学科2" :value="2"></el-option>
          <el-option label="学科3" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="role_id">
        <el-select v-model="addForm.role_id" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="role_id">
        <el-select v-model="addForm.role_id" placeholder="请选择企业">
          <el-option label="enterprise1" :value="1"></el-option>
          <el-option label="enterprise2" :value="2"></el-option>
          <el-option label="enterprise3" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="role_id">
        <el-select v-model="addForm.role_id" placeholder="请选择城市">
          <el-option label="城市" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型" prop="resource">
        <el-radio-group v-model="addForm.resource">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="resource">
        <el-radio-group v-model="addForm.resource">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="试题标题" prop="resource"></el-form-item>
      <!-- 富文本编辑框 -->
      <div id="websiteEditorElem" ref="websiteEditorElem" style="height:300px;background: #f00;"></div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import E from "wangeditor";
export default {
  name: "question-addDialog",
  data() {
    return {
      addForm: {},
      rules: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //富文本编辑器
      textEditor: "",
      name: ""
    };
  },
  methods: {
    opened() {
      // wangeditor
      this.textEditor = new E("#websiteEditorElem");
      // this.textEditor.onchange = function () {
      //   this.formData.phone = this.$txt.html()
      // }
      // 上传图片到服务器，base64形式
      this.textEditor.customConfig.uploadImgShowBase64 = true;
      // 隐藏网络图片
      this.textEditor.customConfig.showLinkImg = false;
      // 创建一个富文本编辑器
      this.textEditor.create();
      // 富文本内容
      this.textEditor.txt.html();
    }
  }
};
</script>

<style>
</style>