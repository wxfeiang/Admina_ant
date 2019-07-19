<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="特约商户号">
              <a-input v-model="queryParam.id" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="交易类型">
              <a-select v-model="queryParam.tradeType" placeholder="请选择" default-value="0">
                <a-select-option value="0">支付失败</a-select-option>
                <a-select-option value="1">支付中</a-select-option>
                <a-select-option value="2">支付成功</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="交易状态">
              <a-select v-model="queryParam.tradeState" placeholder="请选择" default-value="0">
                <a-select-option value="0">支付失败</a-select-option>
                <a-select-option value="1">支付中</a-select-option>
                <a-select-option value="2">支付成功</a-select-option>
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
      :scroll="{ x: '130%' }"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="tradeType" slot-scope="text">
        <a-badge :status="text | tradeTypeFilter" :text="text | tradeFilter" />
      </span>
      <span slot="tradeState" slot-scope="text">
        <a-badge :status="text | tradeStateTypeFilter" :text="text | tradeStateFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">删除</a>
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
import { SysPayBillListByCondition } from '@/api/statistics'
const tradeMap = {
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
const tradeStateMap = {
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

export default {
  name: 'TableList',
  components: {
    STable,
    DetailDrawer
  },
  data() {
    return {
      adShow: false,
      adTitle: '支付订单详情',
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
          title: '交易时间',
          dataIndex: 'tradeTime'
        },
        {
          title: '特约商户号',
          dataIndex: 'subMchId'
        },
        {
          title: '微信订单号',
          dataIndex: 'transactionId'
        },
        {
          title: '商户订单号',
          dataIndex: 'outTradeNo'
        },
        {
          title: '交易类型',
          dataIndex: 'tradeType',
          scopedSlots: { customRender: 'tradeType' }
        },
        {
          title: '交易状态',
          dataIndex: 'tradeState',
          scopedSlots: { customRender: 'tradeState' }
        },
        {
          title: '商品名称',
          dataIndex: 'goodsName'
        },
        {
          title: '手续费',
          dataIndex: 'poundage'
        },
        {
          title: '费率',
          dataIndex: 'rate'
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
        return SysPayBillListByCondition(Object.assign(parameter, this.queryParam)).then((res) => {
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
      return tradeMap[type].text
    },
    tradeTypeFilter(type) {
      return tradeMap[type].state
    },
    tradeStateFilter(type) {
      return tradeStateMap[type].text
    },
    tradeStateTypeFilter(type) {
      return tradeStateMap[type].state
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
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    }
  }
}
</script>
