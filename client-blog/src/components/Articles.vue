<template>
  <div class="articles">
    <Loading :isShowLoading="loading"></Loading>
    <div class="top">
      <NavBar></NavBar>
    </div>
    <Top :title="title"></Top>
    <div v-for="(item, index) in articlesData" :key="item.id">
      <div class="content">
        <h1>{{ title }}</h1>
        <h2>大鹏真帅啊</h2>
        <div class="content-detial" ref="box">
          <p ref="detial_box">
            {{ item.content }}
          </p>
        </div>
        <div class="footer">
          <a class="btn" @click="nowRead(index)">{{
            item.isExpend ? "取消阅读" : "现在阅读"
          }}</a>
          <div class="time">
            <p>最后一次更新：{{ item.updateTime }}</p>
            <p>创建时间：{{ item.createTime }}</p>
          </div>
        </div>
      </div>
    </div>
    <Comments></Comments>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import Loading from "./Loading";
import Comments from "./Comments/Comments";
import Top from "./Top";
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
      loading: true,
      title: "大鹏真的帅",
      isNowRead: false,
      articlesData: [
        {
          id: 1,
          title: "大鹏真帅",
          content:
            "我是一个热爱技术的小白，一直觉得编程大牛才是世界上最叼的，好的程序员绝对是造福世界，改变世界。比尔盖茨用Windows改变了世界，扎克伯格用facebook连接了全世界，不求我的代码能改变世界，但求自己开心就好~这里特别说一下关于 “不要自称为程序员” 的说法:首先我认同这样的说法，相比而言自己真不算什么程序员，但是人总要往高处走；So你应该把自己描述成与增加收入、降低成本有关系的人，比如”xx产品的开发者”或”改进者”。有一个Google Adsense 程序员的自我介绍，是这样写的：”Google公司97%的收入，与我的代码有关。”",
          createTime: "2020-10-1",
          // isExpend: false,
          updateTime: "2020-11-11",
        },
        {
          id: 2,
          title: "大鹏真帅",
          content:
            "我是一个热爱技术的小白，一直觉得编程大牛才是世界上最叼的，好的程序员绝对是造福世界，改变世界。比尔盖茨用Windows改变了世界，扎克伯格用facebook连接了全世界，不求我的代码能改变世界，但求自己开心就好~这里特别说一下关于 “不要自称为程序员” 的说法:首先我认同这样的说法，相比而言自己真不算什么程序员，但是人总要往高处走；So你应该把自己描述成与增加收入、降低成本有关系的人，比如”xx产品的开发者”或”改进者”。有一个Google Adsense 程序员的自我介绍，是这样写的：”Google公司97%的收入，与我的代码有关。”",
          createTime: "2020-10-1",
          // isExpend: false,
          updateTime: "2020-11-11",
        },
        {
          id: 3,
          title: "大鹏真帅",
          content:
            "我是一个热爱技术的小白，一直觉得编程大牛才是世界上最叼的，好的程序员绝对是造福世界，改变世界。比尔盖茨用Windows改变了世界，扎克伯格用facebook连接了全世界，不求我的代码能改变世界，但求自己开心就好~这里特别说一下关于 “不要自称为程序员” 的说法:首先我认同这样的说法，相比而言自己真不算什么程序员，但是人总要往高处走；So你应该把自己描述成与增加收入、降低成本有关系的人，比如”xx产品的开发者”或”改进者”。有一个Google Adsense 程序员的自我介绍，是这样写的：”Google公司97%的收入，与我的代码有关。”",
          createTime: "2020-10-1",
          // isExpend: false,
          updateTime: "2020-11-11",
        },
      ],
    };
  },
  methods: {
    nowRead(index) {
      const elseIndex = this.getIsExpend(index);
      const currentData = this.articlesData[index];
      if (elseIndex !== -1) {
        this.$refs.box[elseIndex].style.height = "42px";
        this.articlesData[elseIndex].isExpend = false;
      }
      currentData.isExpend = !currentData.isExpend;
      this.isNowRead = !currentData.isExpend;
      if (currentData.isExpend) {
        const height = this.$refs.detial_box[index].offsetHeight + "px";
        this.$refs.box[index].style.height = height;
        currentData.isExpend = true;
      } else {
        this.$refs.box[index].style.height = "42px";
      }
    },
    getIsExpend(currentIndex) {
      return this.articlesData.findIndex((x, index) => {
        if (index === currentIndex) {
          return false;
        }
        return x.isExpend;
      });
    },
    initDataList() {
      this.articlesData.map((item) => {
        this.$set(item, 'isExpend', false)
      });
      console.log(this.articlesData);
    },
  },
  mounted() {
    this.initDataList();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
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
    height: 42px;
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
