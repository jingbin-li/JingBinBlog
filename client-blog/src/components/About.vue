<template>
  <div class="about">
    <Loading :isShowLoading="loading"></Loading>
    <NavBar></NavBar>
    <div class="content">

    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import Loading from "./Loading";
export default {
  name: "About",
  components: {
    NavBar,
    Loading,
  },
  data() {
    return {
      loading: true,
    };
  },
  methods: {},
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
};
</script>

<style lang="less" scoped>
.content{
  
}
@media only screen and (max-width: 768px) {
  .about {
    background-image: url("../assets/about_back.jpg");
  }
}
</style>
