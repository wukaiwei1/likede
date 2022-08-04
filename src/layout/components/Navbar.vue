<template>
  <div class="navbar">
    <h1 class="logo">
      <img src="../../assets/image/logo.png" width="88" alt="" />
    </h1>
    <div class="right">
      <div class="userPic">
        <img
          :src="$store.state.user.userInfo.image"
          alt=""
          v-imgError="defaultImg"
        />
      </div>
      <span>欢迎您,{{ $store.state.user.userInfo.userName }}</span>
      <div class="logout" @click="logout">
        退出
        <i class="el-icon-caret-bottom"></i>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from '@/assets/image/user.png'
export default {
  data() {
    return {
      // 默认图片
      defaultImg,
    }
  },
  components: {},
  computed: {},
  methods: {
    // 退出功能
    logout() {
      // 清空token
      localStorage.removeItem('vuex')
      this.$store.commit('user/setUserToken', {})
      // 跳转页面
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  overflow: hidden;
  // z-index: 99999;
  // position: relative;
  background: url('../../assets/image/bg.png') no-repeat;
  background-size: cover;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .logo {
    float: left;
    margin: 0;
    img {
      margin-left: 15px;
      margin-top: 10px;
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    float: right;
    height: 100%;
    line-height: 50px;
    color: #fff;
    img {
      vertical-align: middle;
    }
    > span {
      margin: 0 30px 0 16px;
    }
    .logout {
      margin-right: 40px;
      cursor: pointer;
    }
  }
}
</style>
