<template>
  <div class="content">
    <div class="content-type">
      <h1>若不衣锦不还乡</h1>
    </div>
    <el-row>
      <el-col
        :span="12"
        class="card-item"
        v-for="item in dataList"
        :key="item._id"
        :xs="24"
      >
        <div
          class="hover-effect smoothie"
          @mouseover="mouseOver(item)"
          @mouseleave="mouseLeave(item)"
        >
          <a href="" class="smoothie">
            <img
              :class="{
                effectImage: checkTouchItem(item),
              }"
              class="img-responsive smoothie"
              :src="item.imgSrc"
              alt=""
            />
          </a>
          <div
            :class="{ 'hover-overlay': checkTouchItem(item) }"
            class="overlay"
          >
            <div class="bottom-content">
              <h4>{{ item.secondaryMenu[0].articleType }}</h4>
              <div class="title-box">若不衣锦不还乡</div>
            </div>
          </div>
          <div
            :class="{ 'hover-dark-overlay': checkTouchItem(item) }"
            class="dark-overlay"
          >
            <p class="brief">
              <small>
                {{ item.briefContent }}
              </small>
            </p>

            <div class="bottom-content">
              <router-link
                :to="{ path: '/articles/details', query: { id: item._id } }"
              >
                <a class="btn">现在阅读</a>
              </router-link>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as axios from "axios";
export default {
  name: "MaxinContent",
  data() {
    return {
      currentItem: {},
      dataList: [],
    };
  },
  methods: {
    mouseOver(item) {
      this.currentItem = item;
    },
    mouseLeave() {
      this.currentItem = {};
    },
    checkTouchItem(item) {
      return this.currentItem === item;
    },
    getArticlesList() {
      axios
        .get("api/v1/home/articlesList")
        .then((res) => {
          this.dataList = res.data.data;
          this.addImgSrc(this.dataList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addImgSrc(data) {
      for (const item of data) {
        const count = Math.round(Math.random() * 7 + 1);
        this.$set(item, "imgSrc", require(`../assets/blog-large-${count}.jpg`));
      }
    },
  },
  created() {
    this.getArticlesList();
  },
};
</script>
<style lang="less" scoped>
small {
  max-height: 100%;
  overflow: hidden;
}
.content {
  padding: 40px 0px;
  max-width: 1200px;
  margin: 0px auto;
  height: 1000px;
}
.content-type {
  margin: 20px 10px;
  padding-bottom: 15px;
  border-bottom: 1px dashed black;
  h1 {
    color: #757575;
  }
}
.hover-effect {
  position: relative;
  .article-title {
    margin-bottom: 8%;
  }
  .article-detail {
    color: #888888;
  }
  a,
  a:hover {
    transition: all 0.3s ease-in-out;
    outline: 0;
    text-decoration: underline;
  }
  .img-responsive {
    width: 100%;
    transform: scale(1.1);
  }
  .effectImage {
    transform: scale(1);
  }
  .overlay {
    position: absolute;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    top: 15px;
    left: 15px;
    opacity: 1;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 100%
    );
    transition: all 0.4s;
  }
  .hover-overlay {
    opacity: 0;
    transform: translateY(20px);
  }
  .dark-overlay {
    position: absolute;
    width: calc(100% - 30px);
    height: calc(100% - 30px);
    top: 15px;
    left: 15px;
    opacity: 0;
    transition: all 0.4s;
  }
  .hover-dark-overlay {
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    .brief {
      color: #fff;
      margin: 20px;
      small {
        color: #fff;
        font-size: 14px;
        letter-spacing: 1px;
      }
    }
  }
  .bottom-content {
    margin: 20px 0;
    position: absolute;
    bottom: 0px;
    left: 20px;
    h4 {
      color: #ffffff;
      font-family: "Raleway", serif;
      font-weight: 700;
      text-transform: uppercase;
    }
    .title-box {
      clear: left;
      background-color: #f64747;
      color: #fff;
      padding: 1px 7px 0;
      display: block;
      float: left;
      margin-top: 10px;
      letter-spacing: 2px;
      font-size: 11px;
      font-weight: 300;
      text-transform: uppercase;
      line-height: 19px;
    }
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
  }
}
.smoothie {
  transition: all 0.4s ease-in-out;
  width: 100%;
  overflow: hidden;
}
.card-item {
  display: block;
  padding: 0px 10px;
  margin-bottom: 20px;
}
img {
  vertical-align: middle;
}
@media only screen and (max-width: 768px) {
  .content {
    padding-top: 0px;
  }
}
</style>
