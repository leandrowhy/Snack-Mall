<template>
  <li class="item">
    <router-link
      :to="{ name: 'Goods', params: { id: item.g_id } }"
      target="_blank"
    >
      <p class="product-img">
        <img
          class="productitem"
          :src="item.g_picUrl ? item.g_picUrl[0] : '/'"
          :all="item.g_name"
          :title="item.g_name"
        />
      </p>
      <p class="nalaprice">
        <font>￥{{ item.g_discountPrice }}</font>
        <font class="xiaoliang">
          已售出
          <span class="sales">{{ item.g_sales ? item.g_sales : 0 }}</span>
        </font>
      </p>
      <p class="productname" v-html="brightenKeyword(item.g_name,keyword)"></p>
    </router-link>
    <div class="glmask">
      <div class="add-cart">加入购物车</div>
    </div>
  </li>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    keyword: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    brightenKeyword(val, keyword) {
      const Reg = new RegExp(keyword, "i");
      if (val) {
        const res = val.replace(
          Reg,
          `<span style="color: #fa5437;">${keyword}</span>`
        );
        return res;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  width: 230px;
  height: 355px;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  border: solid 1px #fff;
  transition: all 0.2s;
  &:hover {
    border: solid 1px #fc522c;
    .glmask {
      transition: all 0.2s;
      display: block;
    }
  }
  &:nth-child(5n) {
    margin-right: 0;
  }
  .product-img {
    display: block;
    overflow: hidden;
    img {
      width: 180px;
      height: 180px;
      padding: 25px;
    }
  }
  .nalaprice {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #fa5437;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
    padding: 0 10px;
    .xiaoliang {
      font-size: 14px;
      color: #646464;
      margin-right: 10px;
      height: 24px;
      line-height: 24px;
      position: absolute;
      right: 10px;
      .sales {
        color: #fa5437;
        padding: 0 5px;
      }
    }
  }
  .productname {
    height: 36px;
    line-height: 18px;
    margin: 0 15px;
    margin-top: 5px;
    font-size: 14px;
    overflow: hidden;
    color: #31373c;
    .key_word {
      color: #fa5437;
    }
  }
  .glmask {
    background: #fff;
    height: 50px;
    left: 0;
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 2;
    display: none;
    transition: all 0.2s;
    .add-cart {
      color: #fc0d1b;
      cursor: pointer;
      display: block;
      height: 28px;
      line-height: 28px;
      text-align: center;
      vertical-align: middle;
      width: 105px;
      margin: 5px auto;
      border: solid 1px #fc522c;
      background: #fff url("../assets/img/icon_add_to_cart.png") no-repeat 14px
        7px;
      background-size: auto auto;
      background-size: 15px;
      padding-left: 15px;
      transition: all 0.2s;
      &:hover {
        background: #fc522c url("../assets/img/icon_add_to_cart_hover.png")
          no-repeat 14px 7px;
        color: #ffffff;
      }
    }
  }
}
</style>
