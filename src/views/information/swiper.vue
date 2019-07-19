<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="文章标题">
              <a-input v-model="queryParam.titles" />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="文章状态">
                <a-select placeholder="请选择" default-value="1">
                  <a-select-option value="1">正常</a-select-option>
                  <a-select-option value="2">删除</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建日期">
                <a-date-picker v-model="queryParam.pbDate" style="width: 100%" placeholder="请输入更新日期" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="(!advanced && 8) || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="(advanced && { float: 'right', overflow: 'hidden' }) || {}"
            >
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => (queryParam = { newType: '5' })">重置</a-button>
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
      <a-button type="primary" icon="plus" @click="gotoAdd">新建</a-button>
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
      <span slot="art_state" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | stateFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleDetail(record)">预览</a>
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
    <edit-modal ref="modal" @ok="handleEdit" @onClose="handleEditClose" />
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
import { SysNewsList, NewsUpdate } from '@/api/news'

const stateMap = {
  1: {
    state: 'success',
    text: '正常'
  },
  2: {
    state: 'warning',
    text: '下架'
  },
  3: {
    state: 'error',
    text: '删除'
  }
}
export default {
  name: 'swiper',
  components: {
    STable,
    EditModal,
    DetailDrawer
  },
  data() {
    return {
      adShow: false,
      adTitle: '广告位详情',
      adDataItems: {},
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        newType: '5'
      },
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '广告位',
          dataIndex: 'titles'
        },
        {
          title: '广告位状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'art_state' }
        },
        {
          title: '发布者',
          dataIndex: 'userId'
        },
        {
          title: '创建时间',
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
        console.log('loadData.parameter', parameter)
        return SysNewsList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res
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
    }
  },
  methods: {
    adClose() {
      this.adShow = false
    },
    handleEditClose() {
      this.$refs.table.refresh()
    },
    gotoAdd() {
      this.$router.push({ name: 'artadd', params: { type: 'sales', typeKey: this.queryParam.newType } })
    },
    handleDetail(record) {
      this.adDataItems = record
      this.adShow = true
    },
    handleDelete(record) {
      let news = {
        id: record.id,
        state: 3
      }
      NewsUpdate(news).then((res) => {
        if (res.data !== 0) {
          this.$message.success('删除成功')
          this.$refs.table.refresh()
        }
      })
    },
    handlePull(record) {
      let news = {
        id: record.id,
        state: 2
      }
      NewsUpdate(news).then((res) => {
        if (res.data !== 0) {
          this.$message.success('已下架该广告')
          this.$refs.table.refresh()
        }
      })
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
