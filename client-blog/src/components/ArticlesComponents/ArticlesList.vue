<template>
  <div>
    <Loading :isShowLoading="loading"></Loading>
    <div v-for="item in articlesData" :key="item.id">
      <h1>{{ item.mainTitle }}</h1>
      <div v-for="data in item.data" :key="data._id">
        <h2>{{ data.secondaryMenu[0].articleType }}</h2>
        <div class="content-detial">
          <p>
            {{ data.briefContent === " " ? "暂无简介" : data.briefContent }}
          </p>
        </div>
        <div class="footer">
          <a class="btn" @click="nowRead(data._id)">现在阅读</a>
          <div class="time">
            <p>最后一次更新：{{ data.updateTime }}</p>
            <p>创建时间：{{ data.createTime }}</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import Loading from "../Loading";
export default {
  name: "ArticlesList",
  components: { Loading },
  data() {
    return {
      articlesData: [],
      loading: true,
    };
  },
  methods: {
    initDataList(data) {
      const byMainId = _.groupBy(data, "mainMenuId");
      const dataTotal = [...Object.values(byMainId)];
      for (const iterator of dataTotal) {
        iterator.map((item) => {
          item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm");
          item.updateTime = moment(item.updateTime).format("YYYY-MM-DD HH:mm");
        });
        this.articlesData.push({
          mainTitle: iterator[0].mainMenu[0].articleType,
          data: iterator,
        });
      }
    },
    getArticlesList() {
      axios
        .get("/api/v1/home/articlesList")
        .then((res) => {
          const data = res.data.data;
          this.initDataList(data);
          this.loading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    nowRead(id) {
      this.$router.push({ path: "/articles/details", query: { id } });
    },
  },
  created() {
    this.getArticlesList();
  },
};
</script>

<style lang="less" scoped>
.articles {
  transition: all 0.4s;
}
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
