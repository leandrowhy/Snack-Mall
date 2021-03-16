<template>
  <div class="reg_header">
    <div class="re_header_main clearfix">
      <div class="fl logo">
        <router-link :to="{ name: 'Home' }"
          ><img src="@/assets/img/c-logo.png" alt=""
        /></router-link>
      </div>
      <p class="fr login-link" v-if="isBom">
        如未注册， 点此
        <span class="link" @click="goRoter('Register')">注册</span>
      </p>
      <p class="fr login-link" v-else>
        如已注册， 点此
        <span class="link" @click="goRoter('Login')">登录</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegHeader",
  props: {
    isBom: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    goRoter(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style scoped lang="scss">
.reg_header {
  height: 103px;
  background: #fff;
  box-shadow: 1px 1px 5px rgba(98, 105, 109, 0.5);
  .re_header_main {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    .logo {
      margin-left: 10px;
      a {
        display: block;
        width: 400px;
      }
    }
    .login-link {
      height: 22px;
      line-height: 20px;
      margin-top: 36px;
      text-align: right;
      font-size: 14px;
      .link {
        width: 49px;
        height: 22px;
        background: #e61952;
        border-radius: 2px;
        color: #fff;
        margin-left: 6px;
        display: inline-block;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
      }
    }
  }
}
</style>
