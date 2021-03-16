<template>
  <div class="logo-search">
    <!-- logo -->
    <a href="/" class="logodiv" title="零食小吃货购物平台">
      <div class="c-logo"></div>
    </a>
    <!-- 搜索框 -->
    <div class="search-tab">
      <div class="search-form">
        <div class="so-input-box">
          <input
            type="text"
            class="soinput"
            v-model="searchStr"
            placeholder="请输入关键词"
            @keydown="backBtn"
          />
        </div>
        <input type="submit" class="sobtn" value="" @click="goSearchInput" />
      </div>
      <div class="search-tags">
        <span>热搜：</span>
        <ul>
          <li
            v-for="(item, index) in tags"
            :key="index"
            @click="goSearch(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 手机扫码 -->
    <div class="mobile_ewm">
      <span class="btn-qrcode-mobile">
        <span>手机扫码购买</span>
      </span>
    </div>
    <!-- 购物车 -->
    <div class="topbar-cart">
      <span class="cart-mini" @click="goCart">
        <i class="el-icon-shopping-cart-2"></i>
        <span>购物车</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogoSearch",
  data() {
    return {
      searchStr: "",
      tags: ["坚果", "果冻", "饼干", "锅巴", "威化饼"],
    };
  },
  methods: {
    goCart() {
      this.$router.push({ name: "ShoppingCart" });
    },
    goSearch(key) {
      this.searchStr = key;
      this.$router.push({ name: "Search", params: { key } });
    },
    goSearchInput() {
      this.$router.push({ name: "Search", params: { key: this.searchStr } });
    },
    backBtn(e) {
      if (e.keyCode == "13") {
        this.goSearchInput();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.logo-search {
  width: 1200px;
  margin: 0 auto;
  height: 80px;
  padding: 20px 0;
}
.logodiv {
  display: block;
  width: 350px;
  height: 80px;
  float: left;
  .c-logo {
    height: 100%;
    overflow: hidden;
    width: 100%;
    background: url("../../assets/img/c-logo.png") left center no-repeat;
  }
}
.search-form {
  display: flex;
}
.search-tab {
  float: left;
  width: 480px;
  margin: 10px 0 0 0;
  font-size: 12px;
  .so-input-box {
    border: 0;
    width: 372px;
    height: 32px;
    .soinput {
      display: flex;
      background: #fff;
      border: 2px solid #e61952;
      height: 28px;
      line-height: 28px;
      padding: 5px 0 5px 10px;
      font-size: 12px;
      color: #999;
      width: 360px;
    }
  }
  .sobtn {
    background: #e61952 url("../../assets/img/head-icons.png") no-repeat 24px -110px;
    display: inline;
    width: 72px;
    height: 42px;
    border: none;
    margin-right: 1px;
    cursor: pointer;
  }
  .search-tags {
    width: 517px;
    height: 18px;
    line-height: 18px;
    overflow: hidden;
    color: #999;
    margin-top: 8px;
    display: flex;
    span {
      margin-right: 16px;
    }
    ul {
      display: flex;
      li {
        margin-right: 10px;
        cursor: pointer;
        &:hover {
          color: #e61952;
        }
      }
    }
  }
}
.mobile_ewm {
  float: right;
  width: 138px;
  margin: 10px 10px 0 0;
  position: relative;
  _display: inline;
  height: 40px;
  border: solid 1px #ddd;
  background: #f9f9f9;
  .btn-qrcode-mobile {
    display: block;
    position: relative;
    width: 100px;
    height: 38px;
    background: url("../../assets/img/btn-qrcode-mobile.png") 8px 8px no-repeat;
    padding-left: 38px;
    cursor: pointer;
    &:hover {
      span {
        color: #e40214;
      }
    }
    span {
      width: 100px;
      height: 38px;
      line-height: 38px;
      font-size: 12px;
      color: #575757;
    }
  }
}
.topbar-cart {
  float: right;
  width: 150px;
  margin: 10px 10px 0 0;
  position: relative;
  _display: inline;
  height: 42px;
  .cart-mini {
    position: relative;
    z-index: 32;
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #363636;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      span {
        color: #e40214;
      }
    }
    i {
      font-size: 18px;
      color: #e40214;
    }
    span {
      padding-left: 8px;
    }
  }
}
</style>
