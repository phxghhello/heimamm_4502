<template>
  <el-dialog center width="600px" title="新增学科" :visible.sync="addDialogFormVisible">
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="学科简介"
        prop="intro"
        type="textarea"
        :rows="2"
        :label-width="formLabelWidth"
      >
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addSubject } from "@/api/subject.js";
export default {
  name: "subject-dialog",
  data() {
    return {
      addForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: "",
        status:"",
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      addDialogFormVisible: false
    };
  },
  methods: {
    submitAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 调用接口
          addSubject(this.addForm).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              //清空表单
              this.$refs.addForm.resetFields();
              //关闭新增框
              this.addDialogFormVisible = false;
              //重新获取数据刷新页面
              this.$parent.getList();
            } else if (res.code === 201) {
              this.$message.warning("学科编号不能重复");
            }
          });
        } else {
          this.$message.error("格式不对哦，检查一下！");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>