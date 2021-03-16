<template>
  <div class="register">
    <RegHeader :isBom="false" />
    注册页
  </div>
</template>

<script>
import RegHeader from "@/components/RegHeader";
export default {
  name: "Register",
  components: {
    RegHeader,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
