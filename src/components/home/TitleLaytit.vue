<template>
  <div class="cn-laytit">
    <h2 class="cat_title">{{ title }}</h2>
    <h3>{{ subTitle }}</h3>
  </div>
</template>

<script>
export default {
  name: "TitleLaytit",
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.cn-laytit {
  width: 100%;
  height: 55px;
  display: flex;
  overflow: hidden;
  .cat_title {
    font-size: 22px;
    margin-right: 20px;
    line-height: 55px;
  }
  h3 {
    font-size: 14px;
    line-height: 60px;
    font-weight: 400;
  }
}
</style>
