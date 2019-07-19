<template>
  <a-drawer height="260" placement="bottom" @close="onClose" :closable="false" :visible="isShow" :style="{}">
    <description-list title="订单详情" size="large">
      <description-list-item term="商品编号">{{ dataItems.goodsId }}</description-list-item>
      <description-list-item term="商品名称">{{ dataItems.goodsName }}</description-list-item>
      <description-list-item term="金额">{{ dataItems.amount }}</description-list-item>
      <description-list-item term="用户编号">{{ dataItems.userId }}</description-list-item>
      <description-list-item term="订单状态">{{ dataItems.state | tradeFilter }}</description-list-item>
      <description-list-item term="支付订单号">{{ dataItems.payOrderId }}</description-list-item>
      <description-list-item term="渠道编号">{{ dataItems.channelId }}</description-list-item>
      <description-list-item term="支付渠道账号">{{ dataItems.payAccount }}</description-list-item>
      <description-list-item term="支付时间">{{ dataItems.payDate }}</description-list-item>
      <description-list-item term="交易类型">{{ dataItems.pushMiddsState | tradeStateFilter }}</description-list-item>
    </description-list>
  </a-drawer>
</template>
<script>
import { DescriptionList } from '@/components/'
const DescriptionListItem = DescriptionList.Item
const stateMap = {
  '-1': {
    state: 'error',
    text: '处理失败'
  },
  1: {
    state: 'processing',
    text: '订单生成'
  },
  2: {
    state: 'processing',
    text: '支付成功'
  },
  3: {
    state: 'success',
    text: '处理完成'
  }
}
const tradeStateMap = {
  0: {
    state: 'processing',
    text: '未推送'
  },
  1: {
    state: 'success',
    text: '推送成功'
  },
  2: {
    state: 'error',
    text: '推送失败'
  }
}
export default {
  name: 'DetailDrawer',
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
    tradeFilter(type) {
      return stateMap[type].text
    },
    tradeStateFilter(type) {
      return tradeStateMap[type] ? tradeStateMap[type].text : ''
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
