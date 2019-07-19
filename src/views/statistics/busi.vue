<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="商户订单号">
              <a-input v-model="queryParam.id" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="第三方支付状态">
              <a-select v-model="queryParam.payState" placeholder="请选择" default-value="0">
                <a-select-option value="0">支付失败</a-select-option>
                <a-select-option value="1">支付中</a-select-option>
                <a-select-option value="2">支付成功</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="商户支付状态">
                <a-select v-model="queryParam.state" placeholder="请选择" default-value="0">
                  <a-select-option value="0">支付失败</a-select-option>
                  <a-select-option value="1">支付中</a-select-option>
                  <a-select-option value="2">支付成功</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="订单类型">
                <a-select v-model="queryParam.billType" placeholder="请选择" default-value="0">
                  <a-select-option value="1">充值</a-select-option>
                  <a-select-option value="2">支付</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="支付渠道">
                <a-select v-model="queryParam.channelId" placeholder="请选择" default-value="0">
                  <a-select-option value="wx_native">小程序</a-select-option>
                  <a-select-option value="wx_jsapi">扫码</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!--            <a-col :md="8" :sm="24">-->
            <!--              <a-form-item label="订单支付时间">-->
            <!--                <a-date-picker-->
            <!--                  v-model="queryParam.payTime"-->
            <!--                  style="width: 100%"-->
            <!--                  placeholder="请选择时间"-->
            <!--                ></a-date-picker>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-dropdown v-action:other v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"> <a-icon type="export" />导出</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="null"
      :rowSelection="null"
      :scroll="{ x: '170%' }"
    >
      <span slot="state" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
      </span>
      <span slot="payState" slot-scope="text">
        <a-badge :status="text | payStateTypeFilter" :text="text | payStateFilter" />
      </span>
      <span slot="billType" slot-scope="text">
        {{ text | billFilter }}
      </span>
      <span slot="channelId" slot-scope="text">
        {{ text | channelIdFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
        </template>
      </span>
    </s-table>
    <detail-drawer
      :isShow="adShow"
      :dataName="adDataItems.user_name"
      :dataItems="adDataItems"
      @onClose="adClose"
    ></detail-drawer>
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import DetailDrawer from './modules/BusiDetailDrawer'
import { SysPayOrderListByCondition } from '@/api/statistics'

const stateMap = {
  0: {
    state: 'error',
    text: '支付失败'
  },
  1: {
    state: 'processing',
    text: '支付中'
  },
  2: {
    state: 'success',
    text: '支付成功'
  }
}
const payStateMap = {
  0: {
    state: 'error',
    text: '支付失败'
  },
  1: {
    state: 'processing',
    text: '支付中'
  },
  2: {
    state: 'success',
    text: '支付成功'
  }
}
const billMap = {
  1: {
    state: 'default',
    text: '充值'
  },
  2: {
    state: 'default',
    text: '支付'
  }
}
const channelIdMap = {
  wx_native: {
    state: 'default',
    text: '小程序'
  },
  wx_jsapi: {
    state: 'default',
    text: '扫码'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    DetailDrawer
  },
  data() {
    return {
      adShow: false,
      adTitle: '商户订单详情',
      adDataItems: {},
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '商户订单号',
          dataIndex: 'id',
          width: '200px',
          fixed: 'left'
        },
        {
          title: '平台商户号',
          dataIndex: 'mchId'
        },
        {
          title: '第三方订单号',
          dataIndex: 'mchOrderId'
        },
        {
          title: '支付渠道',
          dataIndex: 'channelId',
          scopedSlots: { customRender: 'channelId' }
        },
        {
          title: '支付金额(元)',
          dataIndex: 'amount'
        },
        {
          title: '商户支付状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '第三方支付状态',
          dataIndex: 'payState',
          scopedSlots: { customRender: 'payState' }
        },
        {
          title: '特约商户号',
          dataIndex: 'channelMchId'
        },
        {
          title: '描述',
          dataIndex: 'errMsg'
        },
        {
          title: '订单支付时间',
          dataIndex: 'payTime'
        },
        {
          title: '订单类型',
          dataIndex: 'billType',
          scopedSlots: { customRender: 'billType' }
        },
        {
          title: '操作',
          key: 'action',
          width: 60,
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        console.log('loadData.parameter', parameter)
        return SysPayOrderListByCondition(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
        })
      },
      selectedRowKeys: [],
      alert: {
        show: false,
        clear: () => {
          this.selectedRowKeys = []
        }
      }
    }
  },
  filters: {
    stateFilter(type) {
      return stateMap[type] ? stateMap[type].text : ''
    },
    stateTypeFilter(type) {
      return stateMap[type].state
    },
    payStateFilter(type) {
      return payStateMap[type] ? payStateMap[type].text : ''
    },
    payStateTypeFilter(type) {
      return payStateMap[type].state
    },
    billFilter(type) {
      return billMap[type] ? billMap[type].text : ''
    },
    channelIdFilter(type) {
      return channelIdMap[type] ? channelIdMap[type].text : ''
    }
  },
  methods: {
    adClose() {
      this.adShow = false
    },
    handleDetail(record) {
      console.log(record)
      this.adDataItems = record
      this.adShow = true
      // this.$router.push({ name: 'cardetail', params: { id: '123' } })
    },
    handleDelete() {
      // TODO: 调后台接口 更新用户状态为删除
      console.log('state delete')
    },
    handleEdit(record) {
      this.$refs.modal.edit(record)
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
