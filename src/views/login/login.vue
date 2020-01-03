<template>
  <div class="login-container">
    <!-- 左侧的盒子 -->
    <div class="left">
      <!-- 标题盒子 -->
      <div class="title-box">
        <img src="../../assets/logo.png" alt />
        <div class="title">黑马面面</div>
        <div class="line"></div>
        <div class="sub-title">用户登录</div>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="43px"
        class="demo-ruleForm login-form"
      >
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            v-model="ruleForm.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="7" class="login-col">
              <img :src="codeURL" alt @click="getRandomCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 协议 -->
        <el-form-item>
          <el-checkbox v-model="ruleForm.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            <span>和</span>
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm()">登录</el-button>
          <el-button
            class="login-btn signIn-btn"
            type="primary"
            @click="dialogFormVisible = true"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 注册 -->
    <el-dialog :visible.sync="dialogFormVisible" class="register-dia" top="0">
      <div slot="title">
        <span>用户注册</span>
      </div>
      <el-form :model="form">
        <!-- 上传头像 -->
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            id="uploader-box"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7" class="login-col">
              <img :src="codeURL" alt @click="getRandomCode" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="17">
              <el-input v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7" class="login-col">
              <div>获取用户验证码</div>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
import { login } from "../../api/login.js";
import { setToken } from "../../utils/token.js";

// 验证手机号码
const validatePhone = (rule, value, callback) => {
  if (value == "") {
    callback(new Error("请输入手机号"));
  } else {
    const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("手机号码格式不正确"));
    }
  }
};
export default {
  name: "login",
  data() {
    return {
      //验证码的基地址
      codeURL: process.env.VUE_APP_BASEURL + "/captcha?type=login",
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为4", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "60px",
      imageUrl: ""
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        //判断勾选框的状态
        if (this.ruleForm.checked == false) {
          this.$message.warning("请勾选用户协议");
          return;
        } else {
          if (valid) {
            login(this.ruleForm).then(res => {
              //成功回调
              window.console.log(res);
              if (res.data.code == 200) {
                // window.localStorage.setItem('token',res.data.data.token)
                setToken(res.data.data.token);

                this.$message.success("登录成功");
                this.$router.push("/index");
              } else {
                this.$message.warning(res.data.message);
              }
            });
          } else {
            this.$message.warning("请输入相关信息");
            return false;
          }
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    getRandomCode() {
      // this.codeURL=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Math.random()*99
      this.codeURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&_t=" + Date.now();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.login-container {
  display: flex;
  /* 侧轴方向 居中 */
  align-items: center;
  /* 线型渐变 */
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  /* 主轴方向 均分 */
  justify-content: space-around;
  height: 100%;
  .left {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 44px;
    // 盒模型 让padding不会撑开盒子
    box-sizing: border-box;
    // 标题盒子
    .title-box {
      display: flex;
      // 上下居中
      align-items: center;
      margin-left: 48px;
      img {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .title {
        font-size: 24px;
        font-weight: 400;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        background-color: #dfdfdf;
        margin-right: 12px;
        height: 28px;
      }
      .sub-title {
        font-size: 22px;
        font-weight: 400;
      }
    }
    // 表单
    .login-form {
      margin-top: 27px;
      margin-right: 41px;
      .el-form-item {
        margin-bottom: 25px;
      }
      .el-input__inner {
        height: 45px;
        line-height: 45px;
      }
      .login-col {
        height: 45px;
        padding: 2px;
        background-color: #fff;
        img {
          cursor: pointer;
          width: 100%;
          height: 100%;
        }
      }
    }
    //表单中的按钮
    .login-btn {
      width: 100%;
      margin: 0;
    }
    .signIn-btn {
      margin-top: 26px;
    }
  }
  .register-dia {
    height: 100%;

    .el-dialog {
      width: 45%;
      height: 100%;
      margin: 0 auto;
    }
    .avatar-uploader {
      display: flex;
      justify-content: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  .el-dialog__header {
    background: linear-gradient(
      right,
      rgba(1, 198, 250, 1),
      rgba(20, 147, 250, 1)
    );
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    button {
      display: none;
    }
  }
}
</style>
