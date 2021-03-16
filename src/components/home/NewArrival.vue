<template>
  <div class="pro_con">
    <TitleLaytit title="新品上市" subTitle="我们是新来的，请多多关照哦！" />
    <ul class="madden-pro">
      <li v-for="(item, index) in shopList" :key="index">
        <span :title="item.g_name" class="img-change" @click="goGoods(item.g_id)">
          <img :src="item.g_picUrl[0]" class="pic_img" />
        </span>
        <p class="title" @click="goGoods(item.g_id)">{{ item.g_name }}</p>
        <div class="btns">
          <div class="pri">
            <b class="j_sellPrice">￥{{ item.g_discountPrice }}</b>
          </div>
          <span class="addtocart">加入购物车</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import TitleLaytit from "@/components/home/TitleLaytit";
export default {
  name: "NewArrival",
  components: {
    TitleLaytit,
  },
  computed: {
    shopList() {
      return this.$store.state.newGoods;
    },
  },
  created() {
  //  console.log(this.shopList);
  },
  methods: {
    goGoods(id) {
      this.$router.push({ name: "Goods", params: { id } });
    },
  },
};
</script>

<style scoped lang="scss">
.pro_con {
  width: 1200px;
  margin: 0 auto;
}
.madden-pro {
  overflow: hidden;
  background: #ffffff;
  display: flex;
  flex-wrap: wrap;
  li {
    width: 299px;
    border-right: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    &:nth-child(4n) {
      border-right: 0;
    }
  }
  .img-change {
    display: block;
    width: 180px;
    height: 180px;
    margin: 15px auto;
    overflow: hidden;
    background: #fff;
    cursor: pointer;
    .pic_img {
      height: 180px;
      width: 180px;
      transition: All 0.6s ease-in-out;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
  .title {
    text-align: center;
    cursor: pointer;
  }
  .btns {
    width: 200px;
    margin: 10px auto 0 auto;
    height: 80px;
    .pri {
      text-align: center;
      font-family: Arial, Helvetica, sans-serif;
      .j_sellPrice {
        color: #e61952;
        font-size: 18px;
        font-weight: normal;
      }
    }
    .addtocart {
      width: 90px;
      display: block;
      height: 24px;
      margin: 10px auto 0 auto;
      line-height: 24px;
      background: #ff6600;
      color: #fff;
      text-align: center;
      border-radius: 10px;
      cursor: pointer;
    }
  }
}
</style>
