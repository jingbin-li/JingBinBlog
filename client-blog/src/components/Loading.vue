<template>
  <div v-if="isShowLoading">
    <section class="loader">
      <div class="loader-center">
        <div class="chars">
          <span class="char brace">{</span>
          <span class="dots">
            <span class="char dot _dot-1">.</span>
            <span class="char dot _dot-2">.</span>
            <span class="char dot _dot-3">.</span>
          </span>
          <span class="char brace">}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    isShowLoading: Boolean,
  },
  mounted() {
    this.$store.state.currentId = -1;
  },
};
</script>
<style lang="less" scoped>
section.loader {
  z-index: 99999;
  font-family: Consolas, monaco, monospace;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #232427;

  color: #ff893a;
}

section.loader .loader-center {
  width: 300px;
  height: 100px;
  line-height: 100px;

  margin: 0 auto;
  text-align: center;
  font-size: 38px;
  letter-spacing: -6px;

  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -50px;
}

section.loader .loader-center .chars .dots .char {
  font-size: 150%;
  display: inline-block;
}

/* animation starts here */
.dots .dot {
  position: relative;
  top: 0;
  left: 0;
}

.dot._dot-1 {
  animation: dot_1 1s ease-in-out infinite;
  animation-fill-mode: backwards;
  animation-direction: alternate;
}

.dot._dot-2 {
  animation: dot_2 1s ease-in-out infinite;
  animation-fill-mode: backwards;
  animation-direction: alternate;
  animation-delay: 1s;
}

.dot._dot-3 {
  animation: dot_3 1s ease-in-out infinite;
  animation-fill-mode: backwards;
  animation-direction: alternate;
  animation-delay: 0.5s;
}

@keyframes dot_1 {
  0% {
    top: 0;
    left: 0;
  }

  50% {
    top: 30px;
    left: 20px;
  }

  100% {
    top: 0px;
    left: 40px;
  }
}

@keyframes dot_2 {
  0% {
    top: 0;
    left: 0;
  }

  50% {
    top: -30px;
    left: 20px;
  }

  100% {
    top: 0px;
    left: 40px;
  }
}

@keyframes dot_3 {
  0% {
    top: 0;
    left: 0;
  }

  50% {
    top: -30px;
    left: -40px;
  }

  100% {
    top: 0px;
    left: -80px;
  }
}
</style>
