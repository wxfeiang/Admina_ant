<template>
  <a-drawer height="360" placement="bottom" @close="onClose" :closable="false" :visible="isShow" :style="{}">
    <description-list title="订单详情" size="large">
      <description-list-item term="账单编号">{{ dataItems.id }}</description-list-item>
      <description-list-item term="交易时间">{{ dataItems.tradeTime }}</description-list-item>
      <description-list-item term="微信分配的公众账号ID">{{ dataItems.appId }}</description-list-item>
      <description-list-item term="商户号">{{ dataItems.mchId }}</description-list-item>
      <description-list-item term="特约商户号">{{ dataItems.subMchId }}</description-list-item>
      <description-list-item term="设备号">{{ dataItems.deviceInfo }}</description-list-item>
      <description-list-item term="微信订单号">{{ dataItems.transactionId }}</description-list-item>
      <description-list-item term="商户订单号">{{ dataItems.outTradeNo }}</description-list-item>
      <description-list-item term="用户标示">{{ dataItems.openId }}</description-list-item>
      <description-list-item term="交易类型">{{ dataItems.tradeType | typeFilter }}</description-list-item>
      <description-list-item term="交易状态">{{ dataItems.tradeState | typeFilter }}</description-list-item>
      <description-list-item term="付款银行">{{ dataItems.bankType }}</description-list-item>
      <description-list-item term="应结订单金额">{{ dataItems.settlementTotalFee }}</description-list-item>
      <description-list-item term="代金券金额">{{ dataItems.couponFee }}</description-list-item>
      <description-list-item term="商品名称">{{ dataItems.goodsName }}</description-list-item>
      <description-list-item term="手续费">{{ dataItems.poundage }}</description-list-item>
      <description-list-item term="费率">{{ dataItems.rate }}</description-list-item>
      <description-list-item term="订单金额">{{ dataItems.totalFee }}</description-list-item>
      <description-list-item term="费率备注">{{ dataItems.rateMark }}</description-list-item>
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
