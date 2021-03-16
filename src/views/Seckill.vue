<template>
  <div class="seckill">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>天天特价</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 天天特价列表 -->
    <ul class="cle">
      <SeckillItem v-for="item in stateList" :key="item.g_id" :item="item" />
    </ul>
    <!-- 分页功能 -->
    <el-pagination
      background
      layout="prev, pager, next"
      prev-text="上一页"
      next-text="下一页"
      :page-size="pageSize"
      :total="saleList.length"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import SeckillItem from "@/components/seckill/SeckillItem";
import { getSpecial } from "@/api/api";
export default {
  name: "Seckill",
  components: {
    SeckillItem,
  },
  data() {
    return {
      saleList: [],
      stateList: [],
      pageSize: 12,
    };
  },
  created() {
    getSpecial().then((res) => {
      this.saleList = res.data;
      this.stateList = this.saleList.slice(0, this.pageSize);
    });
  },
  methods: {
    pageChange(val) {
      this.stateList = this.saleList.slice(
        (val - 1) * this.pageSize,
        val * this.pageSize
      );
      scrollTo(0, 0);
    },
  },
};
</script>

<style scoped lang="scss">
.seckill {
  width: 1200px;
  margin: 0 auto;
}
.cle {
  display: flex;
  flex-wrap: wrap;
}
</style>
