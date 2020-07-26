<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { setToken, removeToken } from '@/libs/util'
import { mapActions } from 'vuex'
import axios from '@/libs/api.request'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      const _ths = this
      this.handleLogin({ userName, password }).then(res => {
        let result = res.data
        if (result.code === 200) {
          _ths.saveUserLoginLog()
          setToken(res.data.data)
          this.$router.push({
            name: 'home'
          })
        } else {
          removeToken('token')
          _ths.$Message.error(result.msg)
        }
      })
    },
    saveUserLoginLog () {
      const option = {
        url: '/login/saveUserLoginLog',
        method: 'post'
      }
      axios.request(option).then(res => {

      })
    }
  }
}
</script>

<style>

</style>
