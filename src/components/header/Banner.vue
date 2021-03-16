<template>
  <div class="bannner">
    <el-carousel  height="440px">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      banner: [
        require("../../assets/img/banner/20180614epmsbq.jpg"),
        require("../../assets/img/banner/20180614hjytsy.jpg"),
        require("../../assets/img/banner/20180614qmgudv.jpg"),
      ],
    };
  },
};
</script>

<style scoped lang="scss">
img{
  width: 100%;
}
</style>
