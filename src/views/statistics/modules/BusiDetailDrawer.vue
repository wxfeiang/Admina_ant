<template>
  <a-drawer height="320" placement="bottom" @close="onClose" :closable="false" :visible="isShow" :style="{}">
    <description-list title="订单详情" size="large">
      <description-list-item term="商户订单号">{{ dataItems.id }}</description-list-item>
      <description-list-item term="平台商户号">{{ dataItems.mchId }}</description-list-item>
      <description-list-item term="第三方支付订单号">{{ dataItems.mchOrderId }}</description-list-item>
      <description-list-item term="渠道编号">{{ dataItems.channelId }}</description-list-item>
      <description-list-item term="支付金额">{{ dataItems.amount }}</description-list-item>
      <description-list-item term="系统支付状态">{{ dataItems.state | typeFilter }}</description-list-item>
      <description-list-item term="第三方支付状态">{{ dataItems.payState | typeFilter }}</description-list-item>
      <description-list-item term="客户端IP">{{ dataItems.clientIp }}</description-list-item>
      <description-list-item term="设备">{{ dataItems.device }}</description-list-item>
      <description-list-item term="商品标题">{{ dataItems.titles }}</description-list-item>
      <description-list-item term="商品描述信息">{{ dataItems.body }}</description-list-item>
      <description-list-item term="特约商户号">{{ dataItems.channelMchId }}</description-list-item>
      <description-list-item term="渠道支付状态码">{{ dataItems.errCode }}</description-list-item>
      <description-list-item term="渠道支付错误描述">{{ dataItems.errMsg }}</description-list-item>
      <description-list-item term="订单支付成功时间">{{ dataItems.payTime }}</description-list-item>
      <description-list-item term="创建时间">{{ dataItems.pbDate }}</description-list-item>
      <description-list-item term="订单类型">{{ dataItems.billType | billTypeFilter }}</description-list-item>
    </description-list>
  </a-drawer>
</template>
<script>
import { DescriptionList } from '@/components/'
const DescriptionListItem = DescriptionList.Item
const typeMap = {
  0: {
    text: '支付失败'
  },
  1: {
    text: '支付中'
  },
  2: {
    text: '支付完成'
  }
}
const billTypeMap = {
  1: {
    text: '充值'
  },
  2: {
    text: '扫码支付'
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
    typeFilter(type) {
      return type ? typeMap[type].text : ''
    },
    billTypeFilter(type) {
      return type ? billTypeMap[type].text : ''
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
