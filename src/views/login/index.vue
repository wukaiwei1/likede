<template>
  <div class="loginApp">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="loginFormrules"
    >
      <img src="../../assets/image/userPic.png" alt="" />
      <!-- form表单 -->
      <!-- 账号 -->
      <el-form-item prop="loginName">
        <el-input
          v-model="loginForm.loginName"
          class="form-item"
          placeholder="请输入账号"
          type="text"
        >
          <i slot="prefix" class="el-input__icon el-icon-mobile-phone" />
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
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
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          class="form-item"
          placeholder="请输入验证码"
          @keyup.enter.native="submitFn"
        >
          <i slot="prefix" class="el-input__icon el-icon-postcard" />
          <template #append>
            <img
              :src="$store.state.user.clientPic"
              alt=""
              @click="changeCode"
            />
          </template>
        </el-input>
      </el-form-item>
      <!-- 登录 -->
      <el-button
        type="primary"
        @click="submitForm"
        :loading="loginLoading"
        ref="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录信息
      loginForm: {
        // 用户名
        loginName: 'admin',
        // 密码
        password: 'admin',
        // 验证码
        code: '',
        // 类型 0:后台，1: 运营运维端，2: 合作商后台
        loginType: '0',
      },
      // 点击切换密码框类型
      passwordType: 'password',
      // 表单验证规则
      loginFormrules: {
        loginName: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      // 验证码节流标识
      codeTime: '',
      loginLoading: false,
    }
  },

  created() {
    // 发起获取验证码图片请求
    this.$store.dispatch('user/getclientToken')
  },

  methods: {
    // 登录
    async submitForm() {
      console.log(789)
      try {
        this.loginLoading = true
        await this.$refs.loginForm.validate()
        // 触发vuex发起登录请求
        await this.$store.dispatch('user/userLogin', this.loginForm)
        //判断是否是响应数据是否存在success,没有则返回data
        if (!this.$store.state.user.userInfo.success) {
          this.$message.error(this.$store.state.user.userInfo.msg)
          // 发起获取验证码图片请求
          if (this.$store.state.user.userInfo.msg === '验证码错误') {
            this.$store.dispatch('user/getclientToken')
          }
          return
        }
        // 成功提示
        this.$message({
          type: 'success',
          message: '登录成功',
        })
        // 路由跳转
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      } finally {
        this.loginLoading = false
      }
    },
    // 密码框切换类型
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 切换验证码
    changeCode() {
      // 节流函数
      if (this.codeTime) return
      this.codeTime = setTimeout(() => {
        this.$store.dispatch(
          'user/getclientToken',
          this.loginForm.clientToken * 1024,
        )
        // 清空
        this.codeTime = ''
      }, 1000)
    },
    submitFn() {
      console.log(this.$refs.login.$el)
      this.$refs.login.$el.click()
      his.$refs.login.$el.style.border = '12px solid #3a8ee6'
    },
  },
}
</script>

<style scoped lang="less">
// 背景
.loginApp {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url('../../assets/image/background.png');
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
      ::v-deep .el-input-group__append {
        padding: 0;
        height: 50px;
        border: 0;
        background-color: #fff;
        cursor: pointer;
        > img {
          height: 52px;
        }
      }
    }
    ::v-deep .el-form-item__content {
      height: 53px;
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
</style>
