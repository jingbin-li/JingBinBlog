<template>
  <div class="content">
    <div class="content-type">
      <h1>若不衣锦不还乡</h1>
    </div>
    <el-row :gutter="20">
      <el-col
        :span="12"
        class="card-item"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <div
          class="hover-effect smoothie"
          @mouseover="mouseOver(index)"
          @mouseleave="mouseLeave(index)"
        >
          <a href="" class="smoothie">
            <img
              :class="{
                effectImage: isEffect && item.tag,
              }"
              class="img-responsive smoothie"
              src="../assets/blog-large-1.jpeg"
              alt=""
            />
          </a>
          <div
            :class="{ 'hover-overlay': isEffect && item.tag }"
            class="overlay"
          >
            <div class="bottom-content">
              <h4>若不衣锦不还乡</h4>
              <div class="title-box">若不衣锦不还乡</div>
            </div>
          </div>
          <div
            :class="{ 'hover-dark-overlay': isEffect && item.tag }"
            class="dark-overlay"
          >
            <p class="brief">
              <small>
                大地最懂我胸膛 好男儿志在远方 为找炎黄曲悠扬 人生不过醒时梦一场
                一身胆色和热肠 若不衣锦不还乡 若不衣锦不还乡 大地最懂我胸膛
                好男儿志在远方 为找炎黄曲悠扬 人生不过醒时梦一场 一身胆色和热肠
                若不衣锦不还乡 若不衣锦不还乡
              </small>
            </p>

            <div class="bottom-content">
              <a class="btn">现在阅读</a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "MaxinContent",
  data() {
    return {
      isEffect: false,
      dataList: [
        {
          title: "若不衣锦不还乡",
          tag: false,
          content:
            "大地最懂我胸膛 好男儿志在远方 为找炎黄曲悠扬 人生不过醒时梦一场一身胆色和热肠 若不衣锦不还乡 若不衣锦不还乡 大地最懂我胸膛",
        },
        {
          title: "若不衣锦",
          tag: false,
          content:
            "大地最懂我胸膛 好男儿志在远方 为找炎黄曲悠扬 人生不过醒时梦一场 一身胆色和热肠 若不衣锦不还乡 若不衣锦不还乡 大地最懂我胸膛",
        },
      ],
    };
  },
  methods: {
    mouseOver(index) {
      this.isEffect = true;
      this.dataList[index].tag = true;
    },
    mouseLeave(index) {
      this.isEffect = false;
      this.dataList[index].tag = false;
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  padding: 40px 0px;
  max-width: 1200px;
  margin: 0px auto;
  height: 1000px;
}
.content-type {
  margin: 20px 0px;
  padding-bottom: 15px;
  border-bottom: 1px dashed black;
  h1 {
    color: #757575;
  }
}
.hover-effect {
  position: relative;
  //   overflow: hidden;
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
    backface-visibility: hidden;
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
  height: 339px;
}
img {
  vertical-align: middle;
}
.test {
  color: red;
}
</style>
