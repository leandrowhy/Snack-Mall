<template>
  <div class="site-topbar">
    <div class="container">
      <div class="topbar-nav">
        <span class="snc-link">配送方式</span>
        <span class="snc-link">优惠活动</span>
        <span class="snc-link">超值礼包</span>
      </div>
      <div class="topbar-wx">
        <div class="weixin-bg-t">
          <img src="@/assets/img/mmqrcode1613975359689.png" class="wx_ewm" />
        </div>
      </div>
      <div class="topbar-tel"><i class="el-icon-phone"></i>18888888888</div>
      <div class="topbar-info" v-if="isLogin">
        <span class="link">欢迎您回来,{{ userInfo.u_nickname }}!</span>
        <span class="link" @click="goRouter('User')">会员中心</span>
        <span class="link" @click="LoginOut">退出登录</span>
      </div>
      <div class="topbar-info" v-else>
        <span class="link" @click="goRouter('Login')">会员登录</span>
        <span class="link" @click="goRouter('Register')">会员注册</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SiteTopBar",
  data() {
    return {
      isLogin: true,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    token() {
      return this.$store.state.token;
    },
  },
  created() {
    this.isLogin = this.userInfo ? true : false;
  },
  methods: {
    goRouter(name) {
      this.$router.push({ name });
    },
    LoginOut() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        this.$message({
          message: "退出成功！",
          type: "success",
        });
        this.isLogin = false;
        loading.close();
      }, 1200);
    },
  },
};
</script>

<style scoped lang="scss">
.site-topbar {
  height: 39px;
  font-size: 12px;
  line-height: 39px;
  color: #605a51;
  background: #f4f4f4;
  border-bottom: solid 1px #ddd;
  .container {
    width: 1200px;
    margin: 0 auto;
  }
}
.topbar-nav {
  float: left;
  .snc-link {
    margin-right: 16px;
    cursor: pointer;
    &:hover {
      color: #e61952;
    }
  }
}
.topbar-wx {
  float: right;
  width: 110px;
  height: 39px;
  background: url("../../assets/img/wx-icon.png") 11px 11px no-repeat;
  cursor: pointer;
  position: relative;
  .weixin-bg-t {
    display: none;
    img {
      width: 100%;
    }
  }
  &:hover {
    .weixin-bg-t {
      display: block;
      position: absolute;
      width: 160px;
      height: 164px;
      background: url("../../assets/img/weixin-bg-t.png") 0 0 no-repeat;
      top: 28px;
      left: -25px;
      z-index: 9999;
    }
    .wx_ewm {
      display: block;
      width: 140px;
      height: 140px;
      margin-top: 14px;
      margin-left: 10px;
    }
  }
}
.topbar-tel {
  float: right;
  padding-left: 16px;
  height: 39px;
  font-size: 15px;
  font-weight: bold;
  color: #ff8900;
}
.topbar-info {
  float: right;
  .link {
    margin-right: 16px;
    cursor: pointer;
    &:hover {
      color: #e61952;
    }
  }
}
</style>
