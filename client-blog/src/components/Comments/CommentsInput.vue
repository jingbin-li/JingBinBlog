<template>
  <div>
    <div class="comment-input" v-show="this.$store.state.currentId === dataId">
      <div class="author">
        <div class="author-updown">
          <p>Welcome back,</p>
          <span @click="showInfo">修改</span>
        </div>
        <div class="cancle-btn" @click="cancleReply">取消回复</div>
      </div>
      <div class="info transition_dom" ref="box">
        <input type="text" placeholder="Name" v-model="name" />
        <input type="text" placeholder="Email" v-model="email" />
        <input type="text" placeholder="http://" v-model="http" />
      </div>
      <div class="comment-text">
        <textarea
          name="text"
          id="comment"
          cols="30"
          rows="10"
          placeholder="come on baby"
          v-model="content"
        ></textarea>
      </div>
      <div class="footer">
        <a class="send-btn" @click="submit"> 发表评论</a>
        <div class="expression">
          <div class="expression-logo">
            <span>OωO表情</span>
          </div>
          <div class="expression-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import emoji from "../../emoji/emoji.json";
import axios from "axios";
export default {
  data() {
    return {
      height: "",
      isShow: false,
      faceList: [],
      name: "",
      email: "",
      http: "",
      content: "",
    };
  },
  props: ["currentId", "dataId"],
  methods: {
    showInfo() {
      this.isShow = !this.isShow;
      if (!this.isShow) {
        this.$refs.box.style.height = 0 + "px";
      } else {
        this.$refs.box.style.height = "70px";
      }
    },
    setHeight() {
      this.$nextTick(() => {
        this.$refs.box.style.height = 0 + "px";
      });
    },
    // spliceList(data) {
    //   for (var i = 0; i < data.length; i += 4) {
    //     this.faceList.push(data.slice(i, i + 4));
    //   }
    //   console.log(this.faceList);
    // },
    cancleReply() {
      this.$store.commit("chanageCurrentId", -1);
      this.$store.state.resetMethod();
    },
    submit() {
      const articleId = this.$store.state.currentArticleId;
      const commentType =
        this.$store.state.currentId === -1
          ? "fatherComment"
          : "childrenComment";
      console.log("submit", articleId);
      axios.post("/api/v1/comments/saveComments", {
        name: this.name,
        email: this.email,
        http: this.http,
        articleId,
        commentType,
        content: this.content,
      });
    },
  },
  mounted() {
    this.setHeight();
    this.$store.commit("chanageCurrentHeight", this.cancleReply);
  },
};
</script>

<style lang="less" scoped>
.comment-input {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px dashed #a0dad0;
  .author {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .author-updown {
      display: flex;
      p {
        font-family: "microsoft yahei", Arial, Sans-Serif;
        font-size: 16px;
        overflow: hidden;
        text-transform: uppercase;
        color: #9499a8;
        margin-right: 5px;
      }
      span {
        font-family: "microsoft yahei", Arial, Sans-Serif;
        font-size: 16px;
        overflow: hidden;
        text-transform: uppercase;
        color: #5f5f5f;
        cursor: pointer;
        transition: all 0.4s ease;
      }
      span:before {
        content: "[";
      }
      span:after {
        content: "]";
      }
      span:hover {
        color: rgb(131, 175, 155);
      }
    }
    .cancle-btn {
      background: #f4f6f8;
      border-radius: 3px;
      padding: 12px 25px;
      font-size: 12px;
      color: #454545;
      cursor: pointer;
      transition: all 0.4s ease;
    }
    .cancle-btn:hover {
      color: rgb(131, 175, 155);
    }
  }
  .info {
    margin-top: 20px;
    overflow: hidden;
    input {
      margin-bottom: 20px;
      border: 2px solid #dde6ea;
      margin-right: 3%;
      padding: 16px 25px 15px;
    }
  }
  .transition_dom {
    transition: all 0.4s ease;
  }
  .comment-text {
    textarea {
      display: block;
      font-family: miranafont, "Hiragino Sans GB", STXihei, "Microsoft YaHei",
        SimSun, sans-serif;
      float: none;
      width: 100%;
      height: 180px;
      margin-bottom: 40px;
      color: #535a63;
      border: 2px solid #dde6ea;
      padding: 16px 25px 15px;
      box-sizing: border-box;
    }
  }
  .footer {
    display: flex;
    justify-content: space-between;
    .send-btn {
      font-size: 14px;
      width: auto;
      margin: 0;
      padding: 15px 35px;
      color: #fff;
      background: #a0dad0;
      border-right: 0;
      box-shadow: none;
      border: 0;
      border-radius: 2px;
      text-shadow: none;
      box-sizing: border-box;
      cursor: pointer;
      transition: all 0.5s ease;
    }
    .send-btn:hover {
      background-color: rgb(241, 241, 241);
      animation: shake 0.5s ease;
    }
    @keyframes shake {
      0% {
        transform: scale(1.2, 0.8);
      }
      25% {
        transform: scale(0.8, 1.2);
      }
      50% {
        transform: scale(1.2, 0.8);
      }
      75% {
        transform: scale(1);
      }
    }

    .expression {
      .expression-logo {
        display: inline-block;
        color: #888;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 13px;
        padding: 2px 5px;
        cursor: pointer;
        height: 22px;
        box-sizing: border-box;
        z-index: 2;
        line-height: 18px;
        span {
          display: block;
        }
      }
      span:hover {
        color: #444;
        animation: expression-shake 0.5s ease infinite;
      }
      @keyframes expression-shake {
        0% {
          transform: rotate(8deg);
        }
        30% {
          transform: translateY(2px);
        }
        50% {
          transform: rotate(8deg);
        }
        60% {
          transform: translateY(-2px);
        }
        80% {
          transform: translateY(2px);
        }
        100% {
          transform: translateY(-2px);
        }
      }
      .expression-body {
        display: flex;
      }
    }
  }
}
</style>
