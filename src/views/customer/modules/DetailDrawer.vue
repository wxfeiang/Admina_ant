<template>
  <a-drawer height="210" placement="bottom" @close="onClose" :closable="false" :visible="isShow" :style="{}">
    <description-list title="用户详情" size="large">
      <description-list-item term="用户昵称">{{ dataItems.nickName }}</description-list-item>
      <description-list-item term="手机号码">{{ dataItems.mobile }}</description-list-item>
      <description-list-item term="用户姓名">{{ dataItems.userName }}</description-list-item>
      <description-list-item term="用户性别">{{ dataItems.gender | genderFilter }}</description-list-item>
      <description-list-item term="身份证号">{{ dataItems.identityId }}</description-list-item>
      <description-list-item term="用户类型">{{ dataItems.type | typeMapFilter }}</description-list-item>
      <description-list-item term="用户级别">{{ dataItems.userLevel | levelMapFilter }}</description-list-item>
      <description-list-item term="用户状态">{{ dataItems.state | stateFilter }}</description-list-item>
      <description-list-item term="注册时间">{{ dataItems.pbDate }}</description-list-item>
    </description-list>
  </a-drawer>
</template>
<script>
import { DescriptionList } from '@/components/'
const DescriptionListItem = DescriptionList.Item
const stateMap = {
  1: {
    state: 'success',
    text: '正常'
  },
  2: {
    state: 'error',
    text: '注销'
  }
}
const genderMap = {
  0: {
    gender: 'warning',
    text: '女'
  },
  1: {
    gender: 'Processing',
    text: '男'
  }
}
const typeMap = {
  1: {
    gender: 'warning',
    text: '微信'
  },
  2: {
    gender: 'Processing',
    text: '支付宝'
  }
}
const levelMap = {
  1: {
    gender: 'warning',
    text: '会员'
  },
  2: {
    gender: 'Processing',
    text: '高级会员'
  }
}
export default {
  name: 'CustomerDetail',
  components: {
    DescriptionList,
    DescriptionListItem
  },
  props: {
    dataName: {
      type: String,
      default: '详情'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    dataItems: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  filters: {
    stateFilter(type) {
      return type ? stateMap[type].text : ''
    },
    genderFilter(type) {
      return type ? genderMap[type].text : ''
    },
    typeMapFilter(type) {
      return type ? typeMap[type].text : ''
    },
    levelMapFilter(type) {
      return type ? levelMap[type].text : ''
    }
  },
  methods: {
    onClose() {
      this.$emit('onClose')
    }
  }
}
</script>
