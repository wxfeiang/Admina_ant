<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户名称/电话号码">
              <a-input placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">正常</a-select-option>
                <a-select-option value="2">禁用</a-select-option>
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
      <a-button type="primary" icon="plus" @click="handleAdd">新建用户组</a-button>
    </div>
    <s-table ref="ugTable" rowKey="gId" size="default" :columns="columns" :data="loadData">
      <span slot="gState" slot-scope="text">{{ text | statusFilter }}</span>
      <span slot="gState" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="handleAddUser(record)">分配用户</a>
      </span>
    </s-table>
    <a-modal
      title="新增用户"
      :width="800"
      :visible="addVisible"
      :confirmLoading="addLoading"
      :destroyOnClose="true"
      @ok="handleOk"
      @cancel="handleAddCancel"
    >
      <a-form :form="addForm">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户组名称" hasFeedback>
          <a-input
            placeholder="用户组名称"
            v-decorator="['gName', { rules: [{ required: true, message: '请输入用户组名称' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属角色" hasFeedback>
          <a-select v-decorator="['rId', { rules: [{ required: true, message: '请选择所属角色' }] }]">
            <a-select-option v-for="(rule, index) in ruleSelectList" :key="index" :value="rule.id">
              {{ rule.rname }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户组状态" hasFeedback>
          <a-select v-decorator="['state', { initialValue: 1, rules: [{ required: true }] }]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="0">注销</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户组描述">
          <a-textarea
            placeholder="用户组描述"
            :rows="5"
            v-decorator="['gDes', { rules: [{ required: false, message: '请输入用户组描述' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <user-group-edit-modal
      ref="userGroupEditModal"
      @ok="handleEdit"
      @onEditClose="onUserEditClose"
    ></user-group-edit-modal>
    <user-group-add-user-modal ref="userGroupAddUserModal" @ok="handleAddUser"></user-group-add-user-modal>
  </a-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import UserGroupEditModal from './modules/UserGroupEditModal'
import UserGroupAddUserModal from './modules/UserGroupAddUserModal'
import { UserGroupList, UserGroupAdd } from '@/api/user'
import { RoleSelect } from '@/api/role'
const statusMap = {
  1: {
    state: 'success',
    text: '正常'
  },
  0: {
    state: 'error',
    text: '注销'
  }
}
export default {
  name: 'UserGroupList',
  components: {
    STable,
    UserGroupEditModal,
    UserGroupAddUserModal
  },
  data() {
    return {
      description: '',
      visible: false,
      addVisible: false,
      addLoading: false,
      addForm: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        mchId: this.mchId(),
        state: '-1'
      },
      // 表头
      columns: [
        {
          title: '用户组名称',
          dataIndex: 'gName'
        },
        {
          title: '所属角色',
          dataIndex: 'rName'
        },
        {
          title: '用户组描述',
          dataIndex: 'gDes'
        },
        {
          title: '状态',
          dataIndex: 'gState',
          scopedSlots: { customRender: 'gState' }
        },
        {
          title: '创建时间',
          dataIndex: 'pbTime',
          sorter: true
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: (parameter) => {
        return UserGroupList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res
        })
      },
      ruleSelectList: []
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
    this.loadRuleSelect()
  },
  methods: {
    ...mapGetters(['mchId']),
    async loadRuleSelect() {
      try {
        let iReturn = await RoleSelect()
        if (iReturn.status === 200 && iReturn.data) {
          this.ruleSelectList = iReturn.data
        } else {
          this.$notification.error({
            message: '获取权限信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '获取权限信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    },
    handleEdit(record) {
      record.ruleSelectList = this.ruleSelectList
      record.id = record.gId
      this.$refs.userGroupEditModal.edit(record)
    },
    onUserEditClose() {
      this.$refs.ugTable.refresh(true)
    },
    handleAdd() {
      this.addVisible = true
    },
    handleAddCancel() {
      this.addVisible = false
    },
    handleOk() {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          console.log('confirmSave values:', values)
          this.userGroupAdd(values)
        }
      })
    },
    async userGroupAdd(iParams) {
      this.addLoading = true
      try {
        iParams.mchId = this.mchId()
        let iReturn = await UserGroupAdd(iParams)
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.addVisible = false
          this.$refs.ugTable.refresh(true)
          this.$notification.success({
            message: '成功',
            description: `新增用户组成功`
          })
        } else {
          this.$notification.error({
            message: '新增用户组失败',
            description: `${iReturn.data}`
          })
        }
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    },
    handleAddUser(record) {
      this.$refs.userGroupAddUserModal.edit(record)
    }
  }
}
</script>
