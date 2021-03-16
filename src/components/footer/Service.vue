<template>
  <div class="service">
    <div class="container">
      <dl v-for="(item, index) in sList" :key="index">
        <dt>{{ item }}</dt>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "Service",
  data() {
    return {
      sList: [
        "正品采购",
        "如实描述",
        "专业配送",
        "金牌服务",
        "千万信赖",
        "权威荣誉",
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.service {
  background: #fff;
  height: 98px;
  border-bottom: 1px solid #e1e1e1;
}
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  dl {
    height: 53px;
    line-height: 53px;
    padding-left: 62px;
    margin-left: 33px;
    margin-right: 33px;
    margin-top: 22px;
    dt {
      height: 53px;
      font-size: 18px;
      line-height: 53px;
    }
    &:nth-child(1) {
      background: url("../../assets/img/f-icon.png") no-repeat 0 -12px;
    }
    &:nth-child(2) {
      background: url("../../assets/img/f-icon.png") no-repeat 0 -65px;
    }
    &:nth-child(3) {
      background: url("../../assets/img/f-icon.png") no-repeat 0 -118px;
    }
    &:nth-child(4) {
      background: url("../../assets/img/f-icon.png") no-repeat 0 -171px;
    }
    &:nth-child(5) {
      background: url("../../assets/img/f-icon.png") no-repeat 0 -224px;
    }
    &:nth-child(6) {
      background: url("../../assets/img/f-icon.png") no-repeat 0 -277px;
    }
  }
}
</style>
