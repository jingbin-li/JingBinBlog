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
import * as axios from "axios";
// @ is an alias to /src
export default {
  name: "Home",
  components: {
    HeaderTop,
    MainContent,
    Loading,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    axios
      .get("api/v1/home/articlesList")
      .then((res) => console.log(res.data))
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
};
</script>
<style lang="less" scoped>
.top-background {
  background-image: url("../assets/headbcg.jpg");
}
</style>
