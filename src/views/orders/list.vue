<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="账单编号">
              <a-input v-model="queryParam.goodsId" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="订单状态">
              <a-select v-model="queryParam.state" placeholder="请选择" default-value="0">
                <a-select-option value="-1">处理失败</a-select-option>
                <a-select-option value="1">订单生成</a-select-option>
                <a-select-option value="2">支付成功</a-select-option>
                <a-select-option value="3">处理完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="电子缴费推送状态">
              <a-select v-model="queryParam.pushMiddsState" placeholder="请选择" default-value="0">
                <a-select-option value="0">未推送</a-select-option>
                <a-select-option value="1">推送成功</a-select-option>
                <a-select-option value="2">推送失败</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (queryParam = {})">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-dropdown v-action:other v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"> <a-icon type="export" />导出 </a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作
          <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :scroll="{ x: '140%' }"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="state" slot-scope="text">
        <a-badge :status="text | tradeTypeFilter" :text="text | tradeFilter" />
      </span>
      <span slot="pushMiddsState" slot-scope="text">
        <a-badge :status="text | tradeStateTypeFilter" :text="text | tradeStateFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item @click="pushOrder(record)" v-if="record.pushMiddsState !== 1">
                <a>推送</a>
              </a-menu-item>
              <a-menu-item @click="refund(record)">
                <a>退款</a>
              </a-menu-item>
            </a-menu>
            <a>
              更多
              <a-icon type="down" />
            </a>
          </a-dropdown>
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
import DetailDrawer from './modules/ListDetailDrawer'
import { SysGoodsOrderByCondition, SysPayOrderPushById, SysRefundOrder } from '@/api/statistics'
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
  name: 'TableList',
  components: {
    STable,
    DetailDrawer
  },
  data() {
    return {
      adShow: false,
      adTitle: '订单详情',
      adDataItems: {},
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '账单编号',
          dataIndex: 'id',
          fixed: 'left'
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName'
        },
        {
          title: '金额',
          dataIndex: 'amount'
        },
        {
          title: '订单状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '电子缴费推送状态',
          dataIndex: 'pushMiddsState',
          scopedSlots: { customRender: 'pushMiddsState' }
        },
        {
          title: '支付时间',
          dataIndex: 'payDate'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        console.log('loadData.parameter', parameter)
        return SysGoodsOrderByCondition(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
        })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  filters: {
    tradeFilter(type) {
      return stateMap[type].text
    },
    tradeTypeFilter(type) {
      return stateMap[type] ? stateMap[type].state : ''
    },
    tradeStateFilter(type) {
      return tradeStateMap[type] ? tradeStateMap[type].text : ''
    },
    tradeStateTypeFilter(type) {
      return tradeStateMap[type] ? tradeStateMap[type].state : ''
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
    },
    pushOrder(record) {
      console.log(record)
      SysPayOrderPushById(record.id).then((res) => {
        console.log(res)
        this.$notification.success({
          message: '成功',
          description: '数据已推送'
        })
      })
    },
    refund(record) {
      console.log(record)
      const refund = {
        outTradeNo: record.id,
        totalFee: record.amount,
        refundFee: record.amount,
        channel: 'wx_app'
      }
      SysRefundOrder(refund).then((res) => {
        console.log(res)
        this.$notification.success({
          message: '成功',
          description: '已申请退款'
        })
      })
    },
    handleEdit(record) {
      this.$refs.modal.edit(record)
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
