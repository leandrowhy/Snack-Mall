<template>
  <div class="goods">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ name: 'Search', params: { key: goods.g_type } }"
        >{{ goods.g_type }}</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ goods.g_name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 商品展示 图片-价格 -->
    <div class="detail">
      <div class="detail_img">
        <img :src="goods.g_picUrl ? goods.g_picUrl[0] : '/'" />
      </div>
      <div class="item-info">
        <dl class="loaded">
          <!-- 商品名称 -->
          <dt class="product_name">
            <h1>{{ goods.g_name }}</h1>
            <p class="desc"></p>
          </dt>
          <!-- 价格品牌可用积分 -->
          <dd class="property">
            <div class="itemPanel">
              <h2>
                {{ goods.g_islow ? "促销价：" : "本店价："
                }}<font>￥{{ goods.g_discountPrice }}</font>
              </h2>
              <div class="market_price" v-if="goods.g_islow">
                <span class="timedown">
                  <i class="icon naozhong"></i>
                  剩余时间：<strong class="font_w">{{
                    `${day}天${hour}小时${minute}分钟${second}秒`
                  }}</strong>
                </span>
              </div>
              <div class="market_price" v-else>
                市场价：<em>￥{{ goods.g_price }}</em>
              </div>
            </div>
            <ul>
              <li>
                <span class="lbl">品牌</span>
                <span>{{ goods.g_brand }}</span>
              </li>
              <li>
                <span>可以使用<em class="red">0</em>积分</span>
              </li>
            </ul>
          </dd>
          <!-- 数量及购买 -->
          <dd class="tobuy-box">
            <p class="skunum">
              <span class="lbl">数量</span>
              <el-input-number
                v-model="num"
                @change="handleChange"
                :min="1"
                :max="goods.g_number"
              ></el-input-number>
              <span class="unit">件</span>
              <span class="unit">（{{ goods.g_number }}件）</span>
            </p>
            <p class="add_cart">
              <span class="btn-buy" @click="buyClick(1)">立即购买</span>
              <span class="btn-buy" @click="buyClick(2)">加入购物车</span>
            </p>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 商品详情  参数-规格 -->
    <div class="detail_bgcolor">
      <div class="z-detail-left">
        <ul class="itemContentHead">
          <li @click="detailNav(0)">
            <a href="#parameter" :class="{ achover: achover === 0 }"
              >规格参数</a
            >
          </li>
          <li @click="detailNav(1)">
            <a href="#introduction" :class="{ achover: achover === 1 }"
              >产品介绍</a
            >
          </li>
        </ul>
        <div class="product_tabs">
          <!-- 规格参数 -->
          <div class="sectionbox" id="parameter">
            <h4>规格参数</h4>
            <table class="spxq main">
              <tbody>
                <tr>
                  <td width="20%" class="th">产品名称:</td>
                  <td width="80%">{{ goods.g_name }}</td>
                </tr>
                <tr>
                  <td width="20%" class="th">产品品牌:</td>
                  <td width="80%">{{ goods.g_brand }}</td>
                </tr>
                <tr>
                  <td width="20%" class="th">产地:</td>
                  <td width="80%">
                    {{ goods.g_place ? goods.g_place : "未知" }}
                  </td>
                </tr>
                <tr>
                  <td width="20%" class="th">是否进口:</td>
                  <td width="80%">{{ goods.g_imported ? "是" : "否" }}</td>
                </tr>
                <tr>
                  <td width="20%" class="th">生产日期:</td>
                  <td width="80%">{{ goods.g_pDate | dataConversion }}</td>
                </tr>
                <tr>
                  <td width="20%" class="th">卡路里:</td>
                  <td width="80%">
                    {{ goods.g_energy == null ? "0" : goods.g_energy }} (大卡)
                  </td>
                </tr>
                <tr>
                  <td width="20%" class="th">保质期:</td>
                  <td width="80%">6个月</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- 产品介绍 -->
          <div class="sectionbox2" id="introduction">
            <h4>产品介绍</h4>
            <div class="spxq_main">
              <img :src="goods.g_dese ? goods.g_dese[0] : '/'" />
            </div>
          </div>
        </div>
      </div>
      <div class="z-detail-right">
        <div class="tabs_bar">
          <div class="tabs_bar2">热门商品</div>
        </div>
        <div class="hot_box">
          <ul>
            <li
              class="item"
              v-for="item in hot"
              :key="item.id"
              :title="item.g_name"
              @click="goHotGoods(item.g_id)"
            >
              <img
                :src="item.g_picUrl ? item.g_picUrl[0] : '/'"
                width="180"
                height="180"
              />
              <p class="name">{{ item.g_name }}</p>
              <p class="hot_price">
                <font>￥{{ item.g_discountPrice }}</font>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoods, getHotGoods } from "@/api/api";
