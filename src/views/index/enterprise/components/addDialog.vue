<template>
  <el-dialog center width="600px" title="新增企业" :visible.sync="dialogFormVisible">
    <el-form :model="addForm" ref="addForm" :rules="rules">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="addForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input type="textarea" rows="2" v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="addForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitAdd">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入新增企业的接口
import {enterpriseAdd} from "@/api/enterprise.js";
export default {
  name: "enterprise-dialog",
  data() {
    return {
      addForm: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        eid: [{ required: true, message: "企业编号不能为空", trigger: blur }],
        name: [{ required: true, message: "企业名称不能为空", trigger: blur }],
        short_name: [
          { required: true, message: "企业简称不能为空", trigger: blur }
        ],
        intro: [{ required: true, message: "企业简介不能为空", trigger: blur }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    submitAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          enterpriseAdd(this.addForm).then(res=>{
              if (res.code===200) {
                  this.$message.success("新增成功");
                  this.dialogFormVisible=false;
                  this.$refs.addForm.resetFields();
              }else if(res.code===201){
                  return this.$message.warning("企业编号不能重复")
              }
          })
        } else {
          return this.$message.warning("信息输入有误,请检查")
        }
      });
    }
  }
};
</script>

<style>
</style>