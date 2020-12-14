<template>
  <div>
    <Loading :isShowLoading="loading"></Loading>
    <div class="top">
      <NavBar></NavBar>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import Loading from "./Loading";
export default {
  name: "MessageBoard",
  components: {
    NavBar,
    Loading,
  },
};
</script>

<style></style>
