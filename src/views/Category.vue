<template>
  <div class="category">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'Catalog' }"
        >所有分类</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 排序 -->
    <div class="sort">
      <ul class="bd">
        <li
          v-for="(item, index) in sort"
          :key="index"
          :class="{ active: indexCount === index }"
        >
          <span @click="sortGoods(index)"
            >{{ item }}
            <i
              class="el-icon-caret-top"
              v-if="indexCount === index && isdesc === 0"
            ></i>
            <i class="el-icon-caret-bottom" v-else></i>
          </span>
        </li>
      </ul>
    </div>
    <div class="productlist">
      <ul class="cle" v-if="goods.length != 0">
        <GoodsItem v-for="item in goodsList" :key="item.g_id" :item="item" />
      </ul>
      <div class="maincon" v-else>
        <div style="text-align:center;padding-top:30px;">
          <img src="../assets/img/searchnull.jpg" alt="" />
        </div>
        <div
          style="text-align:center;font-size: 22px !important;padding-top:30px;"
        >
          抱歉！我们努力也没有找到您想要的结果……
        </div>
      </div>
      <!-- 分页功能 -->
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :total="goods.length"
        :current-page.sync="pageIndex"
        @current-change="pageChange"
        v-if="goods.length != 0"
      />
    </div>
  </div>
</template>

<script>
import GoodsItem from "@/components/GoodsItem";
import { getCategoryGoods } from "@/api/api";
export default {
  name: "Category",
  components: { GoodsItem },
  data() {
    return {
      id: null,
      pid: null,
      isone: null,
      name: null,
      goods: [],
      sort: ["默认", "销量", "上架时间", "价格"],
      indexCount: 0,
      isdesc: 0,
      pageSize: 15,
      goodsList: [],
      pageIndex: 1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.id = this.$route.query.id;
      this.pid = this.$route.query.pid;
      this.isone = this.$route.query.isone;
      this.name = this.$route.query.name;
      getCategoryGoods({
        id: this.id,
        pid: this.pid,
        isone: this.isone,
      }).then((res) => {
        this.goods = res.data;
        this.goodsList = this.goods.slice(0, this.pageSize);
      });
    },
    sortGoods(i) {
      if (this.indexCount === i && this.isdesc === 1) {
        // 升序
        this.goods.sort(function(a, b) {
          if (i === 0) {
            //   默认
            return a.g_id - b.g_id;
          } else if (i === 1) {
            //   销量
            return a.g_sales - b.g_sales;
          } else if (i === 2) {
            //   上架时间
            return a.g_createDate - b.g_createDate;
          } else {
            //   价格
            return a.g_discountPrice - b.g_discountPrice;
          }
        });
        this.isdesc = 0;
      } else {
        // 降序
        this.goods.sort(function(a, b) {
          if (i === 0) {
            //   默认
            return b.g_id - a.g_id;
          } else if (i === 1) {
            //   销量
            return b.g_sales - a.g_sales;
          } else if (i === 2) {
            //   上架时间
            return b.g_createDate - a.g_createDate;
          } else {
            //   价格
            return b.g_discountPrice - a.g_discountPrice;
          }
        });
        this.isdesc = 1;
      }
      this.goodsList = this.goods.slice(0, this.pageSize);
      this.pageIndex = 1
      this.indexCount = i;
    },
    pageChange(val) {
      this.goodsList = this.goods.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
      scrollTo(0, 0);
    },
  },
  watch: {
    $route(to) {
      this.getData();
      document.title = to.query.name + to.meta.title;
    },
  },
};
</script>

<style scoped lang="scss">
.category {
  width: 1200px;
  margin: 0 auto;
}
.productlist {
  width: 1200px;
  overflow: hidden;
  .cle {
    display: flex;
    flex-wrap: wrap;
  }
  .maincon {
    margin-top: 100px;
  }
}
.sort {
  margin-bottom: 10px;
  height: 30px;
  padding: 5px 0;
  background: #fff;
  .bd {
    padding-right: 12px;
    display: flex;
    li {
      display: inline-block;
      font-size: 14px;
      position: relative;
      z-index: 1;
      span {
        display: block;
        padding: 5px 26px 5px 15px;
        cursor: pointer;
        &:hover {
          color: #e61952;
        }
      }
    }
    .active {
      color: #e61952;
    }
  }
}
</style>
