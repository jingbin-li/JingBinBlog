<template>
  <div>
    <Loading :isShowLoading="loading"></Loading>
    <div class="content">
      <h1>{{ article.title }}</h1>
      <h2>{{ article.articleTitle }}</h2>
      <div class="content-detial">
        <p v-html="article.content"></p>
      </div>
      <div class="footer">
        <div class="time">
          <p>创建时间：{{ article.createTime }}</p>
          <p>最后一次更新：{{ article.updateTime }}</p>
        </div>
      </div>
      <hr />
      <Comments
        :type="type"
        :commentsList="commentsList"
        :total="total"
        :articlesId="articlesId"
      ></Comments>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Loading from "../Loading";
import Comments from "../Comments/Comments";
import getComments from "../../tool/commonTool.js";
import prismjs from "prismjs";
export default {
  components: { Loading, Comments },
  data() {
    return {
      article: {},
      loading: true,
      type: "articles",
      commentsList: [],
      total: 0,
      articlesId: "",
    };
  },
  methods: {
    getArticles() {
      const id = this.$route.query.id;
      this.articlesId = id;
      axios
        .get("/api/v1/articles/articlesDetial", {
          params: {
            id,
          },
        })
        .then((x) => {
          const data = x.data.data[0];
          this.article = {
            title: data.mainMenu[0].articleType,
            articleTitle: data.secondaryMenu[0].articleType,
            content: data.content,
            updateTime: moment(data.updateTime).format("YYYY年MM月DD日 HH:mm"),
            createTime: moment(data.createTime).format("YYYY年MM月DD日 HH:mm"),
          };
          this.$nextTick(() => {
            prismjs.highlightAll();
          });
          this.$store.commit("setCurrentArticleId", data._id);
          this.loading = false;
          getComments(id).then((x) => {
            this.commentsList = x.data.tree;
            this.total = x.data.total;
          });
        });
    },
  },
  created() {
    this.getArticles();
  },
};
</script>

<style lang="less" scoped>
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
    padding-bottom: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-family: microsoft yahei light;
    color: rgb(254, 67, 101);
    line-height: 20px;
  }
}
</style>
