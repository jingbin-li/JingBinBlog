<template>
  <div class="container">
    <HeaderTop></HeaderTop>
    <MainContent></MainContent>
  </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
import MainContent from "../components/MainContent";
// @ is an alias to /src
export default {
  name: "Container",
  components: {
    HeaderTop,
    MainContent,
  },
};
</script>
<style lang="less" scoped>
.top-background {
  background-image: url("../assets/headbcg.jpg");
}
</style>
