<template>
  <div class="comments-main">
    <div>
      <div class="notification" @click="showCommentsFun" v-if="!isShowComments">
        <i class="iconfont">&#xe603;</i>
        <span>查看{{ commentsType[type] }}</span>
      </div>
      <div class="comments-box transition_dom" ref="box">
        <div class="comments-total">
          Comments | {{ commentsTotal }}条{{ commentsType[type] }}
        </div>
        <CommentsContent
          :commentsList="commentsList"
          @resetheight="resetBoxHeight"
        ></CommentsContent>
        <CommentsInput :dataId="-1"> </CommentsInput>
      </div>
    </div>
  </div>
</template>

<script>
import CommentsContent from "./CommentsContent";
// import eventBus from "../../js/eventBus.js";
import CommentsInput from "./CommentsInput";
export default {
  name: "Comments",
  props: ["type", "articleId"],
  components: {
    CommentsContent,
    CommentsInput,
  },
  data() {
    return {
      isShowComments: false,
      commentsTotal: 0,
      height: "",
      typeTitle: "",
      commentsType: {
        message: "留言",
        comment: "评论",
      },
      commentsList: [
        {
          id: 1,
          avatar: "",
          name: "大鹏",
          content:
            "这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧",
          createTime: "2020-11-30",
          reply: [
            {
              id: 2,
              avatar: "",
              name: "小胡",
              content: "大鹏你说的对",
              createTime: "2020-11-30",
              reply: [],
            },
            {
              id: 3,
              avatar: "",
              name: "小潘",
              content: "小胡你说的也对",
              createTime: "2020-11-30",
              reply: [],
            },
          ],
        },
        {
          id: 4,
          avatar: "",
          name: "大鹏",
          content:
            "这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧这个博客太好看了吧",
          createTime: "2020-11-30",
          reply: [
            {
              id: 5,
              avatar: "",
              name: "小胡",
              content: "大鹏你说的对",
              createTime: "2020-11-30",
              reply: [],
            },
            {
              id: 6,
              avatar: "",
              name: "小潘",
              content: "小胡你说的也对",
              createTime: "2020-11-30",
              reply: [],
            },
          ],
        },
      ],
    };
  },
  methods: {
    showCommentsFun() {
      this.$nextTick(() => {
        this.isShowComments = !this.isShowComments;
        if (!this.isShowComments) {
          this.$refs.box.style.height = 0 + "px";
        } else {
          this.$refs.box.style.height = this.height;
        }
      });
    },
    setCommentsBoxHeight() {
      const height = this.$refs.box.offsetHeight + "px";
      this.$refs.box.style.height = 0 + "px";
      this.height = height;
    },
    resetBoxHeight(reHegith) {
      if (reHegith) {
        this.$refs.box.style.height = reHegith;
      } else {
        this.$refs.box.style.height = this.height;
      }
    },
    getCommentsToal(commentsList) {
      if (commentsList.length !== 0) {
        this.commentsTotal += commentsList.length;
        for (const item of commentsList) {
          this.getCommentsToal(item.reply);
        }
      }
    },
    getTyeOfComments(type) {
      switch (type) {
        case "messageBoard":
          this.typeTitle = "留言";
          break;
        case "comments":
          this.typeTitle = "评论";
          break;
      }
    },
  },
  mounted() {
    console.log("=====>", this.articleId);
    this.getCommentsToal(this.commentsList);
    this.setCommentsBoxHeight();
    this.$store.commit("setResetMethod", this.resetBoxHeight);
  },
};
</script>

<style lang="less" scoped>
.comments-main {
  padding: 50px 0;
  max-width: 800px;
  margin: 0 auto;
  .notification {
    padding: 17px 32px 15px;
    background: #fff;
    color: #6f6f6f;
    font-family: microsoft yahei;
    width: 110px;
    margin: 30px auto;
    border: 1px solid #c7c7c7;
    cursor: pointer;
    display: flex;
    align-items: center;
    i {
      font-size: 30px;
      margin-right: 5px;
    }
  }
  .comments-box {
    overflow: hidden;
  }
  .transition_dom {
    transition: all 0.6s ease;
  }
  .comments-total {
    padding: 0px 10px;
    margin-bottom: 40px;
    font-family: microsoft yahei;
    color: #7d7d7d;
    font-weight: 400;
  }
}
</style>
