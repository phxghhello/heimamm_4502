<template>
  <el-dialog center width="600px" title="编辑用户" :visible.sync="dialogFormVisible">
    <el-form :model="editForm" ref="editForm" :rules="rules">
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="editForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="editForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
        <el-select v-model="editForm.role_id" placeholder="请选择角色">
          <el-option label="超级管理员" :value="1"></el-option>
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="editForm.status" placeholder="请选择状态">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入验证电话和邮箱的方法
import {validatePhone,validateEmail} from '@/utils/validator.js'
import { userEdit } from "@/api/user.js";
export default {
  name: "user-addDialog",
  data() {
    return {
      editForm: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "change" }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: "change" }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        role_id: [
          { required: true, message: "角色不能为空", trigger: "change" }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    submitEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          userEdit(this.editForm).then(res => {
              window.console.log(res)
            if (res.code === 200) {
              this.$message.success("编辑成功");
              this.dialogFormVisible = false;
              this.$parent.getList();
            }else if(res.code === 201){
               return this.$message.warning(res.message);
            }
          });
        } else {
          return this.$message.warning("信息输入有误,请检查");
        }
      });
    }
  }
};
</script>

<style>
</style>