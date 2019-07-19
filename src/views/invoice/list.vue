<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="车牌号">
              <a-input v-model="queryParam.id" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="车辆类型">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="1">普通车辆</a-select-option>
                <a-select-option value="2">ETC车辆</a-select-option>
                <a-select-option value="3">公务车辆</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="手机号码">
                <a-input-number v-model="queryParam.callNo" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="绑定日期">
                <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="车辆有效期">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="1">有效</a-select-option>
                  <a-select-option value="2">无效</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="车辆状态">
                <a-select placeholder="请选择" default-value="1">
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">删除</a-select-option>
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
      <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
      <span slot="car_type" slot-scope="text">
        <a-badge :status="text | typeTypeFilter" :text="text | typeFilter" />
      </span>
      <span slot="validity" slot-scope="text">
        <a-badge :status="text | validityTypeFilter" :text="text | validityFilter" />
      </span>
      <span slot="car_status" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item @click="handleEdit(record)">
                <a>编辑</a>
              </a-menu-item>
              <a-menu-item @click="handleDelete(record)">
                <a>删除</a>
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
    <edit-modal ref="modal" @ok="handleEdit" />
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
import EditModal from './modules/EditModal'
import DetailDrawer from './modules/DetailDrawer'
import { getRoleList, getCarList } from '@/api/manage'
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
export default {
  name: 'TableList',
  components: {
    STable,
    EditModal,
    DetailDrawer
  },
  data() {
    return {
      adShow: false,
      adTitle: '车辆详情',
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
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '车牌号',
          dataIndex: 'plate_no'
        },
        {
          title: '车牌颜色',
          dataIndex: 'plate_color'
        },
        {
          title: '停车场服务',
          dataIndex: 'park_service'
        },
        {
          title: '车辆类型',
          dataIndex: 'car_type',
          scopedSlots: { customRender: 'car_type' }
        },
        {
          title: '车辆有效期',
          dataIndex: 'validity',
          scopedSlots: { customRender: 'validity' }
        },
        {
          title: '车辆状态',
          dataIndex: 'car_status',
          scopedSlots: { customRender: 'car_status' }
        },
        {
          title: '绑定时间',
          dataIndex: 'pb_date',
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
        console.log('loadData.parameter', parameter)
        return getCarList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.result
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
    stateFilter(type) {
      return stateMap[type].text
    },
    stateTypeFilter(type) {
      return stateMap[type].state
    },
    validityFilter(type) {
      return validityMap[type].text
    },
    validityTypeFilter(type) {
      return validityMap[type].state
    },
    typeFilter(type) {
      return typeMap[type].text
    },
    typeTypeFilter(type) {
      return typeMap[type].state
    }
  },
  created() {
    getRoleList({ t: new Date() })
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
