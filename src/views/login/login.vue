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
    <el-dialog :visible.sync="dialogFormVisible" class="register-dia" top="0" width="600px" @closed="closedRegDialog">
      <div slot="title">
        <span>用户注册</span>
      </div>
      <el-form :model="registerForm" ref="registerForm" :rules="rules">
        <!-- 上传头像 -->
        <el-form-item label="头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            id="uploader-box"
            action="http://127.0.0.1/heimamm/public/uploads"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" name="image"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- 隐藏域 -->
          <el-input type="hidden" v-model="registerForm.avatar"></el-input>
        </el-form-item>

        <el-form-item label="昵称" :label-width="formLabelWidth" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth" prop="piccode">
          <el-row>
            <el-col :span="17">
              <el-input v-model="registerForm.piccode"></el-input>
            </el-col>
            <el-col :span="7" class="register-col">
              <img :src="regcodeURL" alt @click="randomRegisterCaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
          <el-row>
            <el-col :span="17">
              <el-input v-model="registerForm.rcode"></el-input>
            </el-col>
            <el-col :span="7">
              <el-button
                class="register-col2"
                @click="getPhoneCode"
                :displayed="delayTime!=0"
              >{{delayTime!=0?delayTime+"s":""}}点击获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer register-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRegForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
import { login, sendsms, register } from "../../api/login.js";
import { setToken } from "../../utils/token.js";

//验证邮箱
const validateEmail = (rule, value, callback) => {
  if (value == "") {
    callback(new Error("请输入邮箱"));
  } else {
    const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("邮箱格式不正确"));
    }
  }
};

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
      regcodeURL: process.env.VUE_APP_BASEURL + "/captcha?type=sendsms",
      // avatarAction: process.env.VUE_APP_BASEURL + "/uploads",
      // 登录表单
      ruleForm: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      //注册表单
      registerForm: {
        username: "",
        email: "",
        phone: "",
        password: "",
        piccode: "",
        rcode: "",
        avatar: ""
      },
      imageUrl: "",
      delayTime: 0,
      rules: {
        phone: [
          { required: true, message: "请输入手机号" },
          { validator: validatePhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为4", trigger: "blur" }
        ],
        // 注册表单校验规则
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        username: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空" },
          { validator: validateEmail, trigger: "blur" }
        ],
        piccode: [
          {  required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为4", trigger: "blur" }
        ],
        rcode: [
          {  required: true, message: "短信验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度必须为4", trigger: "blur" }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "80px"
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
    getRandomCode() {
      // this.codeURL=process.env.VUE_APP_BASEURL+'/captcha?type=login&'+Math.random()*99
      this.codeURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&_t=" + Date.now();
    },
    // 获取注册验证码
    randomRegisterCaptcha() {
      // 通过时间戳来重新获取验证码
      this.regcodeURL = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=sendsms&t=${Date.now()}`;
    },
    //提交注册按钮
    submitRegForm(){
      window.console.log(this.registerForm.username,this.registerForm.avatar);
      this.$refs.registerForm.validate(valid=>{
        if (valid) {
          register(this.registerForm).then(res=>{
            window.console.log(res);
            if (res.data.code==200) {
              this.imageUrl ="";
              this.dialogFormVisible = false
            }
          })
        }else{
          this.$message.warning("请检查输入的内容")
          return false;
        }
      })
    },

    getPhoneCode() {
      window.console.log(this.registerForm.piccode);

      if (this.registerForm.piccode.length != 4) {
        return this.$message.warning("验证码错误,请检查");
      }
      // 手机号判断
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.registerForm.phone)) {
        return this.$message.warning("手机号不对,请检查");
      }
      if (this.delayTime == 0) {
        this.delayTime = 60;
        let timeId = setInterval(() => {
          this.delayTime--;
          if (this.delayTime == 0) {
            clearInterval(timeId);
          }
        }, 300);
        //调用短信的接口
        sendsms({
          code: this.registerForm.piccode,
          phone: this.registerForm.phone
        }).then(res => {
          window.console.log("短信验证码是:",res.data.data.captcha);
          this.$message.info("短信验证码是:"+res.data.data.captcha)
        });
      }
    },
    // 关闭注册对话框
    closedRegDialog(){
      this.$refs.registerForm.resetFields();
      this.imageUrl="";
    },

    handleAvatarSuccess(res, file) {
      window.console.log(res);
      this.registerForm.avatar = res.data.file_path;
      this.imageUrl = URL.createObjectURL(file.raw);
      //准备提交的数据
      // this.registerForm.avatar = res.data.file_path;

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
    width: 100%;
    font-size: 15px;
    margin: 0 auto;

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
      left,
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
  .register-col {
    padding-left: 6px;
    img {
      width: 143px;
      height: 39px;
    }
  }
  .register-col2 {
    width: 143px;
    height: 39px;
    margin-left: 6px;
    border: 1px solid #ccc;
    text-align: center;
    color: rgba(86, 88, 93, 1);
    font-size: 12px;
  }
  .register-footer {
    display: flex;
    justify-content: center;
  }
}
</style>
