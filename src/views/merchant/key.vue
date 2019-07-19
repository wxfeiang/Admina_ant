<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="商户名称">
              <a-input v-model="queryParam.name" />
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
      :scroll="{ x: '190%' }"
      :alert="null"
      :rowSelection="null"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | validityTypeFilter" :text="text | validityFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a-tag :color="record.testKey == null ? 'green' : 'blue'" @click="handleStatus(record)">{{
            record.testKey == null ? '生成密钥' : '更新密钥'
          }}</a-tag>
        </template>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { MerchantList, generatingKeyById } from '@/api/merchant'
import notification from 'ant-design-vue/es/notification'

const statusMap = {
  1: {
    state: 'success',
    text: '正常'
  },
  2: {
    state: 'error',
    text: '注销'
  }
}
export default {
  name: 'OrgList',
  components: {
    STable
  },
  data() {
    return {
      adShow: false,
      adTitle: '商户详情',
      adDataItems: {},
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        mchId: 1
      },
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' },
          fixed: 'left'
        },
        {
          title: '商户名称',
          dataIndex: 'name'
        },
        {
          title: '联系方式',
          dataIndex: 'phone'
        },
        {
          title: '测试密钥',
          dataIndex: 'testKey'
        },
        {
          title: '生产密钥',
          dataIndex: 'prodKey'
        },
        {
          title: '商户状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '创建时间',
          dataIndex: 'pbDate'
        },
        {
          title: '修改时间',
          dataIndex: 'upDate'
        },
        {
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 90,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter) => {
        console.log('loadData.parameter', parameter)
        return MerchantList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
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
    validityFilter(type) {
      return statusMap[type].text
    },
    validityTypeFilter(type) {
      return statusMap[type].state
    }
  },
  methods: {
    adClose() {
      this.adShow = false
    },
    gotoAdd() {
      this.$refs.orgAddModal.add()
    },
    handleClose() {
      this.$refs.table.refresh()
    },
    handleDetail(record) {
      console.log(record)
      this.adDataItems = record
      this.adShow = true
    },
    handleStatus: function(record) {
      let param = {
        id: record.id
      }
      generatingKeyById(param).then((res) => {
        console.log(res)
        if (res.data !== '') {
          this.$refs.table.refresh()
          notification.success({
            message: '操作成功',
            description: '操作成功'
          })
        } else {
          notification.error({
            message: '操作失败',
            description: '操作失败'
          })
        }
      })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
