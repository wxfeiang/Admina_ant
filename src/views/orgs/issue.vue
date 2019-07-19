<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="机构名称">
              <a-input v-model="queryParam.orgName" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="机构状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="1">启用</a-select-option>
                <a-select-option value="2">停用</a-select-option>
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
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="gotoAdd">新建</a-button>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :scroll="{ x: 1300 }"
      :rowSelection="options.rowSelection"
    >
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | validityTypeFilter" :text="text | validityFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a-tag color="green" @click="handleDetail(record)">详情</a-tag>
          <a-divider type="vertical" />
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item @click="handleEdit(record)">
                <a>编辑</a>
              </a-menu-item>
              <a-menu-item @click="handleStatus(record)">
                <a>{{ record.status === 1 ? '停用' : '启用' }}</a>
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
    <edit-modal ref="orgEditModal" @ok="handleEdit" @onClose="handleClose" />
    <add-modal ref="orgAddModal" @ok="gotoAdd" @onClose="handleClose" />
    <detail-drawer
      :isShow="adShow"
      :dataName="adDataItems.user_name"
      :dataItems="adDataItems"
      @onClose="adClose"
    ></detail-drawer>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import EditModal from './modules/EditModal'
import AddModal from './modules/AddModal'
import DetailDrawer from './modules/DetailDrawer'
import { OrgEdit, getOrgList } from '@/api/org'
import notification from 'ant-design-vue/es/notification'

const statusMap = {
  1: {
    state: 'success',
    text: '启用'
  },
  2: {
    state: 'error',
    text: '停用'
  }
}
export default {
  name: 'OrgList',
  components: {
    STable,
    EditModal,
    AddModal,
    DetailDrawer
  },
  data() {
    return {
      adShow: false,
      adTitle: '发行机构详情',
      adDataItems: {},
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' },
          fixed: 'left'
        },
        {
          title: '机构编号',
          dataIndex: 'orgId'
        },
        {
          title: '机构名称',
          dataIndex: 'orgName'
        },
        {
          title: '联系方式',
          dataIndex: 'title'
        },
        {
          title: '机构状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
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
          title: '联系人',
          dataIndex: 'contact'
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
        return getOrgList(Object.assign(parameter, this.queryParam)).then((res) => {
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
    handleStatus(record) {
      let param = {
        id: record.id,
        status: record.status === 1 ? 2 : 1
      }
      OrgEdit(param).then((res) => {
        console.log(res)
        if (res.data === 1) {
          this.$refs.table.refresh()
          notification.success({
            message: param.status === 1 ? '机构已启用' : '机构已停用',
            description: param.status === 1 ? '机构已启用' : '机构已停用'
          })
        } else {
          notification.error({
            message: '修改机构状态失败',
            description: '修改机构状态失败'
          })
        }
      })
    },
    handleEdit(record) {
      this.$refs.orgEditModal.edit(record)
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}
</script>
