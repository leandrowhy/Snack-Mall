<template>
  <div class="notice">
    <div class="bs-sysMsg" v-if="systemMsg.length > 0">
      <i class="el-icon-bell"></i>
      <div class="msg__content">
        <el-carousel
          height="20px"
          direction="vertical"
          indicator-position="none"
          :autoplay="true"
        >
          <el-carousel-item v-for="item in systemMsg" :key="item.id">
            <span class="item">{{ item.title }}</span>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notice",
  data() {
    return {
      // 滚屏消息
      systemMsg: [
        { id: 0, title: "商城上线，轻松购物 服务到家" },
        { id: 1, title: "90后对休闲食品、在外餐饮的需求猛增" },
        { id: 2, title: "英国儿童每天吃零食总热量控制在100千卡以内" },
        
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.notice{
  width: 380px;
  height: 100%;
  display: flex;
  align-items: center;
}
/*轮翻消息*/
.bs-sysMsg {
  position: relative;
  display: flex;
  width: 100%;
  padding: 8px 12px;
  border-radius: 2px;
  color: #fff;
  overflow: hidden;
  opacity: 1;
  align-items: center;
  transition: opacity 0.2s;
}
.bs-sysMsg .msg__content {
  display: table-cell;
  padding: 0 8px;
  width: 100%;
}
.bs-sysMsg .msg__content .item {
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.bs-sysMsg .msg__content .item:hover {
  text-decoration: underline;
}
</style>
