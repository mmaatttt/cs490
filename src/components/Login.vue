<template>
  <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
    <h3 class="title">Login</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="Username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="Password"></el-input>
    </el-form-item>
    <el-checkbox v-model="remember" class="remember">Remember</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="dataLoading">Login</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import NProgress from 'nprogress'
  import API from '../api'

  export default {
    data () {
      return {
        dataLoading: false,
        loginForm: {
          username: '',
          password: ''
        },
        remember: true,
        rules: {
          username: [
            { required: true, message: 'Username required', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Password required', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (ev) {
        this.$refs.loginForm.validate((valid) => {
          if (!valid) {
            return false
          }
          this.dataLoading = true
          NProgress.start()
          API.authenticate({ username: this.loginForm.username, password: this.loginForm.password }).then(res => {
            this.dataLoading = false
            NProgress.done()
            let { msg, code, user } = res.data
            if (code !== 200) {
              console.log(this)
              this.$notify({
                title: 'Error',
                message: msg,
                type: 'error'
              })
            } else {
              this.$store.dispatch('initialize', {user})
              this.$router.push({ path: '/entries' })
            }
          })
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    border-radius: 5px;
    background-color: #F9FAFC;
    margin: 180px auto;
    border: 2px solid #8492A6;
    width: 350px;
    padding: 35px 35px 15px 35px;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
