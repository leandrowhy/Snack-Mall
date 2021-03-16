<template>
  <div class="login-main">
    <!-- 顶部header -->
    <RegHeader isBom />
    <div class="login">
      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <h3 class="title">登陆界面</h3>
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="loginForm.account"
            auto-complete="off"
            placeholder="用户名、手机、邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="loginForm.checkPass"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <div class="btns">
          <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
          <span class="forget">忘记密码?</span>
        </div>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            class="loginBtn"
            @click.native.prevent="handleSubmit"
            :loading="logining"
            >登录
          </el-button>
        </el-form-item>
        <!-- 第三方登录 -->
        <div class="other-form">
          <div class="tit">使用第三方账号登录</div>
          <div class="other-login">
            <span title="QQ登录"></span>
            <span title="微博登录"></span>
            <span title="支付宝登录"></span>
            <span title="微信登录"></span>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import RegHeader from "@/components/RegHeader";
import { login } from "@/api/api";
import { setCookie } from "@/utils/cookie";
export default {
  name: "Login",
  components: {
    RegHeader,
  },
  data() {
    return {
      logining: false,
      loginForm: {
        account: "",
        checkPass: "",
      },
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: false,
    };
  },

  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.logining = true;
          var loginParams = {
            user: this.loginForm.account,
            psd: this.loginForm.checkPass,
          };

          login(loginParams).then((res) => {
            this.logining = false;
            let { msg, code, token } = res;
            if (code !== 200) {
              this.$message({
                message: msg,
                type: "error",
              });
            } else {
              const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
              });
              setTimeout(() => {
                this.$message({
                  message: msg,
                  type: "success",
                });
                let str = encodeURI(JSON.stringify(res.data))
                setCookie("user", str);
                setCookie("token", token);
                this.$store.commit("setUserInfo", res.data);
                this.$store.commit("setToken", token);
                this.$router.push({ name: "Home" });
                loading.close();
              }, 1200);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  margin: 80px auto;
  width: 1200px;
  background: #fff;
  box-shadow: 1px 1px 5px rgba(98, 105, 109, 0.5);
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 500px;
  margin: 0 auto;
  padding: 35px 35px 15px 35px;
  .title {
    color: #e61952;
    font-size: 24px;
    font-weight: normal;
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
  .loginBtn {
    width: 100%;
    font-size: 20px;
    letter-spacing: 10px;
    background: #e61952;
    border-color: #e61952;
  }
}
.btns {
  .forget {
    float: right;
    color: #e61952;
    font-size: 14px;
    cursor: pointer;
  }
}
.other-form {
  margin-bottom: 30px;
  .tit {
    font-size: 14px;
    margin-bottom: 20px;
  }
  span {
    margin-top: 0;
    vertical-align: top;
    margin-right: 20px;
    background: url("../assets/img/other-login-bg.png") center no-repeat;
    display: inline-block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    overflow: hidden;
    &:hover {
      text-decoration: none;
      opacity: 0.8;
    }
    &:nth-child(1) {
      background-position: -40px 0;
    }
    &:nth-child(2) {
      background-position: -0px 0;
    }
    &:nth-child(3) {
      background-position: -80px 0;
    }
    &:nth-child(4) {
      background-position: -200px 0;
    }
  }
}
</style>
