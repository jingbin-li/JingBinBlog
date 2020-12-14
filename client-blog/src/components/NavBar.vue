<template>
  <div class="nav">
    <div class="nav-bar">
      <ul>
        <li v-for="(item, index) in navList" :key="index">
          <router-link :to="item.router">{{ item.name }}</router-link>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont" @click="isShowSearch = !isShowSearch">&#xe62c;</i>
      </div>
    </div>
    <div class="mobile-style">
      <div class="mobile-nav-bar">
        <i @click="expendMenuList" class="iconfont">&#xe63c;</i>
      </div>
      <transition name="mobileMenuList">
        <div class="mobileMenu" v-show="isShowMobileMenuList">
          <ul>
            <li v-for="(item, index) in navList" :key="index">
              <router-link :to="item.router">{{ item.name }}</router-link>
            </li>
            <li style="padding:5px 10px">
              <i class="iconfont" @click="showMobileSearch = !showMobileSearch"
                >&#xe62c;</i
              >
            </li>
            <li v-show="showMobileSearch">
              <input type="text" placeholder="Search" />
            </li>
          </ul>
        </div>
      </transition>
    </div>

    <transition name="searchPop">
      <div class="search-modal" v-show="isShowSearch">
        <div class="search-content">
          <div>
            <p>你想搜索什么 ? 按ESC即可退出 ...</p>
            <i class="iconfont content-serach-icon">&#xe62d;</i>
            <input type="search" placeholder="Search..." />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      navList: [
        { name: "首页", router: "/" },
        { name: "关于", router: "about" },
        { name: "文章", router: "articles" },
        { name: "留言板", router: "messageBoard" },
      ],
      isShowSearch: false,
      isShowMobileMenuList: false,
      showMobileSearch: false,
    };
  },
  methods: {
    expendMenuList() {
      this.isShowMobileMenuList = !this.isShowMobileMenuList;
      this.showMobileSearch = false;
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
.nav-bar {
  position: fixed;
  z-index: 9999;
  width: 100%;
  top: 0;
  left: 0;
  // background-color: rgba(255, 255, 255, 0);
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ul {
    margin-right: 20px;
    display: flex;
    justify-content: flex-end;
    li {
      padding: 20px;
      // color: #ffffff;
      // text-shadow: 0 0 #000, -1px -1px #000, 0 -1px #000, -1px 0 #000;
      color: #d1d1d1;
      text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
    }
  }
}
.nav {
  // height: 80px;
}
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}

.search-modal {
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.96);
  width: 100%;
  height: 100%;
  .search-content {
    max-width: 640px;
    padding: 0 20px;
    margin: auto;
    text-align: left;
    max-height: 260px;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;
    input {
      font-size: 1.5rem;
      background: 0 0;
      padding: 15px 24px 15px 64px;
      width: 100%;
      outline: 0;
      border-radius: 50px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      border: 1px solid #808a87;
    }
    //--清除谷歌浏览器下的 search 叉号
    input::-webkit-search-cancel-button {
      display: none;
    }
    //--清除IE下的 search 叉号
    input[type="search"]::-ms-clear {
      display: none;
    }
    p {
      margin-bottom: 1.5em;
    }
    div {
      position: relative;
      .content-serach-icon {
        font-size: 1.5rem;
        position: absolute;
        left: 24px;
        bottom: 17px;
      }
    }
  }
}
.searchPop-enter-active,
.searchPop-leave-active {
  transition: all 0.4s ease;
}
.searchPop-enter,
.searchPop-leave-to {
  opacity: 0;
  // transform: translateX(150px);
}
.search {
  margin: 0 50px 0 20px;
  cursor: pointer;
}
.mobile-style {
  display: none;
}

@media only screen and (max-width: 768px) {
  .nav-bar,
  .searchPop {
    display: none;
  }
  .nav {
    height: 100%;
    padding: 0px 15px;
  }
  .mobile-style {
    display: block;
    .mobile-nav-bar {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      //margin-bottom: 10px;
      display: flex;
      justify-content: flex-end;
    }
    .mobileMenu {
      // background-color: rgb(128, 99, 55);
      background: rgba(0, 0, 0, 0.3);

      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      overflow: hidden;
      li {
        padding: 5px 10px;
        input {
          padding: 5px 10px;
          background-color: rgba(0, 0, 0, 0);
          border: none;
          border-bottom: 2px solid #f4606c;
        }
      }
    }
  }
  .mobileMenuList-enter-active,
  .mobileMenuList-leave-active {
    transition: all 0.4s ease;
  }
  .mobileMenuList-enter {
    height: 0px;
  }
  .mobileMenuList-enter-to {
    height: 169px;
  }
  .mobileMenuList-leave {
    height: 169px;
  }
  .mobileMenuList-leave-to {
    height: 0px;
  }
}
</style>
