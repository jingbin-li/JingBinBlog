<template>
  <div class="about">
    <Loading :isShowLoading="loading"></Loading>
    <div class="top">
      <NavBar></NavBar>
    </div>
    <div class="content">
      <h1>关于作者</h1>
      <h2>个人简介 | Resume</h2>
      <p>
        我是一个热爱技术的小白，一直觉得编程大牛才是世界上最叼的，好的程序员绝对是造福世界，改变世界。比尔盖茨用Windows改变了世界，扎克伯格用facebook连接了全世界，不求我的代码能改变世界，但求自己开心就好~
        这里特别说一下关于 “不要自称为程序员” 的说法:
        首先我认同这样的说法，相比而言自己真不算什么程序员，但是人总要往高处走；So
        你应该把自己描述成与增加收入、降低成本有关系的人，比如”xx产品的开发者”或”改进者”。有一个
        Google Adsense 程序员的自我介绍，是这样写的：”Google
        公司97%的收入，与我的代码有关。”
      </p>
    </div>
    <Comments></Comments>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import Loading from "./Loading";
import Comments from "./Comments/Comments";
export default {
  name: "About",
  components: {
    NavBar,
    Loading,
    Comments,
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
.about {
  transition: all 0.4s;
}
.content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0px 10px;
  h1 {
    margin: 16px 0;
    font-size: 23px;
    font-weight: 600;
    color: #737373;
  }
  h1:before {
    content: "#";
    margin-right: 6px;
    color: #ff6d6d;
    font-size: 20px;
    font-weight: 600;
  }
  h2 {
    margin: 16px 0;
    font-size: 23px;
    font-weight: 600;
    color: #737373;
  }
  h2::before {
    content: "[";
    margin-right: 5px;
    color: #ff6d6d;
    font-size: 25px;
    position: relative;
    top: 2px;
  }
  h2:after {
    content: "]";
    margin-left: 5px;
    color: #ff6d6d;
    font-size: 25px;
    position: relative;
    top: 2px;
  }
}

@media only screen and (max-width: 768px) {
  .top {
    background-image: url("../assets/about_back.jpg");
  }
}
</style>
