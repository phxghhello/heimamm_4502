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
          <el-button class="login-btn signIn-btn" type="primary" @click="resetForm()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img class="bg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
import {login} from '../../api/login.js'
import {setToken} from '../../utils/token.js'

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
      }
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
            login(this.ruleForm).then(res=>{
              //成功回调
              window.console.log(res)
              if (res.data.code==200) {
                // window.localStorage.setItem('token',res.data.data.token)
                setToken(res.data.data.token)
                
                this.$message.success('登录成功')
                this.$router.push('/index')
              } else {
                this.$message.warning(res.data.message)
              }
            });
          } else {
            this.$message.warning('请输入相关信息')
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
}
</style>
