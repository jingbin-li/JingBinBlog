<template>
  <div>
    <div class="top-image">
      <div class="iamge-detail"></div>
      <div class="title">
        <h1>{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  props: ["title"],
};
</script>
<style lang="less" scoped>
.top-image {
  position: relative;
  height: 500px;
  overflow: hidden;
}
.iamge-detail {
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../assets/1.jpg");
  transition: all 0.8s ease;
}
.iamge-detail:hover {
  transform: scale(1.2);
}
.title {
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  z-index: 1;
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
}
@media only screen and (max-width: 768px) {
  
}
</style>
