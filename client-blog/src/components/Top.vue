<template>
  <div>
    <div class="top-image">
      <div class="iamge-detail">
        <img src="../assets/1.jpg" alt="图片" />
      </div>
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
  data(){
    return{
    }
  }
};
</script>
<style lang="less" scoped>
.top-image {
  position: relative;
  height: 500px;
  overflow: hidden;
}
.iamge-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
img {
  width: 100%;
  height: 100%;
  transition: all 0.8s ease;
}
img:hover {
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
