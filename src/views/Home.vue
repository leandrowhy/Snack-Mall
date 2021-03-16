<template>
  <div class="home">
    <Banner />
    <!-- 限时促销 -->
    <div class="flashsalebox">
      <TitleLaytit title="限时促销" subTitle="有您意想不到的惊喜特价！" />
      <!-- 左侧海报 -->
      <div class="salead">
        <p @click="goRouter">
          <img src="@/assets/img/1528949257145484425.jpg" class="pic_img" />
        </p>
      </div>
      <!-- 右侧商品 -->
      <div class="salegoods">
        <!-- item -->
        <SaleGoodsItem
          v-for="(item, index) in saleList"
          :key="index"
          :item="item"
          :index="index"
        />
      </div>
    </div>
    <!-- 新品上市 -->
    <NewArrival />
    <!-- 推荐bannner -->
    <div class="recommend_ban">
      <p class="box" v-for="(item, index) in recommend" :key="index">
        <img :src="item" alt="" />
      </p>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/header/Banner";
import TitleLaytit from "@/components/home/TitleLaytit";
import SaleGoodsItem from "@/components/home/SaleGoodsItem";
import NewArrival from "@/components/home/NewArrival";
import { getSpecial } from "@/api/api";
export default {
  name: "Home",
  components: {
    Banner,
    TitleLaytit,
    SaleGoodsItem,
    NewArrival,
  },
  data() {
    return {
      saleList: [],
      recommend: [
        require("../assets/img/1528947472054481116.jpg"),
        require("../assets/img/1528947495368215819.jpg"),
        require("../assets/img/1528947513708507404.jpg"),
      ],
    };
  },
  created() {
    getSpecial().then((res) => {
      this.saleList = res.data.slice(0,8);
    });
  },
  methods: {
    goRouter() {
      this.$router.push({ name: "Seckill" });
    },
  },
};
</script>

<style scoped lang="scss">
.flashsalebox {
  width: 1200px;
  margin: 20px auto;
}
.salead {
  float: left;
  p {
    cursor: pointer;
  }
  .pic_img {
    width: 310px;
    height: auto;
  }
}
.salegoods {
  float: left;
  width: 890px;
  height: 585px;
  padding-top: 20px;
  background: #fcda4f url("../assets/img/promotion_bottom.png") bottom no-repeat;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
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
      a {
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
        background: url("../assets/img/ico_cart.png") right 0 no-repeat;
        color: #fff;
        text-indent: -9999px;
      }
    }
  }
}
.recommend_ban {
  width: 1200px;
  margin: 10px auto;
  display: flex;
  .box {
    flex: 1;
    img {
      cursor: pointer;
    }
  }
}
</style>
