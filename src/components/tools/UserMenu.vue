<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a href="https://vue.ant.design/docs/vue/introduce-cn/" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>
      <notice-icon class="action" />
      <span class="action" @click="toLock">
        <a-icon type="lock" />
      </span>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar()" />
          <span>{{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!-- <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>-->
          <a-sub-menu key="1">
            <span slot="title"><a-icon type="setting" style="margin-right:8px;" /><span>切换用户组</span></span>
            <a-menu-item @click="handleClick(item)" v-for="item of groups()" :key="item.id">
              <a-icon type="arrow-right" v-if="item.gId === curGroup()" style="color: green;" />
              <a-icon type="gold" v-else />
              <span>{{ item.gName }}</span>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="5">
            <router-link :to="{ name: 'asettings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="6">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {
    NoticeIcon
  },
  methods: {
    ...mapActions(['Logout', 'ToggleLock', 'ClearRoles']),
    ...mapGetters(['nickname', 'avatar', 'groups', 'curGroup']),
    toLock() {
      this.ToggleLock('lock')
      this.$notification.success({
        message: '锁定成功',
        description: '锁定成功!'
      })
      this.$router.push({
        path: '/user/lock'
      })
    },
    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              window.location.reload()
            })
            .catch((err) => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    },
    handleClick(item) {
      if (item.gId === this.curGroup()) {
        this.$message.warning('当前已登录,请选择未登录的用户组!')
        return false
      }
      this.ClearRoles({ group: item }).then(() => {
        this.$router.go(0)
      })
    }
  }
}
</script>
