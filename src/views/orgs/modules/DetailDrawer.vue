<template>
  <a-drawer height="300" placement="bottom" @close="onClose" :closable="false" :visible="isShow" :style="{}">
    <description-list title="发行机构详情" size="large">
      <description-list-item term="机构编号">{{ dataItems.orgId }}</description-list-item>
      <description-list-item term="机构名称">{{ dataItems.orgName }}</description-list-item>
      <description-list-item term="联系方式">{{ dataItems.title }}</description-list-item>
      <description-list-item term="机构状态">{{ dataItems.status | typeFilter }}</description-list-item>
      <description-list-item term="创建时间">{{ dataItems.pbDate }}</description-list-item>
      <description-list-item term="更新时间">{{ dataItems.upDate }}</description-list-item>
      <description-list-item term="联系人">{{ dataItems.contact }}</description-list-item>
    </description-list>
  </a-drawer>
</template>
<script>
import { DescriptionList } from '@/components/'
const DescriptionListItem = DescriptionList.Item

const typeMap = {
  1: {
    state: 'success',
    text: '启用'
  },
  2: {
    state: 'error',
    text: '停用'
  }
}
export default {
  name: 'OrgDetail',
  components: {
    DescriptionList,
    DescriptionListItem
  },
  props: {
    dataName: {
      type: String,
      default: '发行机构详情'
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
    typeFilter(type) {
      return type ? typeMap[type].text : ''
    }
  },
  methods: {
    onClose() {
      this.$emit('onClose')
    }
  }
}
</script>
