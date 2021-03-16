<template>
  <div class="w-nav">
    <div class="t-nav">
      <!-- 商品分类 -->
      <div class="nav-categorys">
        <div class="catetit">
          <h2>
            <span>商品分类<i class="c-icon"></i></span>
          </h2>
        </div>
        <ul class="cate-item" :class="{ show: isShowNav }">
          <li v-for="(item, index) in cate" :key="index">
            <div class="cateone">
              <span>
                <i class="icon one" :class="[item.icon]"></i>
                {{ item.c_name }}
                <i class="icon you two"></i>
              </span>
            </div>
            <div class="catetwo" v-show="isClickNav">
              <dl>
                <dt
                  v-for="(childItem, index) in item.children"
                  :key="index"
                  @click="
                    goCategory(
                      childItem.c_id,
                      childItem.parent_id,
                      childItem.c_isone,
                      childItem.c_name
                    )
                  "
                >
                  <span>{{ childItem.c_name }}</span>
                </dt>
              </dl>
            </div>
          </li>
        </ul>
        
      </div>
      <ul class="nav-item">
        <li
          v-for="(item, index) in nav"
          :key="index"
          :class="{ cur: indexCount === index }"
          @click="navClick(item.pathName, index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <Notice />
    </div>
  </div>
</template>

<script>
import Notice from "@/components/header/Notice";
import { getGoodsCata } from "@/api/api";
export default {
  name: "Nav",
  components: { Notice },
  data() {
    return {
      cate: [],
      isShowNav: true,
      nav: [
        {
          name: "首页",
          pathName: "Home",
        },
        {
          name: "所有商品",
          pathName: "Catalog",
        },
        {
          name: "天天特价",
          pathName: "Seckill",
        },
      ],
      indexCount: 0,
      isClickNav: true,
      timer: null,
    };
  },
  created() {
    if (this.$route.name == "Home") {
      this.isShowNav = false;
    } else {
      this.isShowNav = true;
    }
    getGoodsCata().then((res) => {
      this.cate = res.data;
    });
  },
  methods: {
    navClick(name, index) {
      this.indexCount = index;
      this.$router.push({ name });
    },
    goCategory(id, pid, isone, name) {
      this.isClickNav = false;
      this.$router.push({
        name: "Category",
        params: { id, pid, isone, name },
        query: { id, pid, isone, name },
      });
      this.timer = setTimeout(() => {
        this.isClickNav = true;
      }, 100);
    },
  },
  watch: {
    $route(to) {
      if (to.name == "Home") {
        this.isShowNav = false;
        this.indexCount = 0;
        return;
      } else {
        this.isShowNav = true;
      }
      if (to.name == "Catalog") {
        this.indexCount = 1;
        return;
      }
      if (to.name == "Seckill") {
        this.indexCount = 2;
        return;
      }
      this.indexCount = 0;
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style scoped lang="scss">
.w-nav {
  width: 100%;
  height: 46px;
  margin: 0 auto;
  background: #e61952;
  .t-nav {
    width: 1200px;
    height: 46px;
    margin: 0 auto;
    display: flex;
  }
}
.nav-categorys {
  position: relative;
  z-index: 40;
  &:hover {
    .show {
      display: block;
    }
  }
  .catetit {
    width: 210px;
    line-height: 46px;
    h2 {
      font-size: 14px;
      font-weight: bold;
      span {
        background: url("../../assets/img/nav.png") 20px 18px no-repeat #1d1d1d;
        font: 15px/46px "\5FAE\8F6F\96C5\9ED1";
        color: #fff;
        display: block;
        height: 46px;
        text-decoration: none;
        text-align: center;
        text-indent: -15px;
        cursor: default;
        position: relative;
        cursor: pointer;
        font-weight: 400;
      }
      i {
        background-position: -23px 0;
        width: 9px;
        height: 6px;
        position: absolute;
        top: 22px;
        right: 25px;
      }
    }
  }
  .cate-item {
    background: url("../../assets/img/silde.png") center top no-repeat #3b3b3b;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#55ffffff',endColorstr='#55ffffff');
    width: 210px;
    height: 440px;
    padding: 0;
    padding-top: 0px;
    position: absolute;
    top: 46px;
    left: 0;
    overflow: visible;
    z-index: 999;
    li {
      height: 45px;
      line-height: 45px;
      cursor: pointer;
      width: 100%;
      .catetwo {
        display: none;
        position: absolute;
        top: 0;
        left: 210px;
        background: #fff;
        z-index: 42;
        overflow: visible;
        width: 420px;
        height: 440px;
        padding: 20px;
        dl {
          display: flex;
          flex-wrap: wrap;
          dt {
            width: 105px;
            min-height: 35px;
            margin-bottom: 10px;
            text-align: center;
            span {
              cursor: pointer;
              font-size: 12px;
              &:hover {
                color: #e61952;
              }
            }
          }
        }
      }
      &:hover {
        .cateone {
          background: #fff;
          span {
            color: #e61952;
          }
        }
        .catetwo {
          display: block;
        }
      }
      .cateone {
        height: 45px;
        line-height: 45px;
        overflow: hidden;
        position: relative;
        zoom: 1;
        z-index: 999;
        span {
          color: #fff;
          font-weight: normal;
          height: 44px;
          line-height: 44px;
          font-family: microsoft yahei;
          font-size: 14px;
          z-index: 999;
          padding-left: 30px;
          font-weight: 400;
          .one {
            padding-right: 20px;
          }
          .two {
            display: inline-block;
            width: 17px;
            height: 17px;
            vertical-align: middle;
            position: absolute;
            top: 16px;
            right: 17px;
            font-size: 10px;
            line-height: 14px;
          }
        }
      }
    }
  }
}
.show {
  display: none;
}
.nav-item {
  width: 600px;
  overflow: hidden;
  display: flex;
  li {
    height: 46px;
    line-height: 46px;
    padding: 0 25px;
    text-align: center;
    position: relative;
    color: #fff;
    display: block;
    font-size: 16px;
    text-decoration: none;
    cursor: pointer;
    &:hover {
      background: #b1133f;
    }
  }
}
.cur {
  background: #b1133f;
}
</style>
