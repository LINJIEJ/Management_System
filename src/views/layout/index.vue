<template>
  <div class="layout">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <left></left>
    </div>

    <!-- 内容区 -->
    <div class="content" :class="{ active: $store.state.flag }">
      <!-- 头部 -->
      <div class="nav">
        <div class="nav-1 nav0">
          <button @click="btn2" v-if="$store.state.flag">展开</button>
          <button @click="btn1" v-else>收起</button>
        </div>
        <div class="nav-2 nav0">
          <span class="span">{{ Nowtime }}</span> |
          <span class="sapn">欢迎{{ username }}</span> |
          <span class="cur" @click="exit_login">退出登录</span>
        </div>
      </div>
      <!-- 组件区 -->
      <div class="component">
        <right></right>
      </div>
    </div>
  </div>
</template>

<script>
import left from '@/views/layout/left/left.vue'
import right from '@/views/layout/right/right.vue'
import dayjs from 'dayjs'
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      Nowtime: ''
    }
  },
  created() {
    this.Nowtime = dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
  },
  components: {
    left,
    right
  },
  methods: {
    ...mapMutations(['remove_plotter']),
    btn1() {
      this.$store.commit('btn1')
    },
    btn2() {
      this.$store.commit('btn2')
    },
    // 退出登录
    exit_login() {
      this.$router.replace('/login')
      sessionStorage.removeItem('Token')
      // 清除vuex中的动态路由
      this.$router.commit('remove_plotter')
    }
  },
  computed: {
    ...mapState(['username'])
  }
}
</script>

<style lang="less" scoped>
.layout {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: #112f50;
  }

  .content {
    transition: all 0.5s;
    padding-left: 200px;

    .nav {
      width: auto;
      height: 35px;
      line-height: 35px;
      padding-right: 20px;
      color: aliceblue;
      background-color: rgb(38, 109, 189);
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .cur {
        cursor: pointer;
      }

      button {
        border: none;
        height: 100%;
        margin-top: -1px;
        background-color: aqua;
        color: blue;
      }

      .nav0 {
        height: 100%;
      }

      .span {
        display: inline-block;
        padding: 0 10px;
      }
    }

    .component {
      padding: 0 30px;
    }
  }

  .active {
    padding-left: 64px;
  }
}
</style>
