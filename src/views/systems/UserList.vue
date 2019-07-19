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
      <a-button type="primary" icon="plus" @click="handleAdd">新建用户</a-button>
    </div>
    <s-table ref="uTable" rowKey="id" size="default" :columns="columns" :data="loadData">
      <span slot="rState" slot-scope="text">{{ text | statusFilter }}</span>
      <span slot="rState" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="handleGroupLink(record)">关联用户组</a>
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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户名称" hasFeedback>
          <a-input
            placeholder="用户名称"
            v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名称' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="登录密码" hasFeedback>
          <a-input
            placeholder="登录密码"
            v-decorator="['password', { rules: [{ required: true, message: '请输入用户名称' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="电话号码" hasFeedback>
          <a-input
            placeholder="电话号码"
            v-decorator="['phone', { rules: [{ required: true, message: '请输入电话号码' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属商户" hasFeedback>
          <a-select v-decorator="['mchId', { rules: [{ required: true, message: '请选择所属商户' }] }]">
            <a-select-option v-for="(mch, index) in mchSelectList" :key="index" :value="mch.id">
              {{ mch.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户状态" hasFeedback>
          <a-select v-decorator="['state', { initialValue: 1, rules: [{ required: true }] }]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">注销</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户描述">
          <a-textarea
            placeholder="用户描述"
            :rows="5"
            v-decorator="['rmarks', { rules: [{ required: false, message: '请输入用户描述' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <user-edit-modal ref="userEditModal" @ok="handleEdit" @onEditClose="onUserEditClose"></user-edit-modal>
  </a-card>
</template>

<script>
import { mapGetters } from 'vuex'
import md5 from 'md5'
import { STable } from '@/components'
import UserEditModal from './modules/UserEditModal'
import { UserList, UserAdd, UserGroupSelect } from '@/api/user'
import { RoleSelect } from '@/api/role'
import { MerchantAll } from '@/api/merchant'
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
    UserEditModal
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
        mchId: this.mchId()
      },
      // 表头
      columns: [
        {
          title: '用户名称',
          dataIndex: 'userName'
        },
        {
          title: '电话号码',
          dataIndex: 'phone'
        },
        {
          title: '所属商户',
          dataIndex: 'mname'
        },
        {
          title: '所属用户组',
          dataIndex: 'gname'
        },
        {
          title: '备注',
          dataIndex: 'remarks'
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'rState' }
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
        return UserList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res
        })
      },
      groupSelectList: [],
      mchSelectList: []
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
    this.loadGroupSelect()
    this.loadMchSelect(this.userInfo().mchId)
  },
  methods: {
    ...mapGetters(['userInfo', 'mchId']),
    async loadGroupSelect() {
      try {
        let iReturn = await UserGroupSelect({ mchId: this.mchId() })
        if (iReturn.status === 200 && iReturn.data.length > 0) {
          this.groupSelectList = iReturn.data
        }
      } catch (err) {
        this.$notification.error({
          message: '获取用户组信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    },
    async loadMchSelect(mchId) {
      try {
        let iReturn = await MerchantAll({ mchId: mchId })
        if (iReturn.status === 200 && iReturn.data) {
          this.mchSelectList = iReturn.data
        } else {
          this.$notification.error({
            message: '获取商户信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '获取商户信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    },
    handleEdit(record) {
      // record.mchId = String(record.mchId)
      record.groupSelectList = this.groupSelectList
      record.mchSelectList = this.mchSelectList
      this.$refs.userEditModal.edit(record)
    },
    onUserEditClose() {
      this.$refs.uTable.refresh(true)
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
          values.password = md5(values.password)
          console.log('confirmSave values:', values)
          this.userAdd(values)
        }
      })
    },
    async userAdd(iParams) {
      this.addLoading = true
      try {
        let iReturn = await UserAdd(iParams)
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.addVisible = false
          this.$refs.uTable.refresh(true)
          this.$notification.success({
            message: '成功',
            description: `新增用户成功`
          })
        } else {
          this.$notification.error({
            message: '新增用户失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        console.log(JSON.stringify(err))
      }
    },
    handleGroupLink() {
      this.$router.push({ name: 'usergroup' })
    }
  }
}
</script>
