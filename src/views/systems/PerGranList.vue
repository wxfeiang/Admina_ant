<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd">新建粒度</a-button>
    </div>
    <s-table ref="pgTable" rowKey="id" :columns="columns" :data="loadData">
      <span slot="status" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
      </span>
    </s-table>

    <a-modal
      title="新建粒度"
      :width="800"
      :visible="addVisible"
      :confirmLoading="saveLoading"
      :destroyOnClose="true"
      @ok="handleAddOk"
      @cancel="handleAddCancel"
    >
      <a-form :form="addForm">
        <a-form-item label="粒度名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['gName', { rules: [{ required: true, message: '请输入粒度名称' }] }]" />
        </a-form-item>
        <a-form-item label="粒度代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['gValue', { rules: [{ required: true, message: '请输入粒度代码' }] }]" />
        </a-form-item>
        <a-form-item label="粒度状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['status', { initialValue: 1, rules: [{ required: true }] }]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">注销</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="修改粒度"
      :width="800"
      :visible="editVisible"
      :confirmLoading="editLoading"
      @ok="handleEditOk"
      @cancel="handleEditCancel"
    >
      <a-form :form="editForm">
        <a-form-item label="粒度id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
          <a-input v-decorator="['id', { initialValue: '', rules: [{ required: true }] }]" />
        </a-form-item>
        <a-form-item label="粒度名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['gName', { initialValue: '', rules: [{ required: true }] }]" />
        </a-form-item>
        <a-form-item label="粒度代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="['gValue', { initialValue: '', rules: [{ required: true }] }]" />
        </a-form-item>
        <a-form-item label="粒度状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['status', { initialValue: 1, rules: [{ required: true }] }]" style="width: 100%">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">注销</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import pick from 'lodash.pick'
import { PerGranList, PerGranAdd, PerGranEdit } from '@/api/permission'
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
    STable
  },
  data() {
    return {
      description: '',
      addVisible: false,
      editVisible: false,
      showItem: false,
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
      saveLoading: false,
      editLoading: false,
      mdl: {},
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '粒度代码',
          dataIndex: 'gValue'
        },
        {
          title: '粒度名称',
          dataIndex: 'gName'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      permissionList: null,
      loadData: (parameter) => {
        return PerGranList(Object.assign(parameter, this.queryParam)).then((res) => {
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
  methods: {
    handleAdd() {
      this.addVisible = true
    },
    handleEdit(record) {
      this.editVisible = true
      this.$nextTick(() => {
        this.editForm.setFieldsValue(pick(record, ['id', 'gName', 'gValue', 'status']))
      })
    },
    handleAddOk() {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          console.log('handleAddOk values:', values)
          this.perGranAdd(values)
        }
      })
    },
    handleEditOk() {
      this.editLoading = true
      this.editForm.validateFields((err, values) => {
        if (!err) {
          console.log('handleEditOk values:', values)
          this.perGranUpdate(values)
        }
        this.editLoading = false
      })
    },
    handleAddCancel() {
      this.addVisible = false
    },
    handleEditCancel() {
      this.editVisible = false
    },
    async perGranAdd(iparams) {
      this.saveLoading = true
      try {
        let iReturn = await PerGranAdd(iparams)
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.addVisible = false
          this.$notification.success({
            message: '新增权限粒度成功',
            description: '新增权限粒度成功!'
          })
          this.$refs.pgTable.refresh(true)
        } else {
          this.$notification.error({
            message: '新增权限粒度失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
        this.saveLoading = false
      } catch (err) {
        this.saveLoading = false
        this.$notification.error({
          message: '新增权限粒度失败',
          description: `${err.reasonPhrase}`
        })
      }
    },
    async perGranUpdate(iparams) {
      this.editLoading = true
      try {
        let iReturn = await PerGranEdit(iparams)
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.$notification.success({
            message: '编辑权限粒度成功',
            description: '修改权限粒度成功!'
          })
          this.editVisible = false
          this.$refs.pgTable.refresh(true)
        } else {
          this.$notification.error({
            message: '编辑权限粒度失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
        this.editLoading = false
      } catch (err) {
        this.editLoading = false
        this.$notification.error({
          message: '编辑菜单信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
