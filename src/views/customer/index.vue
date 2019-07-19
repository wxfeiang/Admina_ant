<template>
  <page-view>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="姓名/昵称">
                <a-input v-model="queryParam.name" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="用户状态">
                <a-select v-model="queryParam.state" placeholder="请选择" default-value="0">
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">删除</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="手机号码">
                  <a-input-number v-model="queryParam.mobile" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="性别">
                  <a-select v-model="queryParam.gender" placeholder="请选择" default-value="0">
                    <a-select-option value="0">女</a-select-option>
                    <a-select-option value="1">男</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="用户类型">
                  <a-select v-model="queryParam.type" placeholder="请选择" default-value="1">
                    <a-select-option value="1">微信</a-select-option>
                    <a-select-option value="2">支付宝</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
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
        :alert="options.alert"
        :rowSelection="options.rowSelection"
      >
        <span slot="gender" slot-scope="text">
          {{ text | genderFilter }}
        </span>
        <span slot="state" slot-scope="text">
          <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a-tag color="green" @click="handleDetail(record)">详情</a-tag>
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
  </page-view>
</template>

<script>
import moment from 'moment'
import { PageView } from '@/layouts'
import { STable } from '@/components'
import DetailDrawer from './modules/DetailDrawer'
import { CustomerList } from '@/api/customer'

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
    gender: 'processing',
    text: '男'
  }
}

export default {
  name: 'CustomerList',
  components: {
    STable,
    DetailDrawer,
    PageView
  },
  data() {
    return {
      adShow: false,
      adTitle: '用户详情',
      adDataItems: {},
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '昵称',
          dataIndex: 'nickName'
        },
        {
          title: '客户名称',
          dataIndex: 'userName'
        },
        {
          title: '用户手机号',
          dataIndex: 'mobile'
        },
        {
          title: '性别',
          dataIndex: 'gender',
          scopedSlots: { customRender: 'gender' }
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '加入时间',
          dataIndex: 'pbDate',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        console.log(Object.assign(parameter, this.queryParam))
        return CustomerList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res
        })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: {
          show: false,
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
    stateFilter(type) {
      return stateMap[type] ? stateMap[type].text : ' '
    },
    stateTypeFilter(type) {
      return stateMap[type] ? stateMap[type].state : null
    },
    genderFilter(type) {
      return genderMap[type] ? genderMap[type].text : ' '
    }
  },
  methods: {
    adClose() {
      this.adShow = false
    },
    handleClose() {
      this.$refs.table.refresh()
    },
    handleDetail(record) {
      console.log('record', record)
      this.adDataItems = record
      this.adShow = true
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
    // async custormerQuery() {
    //   console.log('iparams:', this.queryParam)
    //   // try {
    //   //   let iReturn = await CustomerList(this.queryParam)
    //   //   if (iReturn.status === 200 && iReturn.data) {
    //   //     console.log('ok:', this.queryParam)
    //   //   } else {
    //   //     console.log('else:', this.queryParam)
    //   //   }
    //   // } catch (err) {
    //   //   console.log('err:', err)
    //   // }
    // }
  }
}
</script>