export default {
  name: "Goods",
  data() {
    return {
      id: 0,
      goods: [],
      hot: [],
      num: 1,
      achover: 0,
      day: "00",
      hour: "00",
      minute: "00",
      second: "00",
      timer: null,
    };
  },
  filters: {
    dataConversion(dateData) {
      let date = new Date(dateData);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
  },
  created() {
    // 获取数据
    this.getGoodsData();
  },
  methods: {
    getGoodsData() {
      this.id = this.$route.params.id;
      getGoods({ id: this.id }).then((res) => {
        this.goods = res.data;
        document.title = this.goods.g_name + this.$route.meta.title;
      });
      getHotGoods().then((res) => {
        this.hot = res.data;
      });
      this.timer = setInterval(() => {
        let datetime = new Date(this.goods.g_lowDate).getTime();
        this.computedResidualTime(datetime);
      }, 100);
    },
    handleChange(value) {
      console.log(value);
    },
    buyClick(bo) {
      // bo 1-购买 2-加入购物车
      console.log(bo);
    },
    detailNav(i) {
      this.achover = i;
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
    goHotGoods(id) {
      window.location.href = `/goods/${id}`;
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="scss">
.goods {
  width: 1200px;
  margin: 0 auto;
}
.detail {
  background: #fff;
  margin-top: 10px;
  padding: 20px;
  display: flex;
  .detail_img {
    width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 50px;
    img {
      width: 350px;
      height: 350px;
    }
  }
  .item-info {
    flex: 1;
    color: #666;
    .loaded {
      padding-bottom: 10px;
      padding-left: 20px;
    }
    .product_name {
      color: #333;
      padding: 18px 6px 18px;
      padding-left: 0;
      h1 {
        font-size: 24px;
        font-weight: normal;
      }
    }
    .itemPanel {
      height: 84px;
      background: #fff;
      padding: 0px 30px 12px 0px;
      position: relative;
      margin-bottom: 0px;
      h2 {
        font-size: 14px;
        font-weight: normal;
        font {
          font-size: 36px;
          font-family: Arial;
          font-weight: normal;
          color: #fa5437;
        }
      }
      .market_price {
        font-size: 14px;
        em {
          color: #999;
          font-size: 12px;
          text-decoration: line-through;
          font-style: normal;
        }
      }
    }
    li {
      padding: 5px 0;
      width: 100%;
      font-size: 14px;
    }
    .lbl {
      display: inline-block;
      width: 70px;
      color: #666;
      letter-spacing: 20px;
    }
  }
}
.tobuy-box {
  padding-top: 10px;
  .skunum {
    margin-top: 15px;
    margin-bottom: 15px;
    .unit {
      margin-left: 5px;
      color: #999;
      font-size: 12px;
      padding-top: 10px;
    }
  }
  .add_cart {
    padding: 5px 0;
    font-size: 14px;
    .btn-buy {
      display: inline-block;
      line-height: 16px;
      _line-height: 18px;
      border-radius: 3px;
      border: 1px solid #fd532d;
      background-color: #fd532d;
      color: #fff;
      overflow: hidden;
      vertical-align: middle;
      font-size: 16px;
      padding: 10px 20px 12px;
      margin-right: 12px;
      cursor: pointer;
    }
  }
}
.detail_bgcolor {
  display: flex;
  padding-top: 16px;
}
.z-detail-left {
  width: 970px;
  background-color: #fff;
  margin-right: 20px;
  padding-bottom: 50px;
  .itemContentHead {
    height: 48px;
    border-bottom: 1px solid #ddd;
    li {
      display: inline-block;
      height: 54px;
      line-height: 54px;
      padding: 0 40px;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #e61952;
      }
    }
    .achover {
      color: #e61952;
    }
  }
  .product_tabs {
    padding-top: 20px;
    .sectionbox {
      padding: 0 20px;
      font-size: 14px;
      table {
        width: 100%;
        display: table;
        border-collapse: separate;
        box-sizing: border-box;
        text-indent: initial;
        border-spacing: 2px;
        border-color: grey;
      }
      h4 {
        font-size: 18px;
        height: 40px;
        font-weight: normal;
        padding-top: 10px;
      }
      table td.th {
        background-color: #f5f5f5;
        font-weight: bold;
        width: 70px;
        text-align: right;
      }
      table td {
        border: 1px solid #e5e5e5;
        padding: 5px 10px;
      }
    }
    .sectionbox2 {
      padding: 0 20px;
      h4 {
        font-size: 18px;
        height: 40px;
        font-weight: normal;
        padding-top: 50px;
      }
      .spxq_main {
        width: 100%;
      }
    }
  }
}
.z-detail-right {
  width: 216px;
  .tabs_bar {
    background: #fff;
    .tabs_bar2 {
      height: 48px;
      background: #fff;
      padding: 0 10px;
      display: block;
      line-height: 48px;
      text-align: left;
      font-size: 18px;
      border-bottom: 1px solid #ddd;
    }
  }
  .hot_box {
    background: #fff;
    li {
      padding: 10px;
      margin-bottom: 10px;
      border-bottom: 1px dotted #e5e5e5;
      padding-bottom: 10px;
      text-align: center;
      cursor: pointer;
      p {
        margin: 10px auto 0 auto;
      }
      .hot_price {
        color: #fa5437;
        font-weight: bold;
        font-size: 14px;
        line-height: 30px;
        font-family: Arial, Helvetica, sans-serif;
      }
    }
  }
}
.market_price {
  padding-top: 10px;
  font-size: 14px;
  strong {
    font-size: 14px;
    font-weight: normal;
    color: #666;
    margin: 0 10px;
  }
  .naozhong {
    font-size: 20px;
    color: #fa5437;
    margin-right: 5px;
    font-weight: bold;
  }
}
.red {
  color: red;
  font-style: normal;
  margin: 0 4px;
}
</style>
