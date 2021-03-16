import { get, post } from "@/utils/request";

//天天特价
export function getSpecial(params) {
  return get("/special", params);
}

//新品上市
export function getNewGoods(params) {
  return get("/newgoods", params);
}

// 根据id查询商品
export function getGoods(params) {
  return get("/getGoods", params);
}

// 热门商品
export function getHotGoods(params) {
  return get("/getHotGoods", params);
}

// 商品搜索
export function getSearchGoods(params) {
  return get("/getSearchGoods", params);
}

// 商品分类
export function getGoodsCata(params) {
  return get("/getGoodsCata", params);
}

// 商品分类
export function getAllGoods(params) {
  return get("/getAllGoods", params);
}

// 商品分类查询
export function getCategoryGoods(params) {
  return get("/getCategoryGoods", params);
}


// 登录
export function login(params) {
  return post("/users/login", params);
}