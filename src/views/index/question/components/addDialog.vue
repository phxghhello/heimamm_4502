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
      <div ref="titleHeader" class="title-header"></div>
      <div ref="titleMain" class="title-main"></div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Wangeditor from "wangeditor";
export default {
  name: "question-addDialog",
  data() {
    return {
      addForm: {},
      rules: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //富文本编辑器
      titleEditor: undefined,
      answerEditor: undefined,
    };
  },
  methods: {
    opened() {
      if (!this.titleEditor) {
        this.titleEditor = new Wangeditor(
          this.$refs.titleHeader,
          this.$refs.titleMain
        );
        // 绑定 change事件
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // console.log(html);
          this.addForm.title = html;
        };
        this.titleEditor.create();
      }
      if (!this.answerEditor) {
        this.answerEditor = new Wangeditor(
          this.$refs.answerHeader,
          this.$refs.answerMain
        );
        // 绑定 change事件
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // console.log(html);
          this.addForm.answer_analyze = html;
        };
        this.answerEditor.create();
      }
    },
  }
};
</script>

<style>
</style>