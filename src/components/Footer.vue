<template>
  <div class="footer">
    <Service />
    <div class="footer-info">
      <p>
        © 2020-2021
        零食小吃货购物平台，购物商城，长江师范学院-大数据与智能工程学院版权所有，并保留所有权利。
        渝ICP备201706581221号
      </p>
      <p class="nav_bottom">
        <span v-for="(item, index) in navList" :key="index">{{ item }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Service from "@/components/footer/Service";
export default {
  name: "Footer",
  components: {
    Service,
  },
  data() {
    return {
      navList: [
        "免责条款",
        "隐私保护",
        "咨询热点",
        "联系我们",
        "关于我们",
        "批发方案",
        "配送方式",
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.footer {
  margin-top: 50px;
  background: #fff;
}
.footer-info {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 20px 0;
  p {
    margin: 0;
    line-height: 30px;
    color: #848484;
  }
}
.nav_bottom {
  span {
    display: inline-block;
    padding: 0 20px 0 21px;
    background: url("../assets/img/border-right.png") no-repeat 0 center;
    color: #848484;
    cursor: pointer;
    &:nth-child(1) {
      background: transparent;
    }
  }
}
</style>
