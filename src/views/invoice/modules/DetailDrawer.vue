<template>
  <a-drawer height="280" placement="bottom" @close="onClose" :closable="false" :visible="isShow" :style="{}">
    <div class="adInfo">
      <div class="adTitle">车牌号: {{ dataItems.plate_no }}</div>
      <a-divider />
      <div class="adContent">
        <div class="adItem">
          <span class="adItitle">车牌颜色:</span>
          <span class="adIcontent">{{ dataItems.plate_color }}</span>
        </div>
        <div class="adItem">
          <span class="adItitle">停车场服务:</span>
          <span class="adIcontent">{{ dataItems.park_service }}</span>
        </div>
        <div class="adItem">
          <span class="adItitle">车辆类型:</span>
          <span class="adIcontent">{{ dataItems.car_type | typeFilter }}</span>
        </div>
        <div class="adItem">
          <span class="adItitle">车辆有效期:</span>
          <span class="adIcontent">{{ dataItems.validity | validityFilter }}</span>
        </div>
        <div class="adItem">
          <span class="adItitle">车辆状态:</span>
          <span class="adIcontent">{{ dataItems.car_status | stateFilter }}</span>
        </div>
      </div>
      <a-divider />
      <div class="adContent">
        <div class="adItemTime">
          <span class="adItitleTime">ETC服务:</span>
          <span class="adIcontentTime">{{ dataItems.etc_service }}</span>
        </div>
        <div class="adItemTime">
          <span class="adItitleTime">ETC卡号:</span>
          <span class="adIcontentTime">{{ dataItems.etc_no }}</span>
        </div>
        <div class="adItem">
          <span class="adItitle">充值卡类型:</span>
          <span class="adIcontent">{{ dataItems.card_type | carTypeFilter }}</span>
        </div>
        <div class="adItem">
          <span class="adItitle">卡状态:</span>
          <span class="adIcontent">{{ dataItems.state | carStateFilter }}</span>
        </div>
      </div>
      <a-divider />
      <div class="adContent">
        <div class="adItemTime">
          <span class="adItitleTime">注册时间:</span>
          <span class="adIcontentTime">{{ dataItems.pb_date }}</span>
        </div>
        <div class="adItemTime">
          <span class="adItitleTime">更新时间:</span>
          <span class="adIcontentTime">{{ dataItems.up_date }}</span>
        </div>
      </div>
    </div>
  </a-drawer>
</template>
<script>
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
  1: {
    state: 'success',
    text: '储值卡'
  },
  2: {
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
export default {
  name: 'DetailDrawer',
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
    }
  },
  methods: {
    onClose() {
      this.$emit('onClose')
    }
  }
}
</script>
<style lang="stylus" scoped>
.adInfo
  width 100%
  height 100%
  display flex
  flex-flow column nowrap
  justify-content flex-start
  align-items center
  .adTitle
    width 100%
    height 100%
    color #666
  .adContent
    width 100%
    height 100%
    color #666
    display flex
    flex-flow row wrap
    justify-content space-around
    align-items center
    .adItem
      width 182px
      height 10%
      color #333
      display flex
      flex-flow row wrap
      justify-content center
      align-items center
      .adItitle
        width 80px
        height 100%
        color #333
        display flex
        flex-flow row wrap
        justify-content flex-start
        align-items center
      .adIcontent
        width 100px
        height 100%
        color #666
        display flex
        flex-flow row wrap
        justify-content flex-start
        align-items center
    .adItemTime
      width 230px
      height 10%
      color #333
      display flex
      flex-flow row wrap
      justify-content center
      align-items center
      .adItitleTime
        width 68px
        height 100%
        color #333
        display flex
        flex-flow row wrap
        justify-content flex-start
        align-items center
      .adIcontentTime
        width 160px
        height 100%
        color #666
        display flex
        flex-flow row wrap
        justify-content flex-start
        align-items center
</style>
