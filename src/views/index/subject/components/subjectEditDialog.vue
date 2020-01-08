<template>
  <el-dialog center width="600px" title="新增学科" :visible.sync="editDialogFormVisible">
    <el-form :model="editForm" ref="editForm" :rules="rules">
      <el-form-item label="学科编号" prop="rid" :label-width="formLabelWidth">
        <el-input v-model="editForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name" :label-width="formLabelWidth">
        <el-input v-model="editForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item
        label="学科简介"
        prop="intro"
        type="textarea"
        :rows="2"
        :label-width="formLabelWidth"
      >
        <el-input v-model="editForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { subjectEdit } from "@/api/subject.js";
export default {
  name: "subject-dialog",
  data() {
    return {
      editForm: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
      },
      formLabelWidth: "120px",
      editDialogFormVisible: false
    };
  },
  methods: {
    submitEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 调用接口
          subjectEdit(this.editForm).then(res => {
            if (res.code === 200) {
              this.$message.success("修改成功");
              this.editDialogFormVisible = false;
              this.$parent.getList();
            } else if (res.code === 201) {
              this.$message.warning("学科编号不能重复");
            }
          });
        } else {
          this.$message.error("格式不对哦,检查一下！");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>