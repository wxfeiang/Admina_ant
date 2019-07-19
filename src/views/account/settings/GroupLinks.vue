<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false">
      <a-list size="large">
        <a-list-item :key="index" v-for="(item, index) in linkList">
          <a-list-item-meta :description="item.rName">
            <a-avatar slot="avatar" size="large" style="color: #f56a00; backgroundColor: #fde3cf">组</a-avatar>
            <a slot="title">{{ item.gName }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a-button type="primary" v-if="item.isDefault !== 'true'" @click="changeDefault(item)" confirmLoading
              >设为默认组</a-button
            >
            <a-button type="primary" disabled v-else>当前默认组</a-button>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>加入时间：{{ item.pbTime }}</span>
            </div>
            <div class="list-content-item">
              <p>登录默认：{{ item.isDefault === 'true' ? '是' : '否' }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import { UserGroupDefaultEdit } from '@/api/user'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'UserGroupLinks',
  data() {
    return {
      confirmLoading: false,
      linkList: []
    }
  },
  mounted() {
    this.linkList = this.groups()
  },
  methods: {
    ...mapActions(['ClearRoles', 'SetCurGroup']),
    ...mapGetters(['groups', 'userInfo']),
    async changeDefault(item) {
      this.confirmLoading = true
      try {
        let iparams = {
          id: item.id,
          uId: this.userInfo().id
        }
        let iReturn = await UserGroupDefaultEdit(iparams)
        if (iReturn.status === 200 && iReturn.data.length > 0) {
          this.linkList = []
          this.linkList = iReturn.data
          this.$notification.success({
            message: '成功',
            description: '修改默认组成功!'
          })
        } else {
          this.$notification.error({
            message: '修改默认组失败!',
            description: `${iReturn.reasonPhrase}`
          })
        }
        this.confirmLoading = false
      } catch (err) {
        this.confirmLoading = false
        this.$notification.error({
          message: '修改默认组异常!',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}
.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
