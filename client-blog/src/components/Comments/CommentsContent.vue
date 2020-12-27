<template>
  <div class="comments-contents" ref="box">
    <div class="comments-items" v-for="item in commentsList" :key="item._id">
      <div class="comments-top">
        <!-- <div class="avatar">{{ item.avatar }}</div> -->
        <div class="comments-name">{{ item.name }}</div>
        <div class="comments-top-right">
          <div class="create-time">{{ item.createTime }}</div>
          <div class="reply" @click="clickReply(item._id)">回复</div>
        </div>
      </div>
      <div class="comments-content">
        <p>
          <span class="people">
            {{ answeredPeople ? "@" : "" }}{{ answeredPeople }} &nbsp;
          </span>
          {{ item.content }}
        </p>
      </div>
      <div>
        <CommentsInput :dataId="item._id"> </CommentsInput>
      </div>
      <template v-if="item.reply && item.reply.length !== 0">
        <CommentsContent :commentsList="item.reply" :answeredPeople="item.name">
        </CommentsContent>
      </template>
    </div>
  </div>
</template>

<script>
import CommentsInput from "./CommentsInput";
// import eventBus from "../../js/eventBus";
export default {
  name: "CommentsContent",
  props: ["commentsList", "answeredPeople"],
  components: {
    CommentsInput,
  },
  data() {
    return {
      isShowDetail: false,
      currentId: -1,
      height: "",
      resetMethod: "",
      parentId: "",
    };
  },
  methods: {
    clickReply(id) {
      this.$store.commit("chanageCurrentId", id);
      this.currentId = this.$store.state.currentId;
      this.isShowDetail = !this.isShowDetail;
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.comments-contents {
  max-width: 800px;
  margin: 0px auto;
  padding: 0 0 0 10px;
  .comments-items {
    // background-color: rgb(254, 67, 101);
    // overflow: hidden;
  }
  .comments-name {
    font-family: "microsoft jhenghei", Arial, Sans-Serif;
    font-size: 16px;
    overflow: hidden;
    text-transform: uppercase;
    color: #9499a8;
  }
  .comments-content {
    p {
      font-family: miranafont, "Hiragino Sans GB", "Microsoft YaHei", SimSun,
        sans-serif;
      font-size: 14px;
      line-height: 32px;
      color: #63686d;
      letter-spacing: 1px;
      margin-bottom: 20px;
      border-bottom: 1px dashed #ddd;
    }
  }
  .comments-top {
    display: flex;
    justify-content: space-between;
    .comments-top-right {
      display: flex;
      .create-time {
        font-size: 12px;
        letter-spacing: 1px;
        font-family: microsoft yahei light;
        color: #dadada;
        line-height: 20px;
      }
      .reply {
        font-family: "microsoft jhenghei", Arial, Sans-Serif;
        font-size: 14px;
        display: block;
        margin-left: 10px;
        float: right;
        text-transform: uppercase;
        color: #9499a8;
        cursor: pointer;
        transition: all 0.4s ease;
      }
      .reply:hover {
        color: rgb(254, 67, 101);
      }
    }
  }
}
.people {
  color: rgb(254, 67, 101);
}
.showComments-enter-active,
.showComments-leave-active {
  transition: all 0.4s ease;
}
.showComments-enter {
  opacity: 0;
}
.showComments-enter-to {
  opacity: 1;
}
.showComments-leave {
  opacity: 1;
}
.showComments-leave-to {
  opacity: 0;
}
</style>
