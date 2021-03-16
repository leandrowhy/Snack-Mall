<template>
  <div id="app" class="headContainer">
    <Header v-if="isHeader" />
    <transition name="fade">
      <router-view class="content" />
    </transition>
    <el-backtop :visibility-height="100"></el-backtop>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCookie } from "@/utils/cookie";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      isHeader: true,
    };
  },
  created() {
    this.$store.dispatch("getNewsGoods");
    this.$store.dispatch("getAllsGoods");
    if (getCookie("user") != undefined) {
      this.$store.commit("setUserInfo", JSON.parse(getCookie("user")));
    }
  },
  watch: {
    $route(to) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      if (to.name == "Login" || to.name == "Register") {
        this.isHeader = false;
      } else {
        this.isHeader = true;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("./assets/css/reset.css");
@import url("./assets/css/common.css");
@import url("//at.alicdn.com/t/font_2381355_cilo0l95iup.css");
.content {
  min-height: calc(100vh - 350px);
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
