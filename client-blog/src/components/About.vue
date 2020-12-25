<template>
  <div class="about">
    <Loading :isShowLoading="loading"></Loading>
    <div class="top">
      <NavBar></NavBar>
    </div>
    <div class="content">
      <h1>关于作者</h1>
      <h2>个人简介 | Resume</h2>
      <p v-html="aboutData.content"></p>
    </div>
    <Comments
      :type="type"
      :commentsList="commentsList"
      :total="total"
    ></Comments>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import Loading from "./Loading";
import Comments from "./Comments/Comments";
import axios from "axios";
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
      type: "comment",
      aboutData: "",
      commentsList: [],
      total: 0,
    };
  },
  methods: {
    getAbout() {
      axios
        .get("/api/v1/about/aboutArticles")
        .then((x) => {
          const data = x.data.data[0];
          this.aboutData = data;
          const articleId = data._id;
          this.$store.commit("setCurrentArticleId", articleId);
          this.getComments(articleId);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getComments(articleId) {
      axios
        .get("/api/v1/comments/commentsList", {
          params: {
            articleId,
          },
        })
        .then((x) => {
          console.log(x);
          this.commentsList = x.data.tree;
          this.total = x.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {},
  mounted() {
    this.getAbout();
  },
};
</script>

<style lang="less" scoped>
.about {
  transition: all 0.4s;
  padding-top: 80px;
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
  .about {
    padding-top: 0;
  }
}
</style>
