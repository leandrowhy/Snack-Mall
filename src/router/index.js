import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: {
      title: "首页_零食小吃货官方购物平台",
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue"),
    meta: {
      title: "个人中心_零食小吃货官方购物平台",
    },
  },{
    path: "/catalog",
    name: "Catalog",
    component: () => import("../views/Catalog.vue"),
    meta: {
      title: "所有分类_零食小吃货官方购物平台",
    },
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("../views/Category.vue"),
    meta: {
      title: "_商品分类_零食小吃货官方购物平台",
    },
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: () => import("../views/Checkout.vue"),
    meta: {
      title: "结算_零食小吃货官方购物平台",
    },
  },
  {
    path: "/cart",
    name: "ShoppingCart",
    component: () => import("../views/ShoppingCart.vue"),
    meta: {
      title: "购物车_零食小吃货官方购物平台",
    },
  },
  {
    path: "/goods/:id",
    name: "Goods",
    component: () => import("../views/Goods.vue"),
    meta: {
      title: "_零食小吃货官方购物平台",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "登录_零食小吃货官方购物平台",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      title: "注册_零食小吃货官方购物平台",
    },
  },
  {
    path: "/search/:key",
    name: "Search",
    component: () => import("../views/Search.vue"),
    meta: {
      title: "_商品搜索_零食小吃货官方购物平台",
    },
  },
  {
    path: "/seckill",
    name: "Seckill",
    component: () => import("../views/Seckill.vue"),
    meta: {
      title: "天天特价_零食小吃货官方购物平台",
    },
  },
];



const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {//如果设置标题，拦截后设置标题
    document.title = to.meta.title
  }
  next()
})

export default router;
