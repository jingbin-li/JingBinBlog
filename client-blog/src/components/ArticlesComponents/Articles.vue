<template>
  <div class="articles">
    <Loading :isShowLoading="loading"></Loading>
    <div class="top">
      <NavBar></NavBar>
    </div>
    <Top :title="title" :imageSrc="imageSrc"></Top>
    <div class="content">
      <router-view></router-view>
    </div>
    <Comments :type="type"></Comments>
  </div>
</template>

<script>
import NavBar from "../NavBar";
import Loading from "../Loading";
import Comments from "../Comments/Comments";
import Top from "../Top";
export default {
  name: "Articles",
  components: {
    NavBar,
    Loading,
    Comments,
    Top,
  },
  data() {
    return {
      loading: false,
      isNowRead: false,
      title: "文章",
      imageSrc: "../assets/1.jpg",
      type: "comment",
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.articles {
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
  .content-detial {
    overflow: hidden;
    transition: all 0.4s ease;
  }
  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .btn {
      background-color: #f64747;
      text-transform: uppercase;
      padding: 8px 18px;
      font-weight: 800;
      border-width: 2px;
      letter-spacing: 4px;
      font-weight: 400;
      transition: all 0.4s;
      cursor: pointer;
      text-decoration: none;
    }
    .btn:hover {
      background-color: black;
    }
    .time {
      font-size: 12px;
      letter-spacing: 1px;
      font-family: microsoft yahei light;
      color: rgb(254, 67, 101);
      line-height: 20px;
    }
  }
}
hr {
  margin-top: 20px;
  border: 0px;
  border-bottom: 1px dashed black;
}
@media only screen and (max-width: 768px) {
  .top {
    // display: block;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
  }
}
</style>
