<template>
  <div class="loginApp">
    <div class="login-form">
      <img src="../../assets/image/userPic.png" alt="">
      <!-- form表单 -->
      <el-form
        status-icon
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-input
          v-model="username"
          class="form-item"
          placeholder="请输入账号"
          type="text"
        >
          <i slot="prefix" class="el-input__icon el-icon-mobile-phone" />
        </el-input>
        <el-input
          ref="password"
          v-model="password"
          class="form-item"
          :type="passwordType"
          placeholder="请输入密码"
        >
          <template #suffix>
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </template>
          <i slot="prefix" class="el-input__icon el-icon-lock" />
        </el-input>
        <el-input
          v-model.number="age"
          class="form-item"
          placeholder="请输入验证码"
        >
          <i slot="prefix" class="el-input__icon el-icon-postcard" />
          <template #append>
            <img src="../../assets/image/testpic.jpg" alt="">
          </template>
        </el-input>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      age: '',
      passwordType: 'password'
    }
  },

  created() {},

  methods: {
    // 登录
    submitForm() {},
    // 密码框
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }
  }
}
</script>

<style scoped lang='less'>
// 背景
.loginApp {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url("../../assets/image/background.png");
  .login-form {
    position: relative;
    padding: 76px 35px 0;
    width: 518px;
    height: 388px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    > img {
      position: absolute;
      left: 50%;
      top: -46px;
      margin-left: -48px;
      width: 96px;
      height: 96px;
    }
    .demo-ruleForm {
      .form-item {
        margin-bottom: 24px;
        width: 100%;
        height: 52px;
        background: #fff;
        ::v-deep.el-input__inner {
          padding: 12px 5px 12px 35px !important;
          height: 52px !important;
        }

        ::v-deep.el-input__icon {
          font-size: 16px;
        }
        ::v-deep.el-input__suffix {
          margin-right: 5px;
          line-height: 52px;
          font-size: 18px;
        }
        ::v-deep .el-input-group__append{
          padding:0;
          height: 50px;
          border:0;
          background-color:#fff;
          >img{
            height: 52px;
          }
        }
      }
      ::v-deep.el-button--primary {
        width: 100% !important;
        height: 52px;
        color: #fff;
        opacity: 0.91;
        border-radius: 8px;
        background-image: linear-gradient(262deg, #2e50e1, #6878f0);
      }
    }
  }
}
</style>
