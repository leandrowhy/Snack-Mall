<template>
  <!-- 限时商品item -->
  <div class="salegoods-item">
    <!-- 剩余时间 -->
    <div class="timedjs">
      剩余:
      <em>{{ day }}</em
      >天 <em>{{ hour }}</em
      >时 <em>{{ minute }}</em
      >分 <em>{{ second }}</em
      >秒
    </div>
    <!-- 商品图片 -->
    <div class="img" @click="goGoods(item.g_id)">
      <img :src="item.g_picUrl[0]" alt="" />
    </div>
    <!-- 商品名称 -->
    <div class="title" @click="goGoods(item.g_id)">
      <span :title="item.g_name">{{ item.g_name }}</span>
    </div>
    <!-- 商品价格等按钮 -->
    <div class="btns">
      <div class="price">
        <span class="s_price"
          ><font>￥{{ item.g_discountPrice }}</font></span
        >
        <span class="m_price"
          ><font>￥{{ item.g_price }}</font></span
        >
      </div>
      <span class="pro_buy" title="马上去抢购" @click="goGoods(item.g_id)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaleGoodsItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      day: "00",
      hour: "00",
      minute: "00",
      second: "00",
      timer: null,
    };
  },
  created() {
    this.timer = setInterval(() => {
      let datetime = new Date(this.item.g_lowDate).getTime()
      this.computedResidualTime(datetime);
    }, 100);
  },
  methods: {
    goGoods(id) {
      this.$router.push({ name: "Goods", params: { id } });
    },
    computedResidualTime(time) {
      let date = new Date();
      let currentTime = parseInt(date.getTime() / 1000);
      //获取距离1970年1月1日00:00:00的毫秒数，并转换成秒数，通过parseInt转成整秒数；

      //在我这个项目中是两天的过期时间
      let allSeconds = 2 * 24 * 60 * 60;

      //game.create_time是从后台获取的时间，单位是秒
      let residualTime = allSeconds - (currentTime - time / 1000);
      //这是剩余的所有秒数（规定时间过期时间－（本机距离1970年1月1日00:00:00的秒数－后台的创建时间））

      this.day = parseInt(residualTime / (24 * 3600)); //剩余天数
      this.hour = parseInt((residualTime % (24 * 3600)) / 3600); //剩余小时
      this.minute = parseInt((residualTime % 3600) / 60); //剩余分钟
      this.second = parseInt(residualTime % 60); //剩余秒数
      this.hour = this.hour < 10 ? "0" + "" + this.hour : this.hour;
      this.minute = this.minute < 10 ? "0" + "" + this.minute : this.minute;
      this.second = this.second < 10 ? "0" + "" + this.second : this.second;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="scss">
.salegoods-item {
  width: 213.5px;
  height: 275px;
  margin-right: 5px;
  margin-bottom: 5px;
  background: #fff;
  position: relative;
  .timedjs {
    padding: 16px 13px 5px 13px;
    width: 195px;
    font-size: 12px;
    em {
      padding: 1px 2px;
      margin: 0 2px;
      border-radius: 3px;
      background: #e61952;
      color: #fff;
      font-size: 12px;
      font-style: normal;
    }
  }
  .img img {
    display: block;
    width: 150px;
    height: 150px;
    margin: 0 auto;
    transition: All 0.6s ease-in-out;
    cursor: pointer;
    &:hover {
      transform: scale(1.05);
      transition: All 0.6s ease-in-out;
    }
  }
  .title {
    width: 175px;
    height: 30px;
    text-align: center;
    margin: 0 auto;
    overflow: hidden;
    cursor: pointer;
    span {
      line-height: 30px;
      color: #666;
      font-size: 14px;
      &:hover {
        color: #37ab40;
        text-decoration: none;
      }
    }
  }
  .btns {
    width: 175px;
    margin: 0 auto;
    height: 40px;
    display: flex;
    .price {
      width: 147px;
      .s_price {
        padding-left: 5px;
        padding-right: 5px;
        line-height: 40px;
        font-family: Arial, Helvetica, sans-serif;
        color: #e61952;
        font-size: 20px;
        text-align: left;
        font-weight: normal;
      }
      .m_price {
        padding-right: 5px;
        padding-top: 10px;
        line-height: 30px;
        font-family: Arial, Helvetica, sans-serif;
        color: #999;
        font-size: 12px;
        text-align: left;
        text-decoration: line-through;
      }
    }
    .pro_buy {
      display: block;
      width: 28px;
      height: 28px;
      margin: 6px 0;
      cursor: pointer;
      background: url("../../assets/img/ico_cart.png") right 0 no-repeat;
      color: #fff;
      text-indent: -9999px;
    }
  }
}
</style>
