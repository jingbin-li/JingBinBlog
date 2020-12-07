<template>
  <div class="container">
    <Loading :isShowLoading="loading"></Loading>
    <HeaderTop></HeaderTop>
    <MainContent></MainContent>
  </div>
</template>

<script>
import HeaderTop from "../components/HeaderTop";
import MainContent from "../components/MainContent";
import Loading from "./Loading";
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    HeaderTop,
    MainContent,
    Loading
  },
  data(){
    return {
      loading:true
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
};
</script>
<style lang="less" scoped>
.top-background {
  background-image: url("../assets/headbcg.jpg");
}
</style>
