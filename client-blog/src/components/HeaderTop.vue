<template>
  <div class="header-top">
    <div class="NavBar">
      <NavBar></NavBar>
    </div>
    <div class="header-content">
      <div class="focusinfo">
        <div class="top-header">
          <img src="../assets/touxiang.png" alt="" />
        </div>
        <div class="signature">
          <p>纸上得来终觉浅，绝知此事要躬行</p>
        </div>
        <div class="link-info">
          <ul>
            <li>
              <el-popover placement="bottom" width="150" trigger="hover">
                <div class="code">
                  <img style="width:150px;" src="../assets/code.jpg" alt="" />
                </div>
                <img slot="reference" src="../assets/weixin.png" alt="" />
              </el-popover>
            </li>
            <li>
              <a href="https://weibo.com/u/5025637797" target="_blank">
                <img src="../assets/weibo.png" alt="" />
              </a>
            </li>
            <li>
              <a href="https://github.com/jingbin-li" target="_blank">
                <img src="../assets/github.png" alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mp3">
      <audio controls="controls">
        <source src="../assets/audio/伏仪 - 时光采样 (钢琴版).mp3" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar";
export default {
  name: "HeaderTop",
  components: {
    NavBar,
  },
  data() {
    return {
      navList: ["首页", "关于", "文章", "留言板"],
      isShowSearch: false,
    };
  },
  methods: {
    showSearch() {
      this.isShowSearch = !this.isShowSearch;
    },
  },
  mounted() {
    this.$nextTick(() => {
      document.addEventListener("keyup", (x) => {
        if (x.keyCode === 27) {
          this.isShowSearch = false;
        }
      });
    });
  },
};
</script>
<style lang="less" scoped>
.header-top {
  //height: 60px;
  width: 100%;
  //background-color: #ffffff;
  height: 100vh;
  background-image: url("http://cdn.jingbin.site/headbcg.jpg");
  background-size: cover;
}
.header-content {
  text-align: center;
  padding-top: 80px;
  .focusinfo {
    display: inline-block;
    width: 100%;
    .top-header {
      text-align: center;
      img {
        width: 80px;
        border-radius: 50%;
        border: 3px solid rgba(255, 255, 255, 0.3);
      }
    }
    .signature {
      display: inline-block;
      margin: 20px 0px;
      background: rgba(0, 0, 0, 0.3);
      width: 30%;
      padding: 30px;
      color: white;
      border-radius: 10px;
    }
    .link-info {
      ul {
        display: flex;
        justify-content: center;
        li {
          padding: 5px;
          margin: 5px;
          img {
            width: 32px;
            height: 32px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
          }
          .code {
            text-align: center;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .header-content .focusinfo .signature {
    width: 70%;
  }
  .header-content .focusinfo .top-header {
    margin-top: 20px;
  }
  .header-top {
    height: 100%;
  }
}
.mp3{
  position: fixed;
  right: 0;
  bottom: 0;
}
</style>
