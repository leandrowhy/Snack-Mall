<template>
  <div class="header">
    <SiteTopBar />
    <LogoSearch />
    <Nav />
  </div>
</template>

<script>
import SiteTopBar from "@/components/header/SiteTopBar";
import LogoSearch from "@/components/header/LogoSearch";
import Nav from "@/components/header/Nav";
export default {
  name: "Header",
  components: {
    SiteTopBar,
    LogoSearch,
    Nav,
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #fff;
}
</style>
