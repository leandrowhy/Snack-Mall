<template>
  <li class="product">
    <div class="pic" @click="goGoods(item.g_id)">
      <img
        :src="item.g_picUrl ? item.g_picUrl[0] : '/'"
        :all="item.g_name"
        :title="item.g_name"
      />
    </div>
    <div class="timer">
      <span>还剩{{ `${day}天${hour}小时${minute}分钟${second}秒` }}结束</span>
    </div>
    <p class="title" @click="goGoods(item.g_id)">{{ item.g_name }}</p>
    <div class="price">
      <div class="y-price">
        <span>￥{{ item.g_discountPrice }}</span>
        <span class="yp">￥{{ item.g_price }}</span>
      </div>
      <span class="valid_order"
        >{{ item.g_sales ? item.g_sales : 0 }}人已购买</span
      >
    </div>
    <div class="buy">
      <div class="n-tg">
        <span>收藏</span>
      </div>
      <div class="n-tg">
        <span @click="goGoods(item.g_id)">立即抢购</span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "SeckillItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
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
      let datetime = new Date(this.item.g_lowDate).getTime();
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
.product {
  border: #ddd 1px solid;
  padding: 10px;
  background: #fff;
  float: left;
  margin: 0px 12px 15px 0px;
  overflow: hidden;
  width: 268px;
  height: 355px;
  text-align: center;
  &:nth-child(4n) {
    margin-right: 0;
  }
  .pic {
    cursor: pointer;
    img {
      width: 220px;
      aspect-ratio: auto 220 / 220;
      height: 220px;
    }
  }
  .timer {
    height: 30px;
    margin-top: 5px;
    line-height: 30px;
    background: rgb(110, 121, 146) none repeat scroll 0% 0%;
    color: #fff;
    text-align: center;
    opacity: 0.8;
    width: 270px;
    overflow: hidden;
  }
  .title {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      color: #e61952;
    }
  }
  .price {
    height: 25px;
    line-height: 25px;
    .y-price {
      float: left;
      margin-left: 5px;
      span {
        display: block;
        font-weight: normal;
        color: #e6393b;
        float: left;
        margin-right: 15px;
        font-size: 16px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span.yp {
        color: #999;
        text-decoration: line-through;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 50px;
        float: left;
        margin-left: 10px;
        margin-right: 0px !important;
        overflow: hidden;
        font-weight: normal;
        font-size: 12px;
      }
    }
    .valid_order {
      float: right;
      margin-right: 5px;
    }
  }
  .buy {
    height: 30px;
    width: 100%;
    margin-top: 5px;
    .n-tg {
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgb(110, 121, 146) none repeat scroll 0% 0%;
      margin-left: 30px;
      float: left;
      span {
        display: block;
        color: #fff;
        background: #fa5437;
        height: 30px;
        cursor: pointer;
        &:hover {
          background: none;
        }
      }
    }
  }
}
</style>
