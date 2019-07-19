<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="权限名称/识别码">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新建权限</a-button>
    </div>
    <s-table ref="pTable" rowKey="id" :columns="columns" :data="loadData">
      <span slot="actions" slot-scope="text, record">
        <a-tag color="cyan" v-for="(action, index) in record.actionList" :key="index">{{ action.gName }}</a-tag>
      </span>
      <span slot="pState" slot-scope="text">{{ text | statusFilter }}</span>
      <span slot="pState" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
      </span>
    </s-table>

    <a-modal
      title="新增权限"
      :width="800"
      :visible="addVisible"
      :confirmLoading="addLoading"
      :destroyOnClose="true"
      @ok="handleOk"
      @cancel="handleAddCancel"
    >
      <a-form :form="addForm">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限识别码" hasFeedback>
          <a-input
            placeholder="权限识别码(英文大小写)"
            v-decorator="['pCode', { rules: [{ required: true, message: '请输入权限识别码' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限名称" hasFeedback>
          <a-input
            placeholder="权限名称"
            v-decorator="['pName', { rules: [{ required: true, message: '请输入权限名称' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联菜单" hasFeedback>
          <a-select v-decorator="['mId', { rules: [{ required: true, message: '请选择关联菜单' }] }]">
            <a-select-option v-for="(menu, index) in menuSelectList" :key="index" :value="menu.id">
              {{ menu.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限状态" hasFeedback>
          <a-select v-decorator="['pState', { initialValue: 1, rules: [{ required: true }] }]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">注销</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限描述">
          <a-textarea
            placeholder="权限描述"
            :rows="5"
            v-decorator="['pDesc', { rules: [{ required: false, message: '请输入权限描述' }] }]"
          />
        </a-form-item>
        <a-divider />
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限粒度" hasFeedback>
          <a-select
            mode="multiple"
            :allowClear="true"
            placeholder="请选择权限粒度"
            v-decorator="['pAttr', { rules: [{ required: true, message: '请选择权限粒度' }] }]"
          >
            <a-select-option v-for="(action, index) in permissionList" :key="index" :value="action.id">
              {{ action.gName }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <per-edit-modal ref="perEditModal" @ok="handleEdit" @onEditClose="onPerEditClose" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import PerEditModal from './modules/PerEditModal'
import { PerGranGet, PerList, PerAdd } from '@/api/permission'
import { MenuSelect } from '@/api/menu'
import { mapGetters } from 'vuex'
const statusMap = {
  1: {
    state: 'success',
    text: '正常'
  },
  2: {
    state: 'error',
    text: '删除'
  }
}
export default {
  name: 'TableList',
  components: {
    STable,
    PerEditModal
  },
  data() {
    return {
      description: '',
      addVisible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      addForm: this.$form.createForm(this),
      editForm: this.$form.createForm(this),
      addLoading: false,
      editLoading: false,
      mdl: {},
      // 查询参数
      queryParam: {
        mchId: this.mchId()
      },
      // 表头
      columns: [
        {
          title: '权限识别码',
          dataIndex: 'pCode'
        },
        {
          title: '权限名称',
          dataIndex: 'pName'
        },
        {
          title: '关联菜单',
          dataIndex: 'title'
        },
        {
          title: '可操作权限',
          dataIndex: 'actions',
          scopedSlots: { customRender: 'actions' }
        },
        {
          title: '权限描述',
          dataIndex: 'pDesc'
        },
        {
          title: '状态',
          dataIndex: 'pState',
          scopedSlots: { customRender: 'pState' }
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      menuSelectList: [],
      permissionList: [],
      loadData: (parameter) => {
        return PerList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
        })
      }
    }
  },
  filters: {
    statusFilter(status) {
      return statusMap[status].text
    },
    stateTypeFilter(type) {
      return statusMap[type].state
    }
  },
  created() {
    this.loadPermissionList()
    this.loadMenuSelect()
  },
  methods: {
    ...mapGetters(['mchId']),
    async loadPermissionList() {
      try {
        let iReturn = await PerGranGet()
        if (iReturn.status === 200 && iReturn.data) {
          this.permissionList = iReturn.data
        } else {
          this.$notification.error({
            message: '获取权限粒度失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '获取权限粒度信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    },
    async loadMenuSelect() {
      try {
        let iReturn = await MenuSelect()
        if (iReturn.status === 200 && iReturn.data) {
          this.menuSelectList = iReturn.data
        } else {
          this.$notification.error({
            message: '获取菜单信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '获取菜单信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    },
    handleAdd() {
      this.addVisible = true
    },
    handleEdit(record) {
      record.permissionList = this.permissionList
      record.menuSelectList = this.menuSelectList
      let tmpList = []
      for (let itemData of record.actionList) {
        tmpList.push(itemData.id)
      }
      record.pAttr = tmpList
      this.$refs.perEditModal.edit(record)
    },
    handleAddCancel() {
      this.addVisible = false
    },
    handleOk() {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          console.log('confirmSave values:', values)
          this.perAdd(values)
        }
      })
    },
    onPerEditClose() {
      this.$refs.pTable.refresh(true)
    },
    async perAdd(iParams) {
      this.addLoading = true
      try {
        iParams.mchId = this.mchId()
        let iReturn = await PerAdd(iParams)
        this.addLoading = false
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.addVisible = false
          this.$refs.pTable.refresh(true)
          this.$notification.success({
            message: '成功',
            description: `新增权限成功`
          })
        } else {
          this.$notification.error({
            message: '新增权限失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.addLoading = false
        this.$notification.error({
          message: '新增权限失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
