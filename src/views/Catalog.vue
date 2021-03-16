<template>
  <div class="cata">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>所有分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分类列表 -->
    <div class="common_main">
      <div class="box-list">
        <div class="item" v-for="item in cata" :key="item.c_id">
          <p class="title">
            <span
              @click="
                goCategory(item.c_id, item.parent_id, item.c_isone, item.c_name)
              "
              >{{ `${item.c_name}(${item.count})` }}</span
            >
          </p>
          <ul class="list">
            <li
              v-for="child in item.children"
              :key="child.c_id"
              @click="
                goCategory(
                  child.c_id,
                  child.parent_id,
                  child.c_isone,
                  child.c_name
                )
              "
            >
              {{ `${child.c_name}(${child.count})` }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsCata } from "@/api/api";
export default {
  name: "Catalog",
  data() {
    return {
      cata: [],
    };
  },
  computed: {
    allGoods() {
      return this.$store.state.allGoods;
    },
  },
  created() {
    getGoodsCata().then((res) => {
      this.cata = res.data;
      this.cata.forEach((item1) => {
        let count = 0;
        this.allGoods.forEach((item2) => {
          if (item1.c_id == item2.c_id) {
            count++;
          }
        });
        item1.children.forEach((item3) => {
          let count2 = 0;
          this.allGoods.forEach((item4) => {
            if (item3.c_id == item4.parent_id) {
              count2++;
            }
          });
          item3.count = count2;
        });
        item1.count = count;
      });
    });
  },
  methods: {
    goCategory(id, pid, isone, name) {
      this.$router.push({
        name: "Category",
        params: { id, pid, isone, name },
        query: { id, pid, isone, name },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.cata {
  width: 1200px;
  margin: 0 auto;
}
.common_main {
  background: #fff;
  padding-bottom: 2px;
  margin-top: 10px;
  overflow: hidden;
  .box-list {
    padding: 28px;
  }
  .item {
    .title {
      font-size: 18px;
      color: #e61952;
      width: 100%;
      border-bottom: solid 1px #eee;
      line-height: 50px;
      span {
        cursor: pointer;
      }
    }
    .list {
      display: flex;
      li {
        padding: 10px;
        font-size: 14px;
        margin-right: 10px;
        font-weight: bold;
        color: #333333;
        cursor: pointer;
        &:nth-child(1) {
          padding-left: 0;
        }
      }
    }
  }
}
</style>
