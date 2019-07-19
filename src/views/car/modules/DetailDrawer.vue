<template>
  <a-drawer height="300" placement="bottom" @close="onClose" :closable="false" :visible="isShow" :style="{}">
    <description-list title="车辆详情" size="large">
      <description-list-item term="车牌号">{{ dataItems.plateNo }}</description-list-item>
      <description-list-item term="车牌颜色">{{ dataItems.plateColor }}</description-list-item>
      <description-list-item term="停车场服务">{{ dataItems.parkService }}</description-list-item>
      <description-list-item term="车辆类型">{{ dataItems.carType | typeFilter }}</description-list-item>
      <description-list-item term="车辆有效期">{{ dataItems.validity | validityFilter }}</description-list-item>
      <description-list-item term="车辆状态">{{ dataItems.carStatus | stateFilter }}</description-list-item>
      <description-list-item term="ETC服务">{{ dataItems.etcService }}</description-list-item>
      <description-list-item term="ETC卡号">{{ dataItems.etcNo }}</description-list-item>
      <description-list-item term="充值卡类型">{{ dataItems.cardType | carTypeFilter }}</description-list-item>
      <description-list-item term="卡状态">{{ dataItems.state | carStateFilter }}</description-list-item>
      <description-list-item term="用户ETC卡类型">{{ dataItems.mcard | etcCardFilter }}</description-list-item>
      <description-list-item term="注册时间">{{ dataItems.pbDate }}</description-list-item>
      <description-list-item term="更新时间">{{ dataItems.upDate }}</description-list-item>
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
    text: '删除'
  }
}
const validityMap = {
  1: {
    state: 'success',
    text: '有效'
  },
  2: {
    state: 'error',
    text: '无效'
  }
}
const typeMap = {
  1: {
    state: 'processing',
    text: '普通车辆'
  },
  2: {
    state: 'success',
    text: 'ETC车辆'
  },
  3: {
    state: 'warning',
    text: '公务车辆'
  }
}
const carTypeMap = {
  22: {
    state: 'success',
    text: '储值卡'
  },
  23: {
    state: 'warning',
    text: '记账卡'
  }
}
const carStateMap = {
  1: {
    state: 'success',
    text: '正常'
  },
  2: {
    state: 'default',
    text: '有卡挂起'
  },
  3: {
    state: 'default',
    text: '无卡挂起'
  },
  4: {
    state: 'error',
    text: '有卡注销'
  },
  5: {
    state: 'error',
    text: '无卡注销'
  },
  6: {
    state: 'error',
    text: '卡挂失'
  },
  7: {
    state: 'processing',
    text: '补办'
  }
}
const monthTypeMap = {
  0: {
    state: 'success',
    text: '否'
  },
  1: {
    state: 'warning',
    text: '是'
  }
}
const etcTypeMap = {
  1: {
    state: 'success',
    text: '主卡'
  },
  2: {
    state: 'warning',
    text: '副卡'
  }
}
export default {
  name: 'CarDetail',
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
    validityFilter(type) {
      return type ? validityMap[type].text : ''
    },
    typeFilter(type) {
      return type ? typeMap[type].text : ''
    },
    carTypeFilter(type) {
      return type ? carTypeMap[type].text : ''
    },
    carStateFilter(type) {
      return type ? carStateMap[type].text : ''
    },
    monthTypeFilter(type) {
      return type ? monthTypeMap[type].text : ''
    },
    etcCardFilter(type) {
      return type ? etcTypeMap[type].text : ''
    }
  },
  methods: {
    onClose() {
      this.$emit('onClose')
    }
  }
}
</script>
