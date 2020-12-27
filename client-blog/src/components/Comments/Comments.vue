<template>
  <div class="comments-main">
    <div>
      <div class="notification" @click="showCommentsFun" v-if="!isShowComments">
        <i class="iconfont">&#xe603;</i>
        <span>查看{{ commentsType[type] }}</span>
      </div>
      <div class="comments-box" :class="{ transition_dom: isexpend }">
        <div class="comments-total">
          Comments | {{ total }}条{{ commentsType[type] }}
        </div>
        <div
          v-if="commentsList"
          class="loadFade"
          :class="{ 'loadFade-hover': isShow }"
        >
          <CommentsContent :commentsList="commentsList"></CommentsContent>
        </div>
        <CommentsInput :dataId="-1"> </CommentsInput>
      </div>
    </div>
  </div>
</template>

<script>
import CommentsContent from "./CommentsContent";
// import eventBus from "../../js/eventBus.js";
import CommentsInput from "./CommentsInput";
// import axios from "axios";
import getComments from "../../tool/commonTool";
export default {
  name: "Comments",
  props: {
    type: {
      type: String,
    },
    articlesId: {
      type: String,
    },
  },
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
        messageboard: "留言",
        articles: "评论",
      },
      isexpend: false,
      commentsList: [],
      total: 0,
      isShow: false,
    };
  },
  methods: {
    showCommentsFun() {
      this.$nextTick(() => {
        this.isShowComments = !this.isShowComments;
        this.isexpend = true;
      });
    },
    getTyeOfComments(type) {
      switch (type) {
        case "messageBoard":
          this.typeTitle = "留言";
          break;
        case "articles":
          this.typeTitle = "评论";
          break;
      }
    },
    getCommentsList() {
      this.isShow = false;
      getComments(this.articlesId, this.type).then((x) => {
        this.total = x.data.total;
        this.commentsList = x.data.tree;
        this.isShow = true;
      });
    },
  },
  mounted() {
    this.getCommentsList();
    this.$store.commit("setCommentType", this.type);
    this.$store.commit("setCommentsListMonthd", this.getCommentsList);
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
    max-height: 0;
    transition: max-height 5s ease;
  }
  .transition_dom {
    transition: max-height 5s ease;
    max-height: 15000px;
  }
  .comments-total {
    padding: 0px 10px;
    margin-bottom: 40px;
    font-family: microsoft yahei;
    color: #7d7d7d;
    font-weight: 400;
  }
}
.loadFade {
  padding: 0 10px;
  opacity: 0;
  transition: all 1s;
}
.loadFade-hover {
  opacity: 1;
}
</style>
