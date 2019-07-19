<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="车牌号">
              <a-input v-model="queryParam.plateNo" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="车辆类型">
              <a-select v-model="queryParam.carType" placeholder="请选择" default-value="0">
                <a-select-option value="1">普通车辆</a-select-option>
                <a-select-option value="2">ETC车辆</a-select-option>
                <a-select-option value="3">公务车辆</a-select-option>
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
              <a-form-item label="车辆有效期">
                <a-select v-model="queryParam.validity" placeholder="请选择" default-value="0">
                  <a-select-option value="1">有效</a-select-option>
                  <a-select-option value="2">无效</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="车辆状态">
                <a-select placeholder="请选择" v-model="queryParam.carStatus" default-value="1">
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
    <!-- <div class="table-operator">
      <a-button type="primary" icon="plus" @click="gotoAdd">新建</a-button>
    </div>-->
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="carType" slot-scope="text">
        {{ text | typeFilter }}
      </span>
      <span slot="plateColor" slot-scope="text">
        {{ text | colorFilter }}
      </span>
      <span slot="validity" slot-scope="text">
        <a-badge :status="text | validityTypeFilter" :text="text | validityFilter" />
      </span>
      <span slot="carStatus" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a-tag color="green" @click="handleDetail(record)">详情</a-tag>
          <a-tag color="blue" @click="handleEdit(record)">编辑</a-tag>
        </template>
      </span>
    </s-table>
    <edit-modal ref="caremodal" @ok="handleEdit" @onClose="handleClose" />
    <add-modal ref="caramodal" @ok="gotoAdd" @onClose="handleClose" />
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
import AddModal from './modules/AddModal'
import DetailDrawer from './modules/DetailDrawer'
import { getRoleList } from '@/api/manage'
import { CarList } from '@/api/car'
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
const colorMap = {
  0: {
    state: 'processing',
    text: '蓝色'
  },
  2: {
    state: 'success',
    text: '其他'
  }
}
export default {
  name: 'CarList',
  components: {
    STable,
    EditModal,
    AddModal,
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
        // {
        //   title: '序号',
        //   scopedSlots: { customRender: 'serial' }
        // },
        {
          title: '车牌号',
          dataIndex: 'plateNo'
        },
        {
          title: '车牌颜色',
          dataIndex: 'plateColor',
          scopedSlots: { customRender: 'plateColor' }
        },
        {
          title: '车辆类型',
          dataIndex: 'carType',
          scopedSlots: { customRender: 'carType' }
        },
        {
          title: '车辆有效期',
          dataIndex: 'validity',
          scopedSlots: { customRender: 'validity' }
        },
        {
          title: '车辆状态',
          dataIndex: 'carStatus',
          scopedSlots: { customRender: 'carStatus' }
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
        return CarList(Object.assign(parameter, this.queryParam)).then((res) => {
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
    validityFilter(type) {
      return validityMap[type] ? validityMap[type].text : ' '
    },
    validityTypeFilter(type) {
      return validityMap[type] ? validityMap[type].state : null
    },
    typeFilter(type) {
      return typeMap[type] ? typeMap[type].text : ' '
    },
    typeTypeFilter(type) {
      return typeMap[type] ? typeMap[type].state : null
    },
    colorFilter(type) {
      return colorMap[type] ? colorMap[type].text : ' '
    },
    colorTypeFilter(type) {
      return colorMap[type] ? colorMap[type].state : null
    }
  },
  created() {
    getRoleList({ t: new Date() })
  },
  methods: {
    adClose() {
      this.adShow = false
    },
    gotoAdd() {
      this.$refs.caramodal.add()
    },
    handleClose() {
      this.$refs.table.refresh()
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
      record.mstartDate = moment(record.mstartDate, 'YYYY-MM-DD')
      record.mendDate = moment(record.mendDate, 'YYYY-MM-DD')
      this.$refs.caremodal.edit(record)
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
