<template>
  <div class="lock-wrap">
    <div class="lock-container">
      <div class="lock-container__box">
        <a-input v-model="pwd" type="password" placeholder="请输入密码" />
        <a-button size="large" type="primary" pressEnter="unlock" class="btn" :loading="btnLoading" @click="unlock"
          >解锁</a-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import md5 from 'md5'
export default {
  name: 'lock',
  data() {
    return {
      btnLoading: false,
      pwd: ''
    }
  },
  methods: {
    ...mapGetters(['userInfo']),
    ...mapActions(['Login', 'ToggleLock']),
    unlock() {
      if (this.pwd === '') {
        this.$notification['error']({
          message: '错误',
          description: '请输入密码!',
          duration: 4
        })
        return
      }
      this.btnLoading = true
      const loginParams = {
        phone: this.userInfo().phone,
        password: md5(this.pwd)
      }
      this.Login(loginParams)
        .then((res) => {
          console.log('登录成功: ' + JSON.stringify(res))
          this.btnLoading = false
          this.ToggleLock('unlock')
          this.$router.push({ path: '/home' })
        })
        .catch((err) => {
          this.btnLoading = false
          console.log('解锁登录异常: ' + JSON.stringify(err))
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.lock-wrap
  width 100%
  height 300px
  overflow hidden
.lock-container
  width 100%
  height 100%
  display flex
  align-items center
  justify-content center
  &__box
    color #659c84
    .btn
      margin-top 20px
      width 100%
</style>
