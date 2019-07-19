<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色ID">
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
      <a-button type="primary" icon="plus" @click="handleAdd">新建角色</a-button>
    </div>
    <s-table ref="rTable" rowKey="id" size="default" :columns="columns" :data="loadData">
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <a-row :gutter="24" :style="{ marginBottom: '12px' }">
          <a-col :span="4" v-for="(per, index) in record.actionList" :key="index" :style="{ marginBottom: '12px' }">
            <a-col :span="24">
              <a-tag color="blue">{{ per.pName }}</a-tag>
            </a-col>
          </a-col>
        </a-row>
      </div>
      <span slot="rState" slot-scope="text">{{ text | statusFilter }}</span>
      <span slot="rState" slot-scope="text">
        <a-badge :status="text | stateTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
      </span>
    </s-table>
    <a-modal
      title="新增角色"
      :width="800"
      :visible="addVisible"
      :confirmLoading="addLoading"
      :destroyOnClose="true"
      @ok="handleOk"
      @cancel="handleAddCancel"
    >
      <a-form :form="addForm">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色识别码" hasFeedback>
          <a-input
            placeholder="角色识别码(英文大小写)"
            v-decorator="['rCode', { rules: [{ required: true, message: '请输入角色识别码' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色名称" hasFeedback>
          <a-input
            placeholder="角色名称"
            v-decorator="['rName', { rules: [{ required: true, message: '请输入角色名称' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="关联权限" hasFeedback>
          <a-select
            mode="multiple"
            placeholder="关联权限"
            :allowClear="true"
            v-decorator="['pId', { rules: [{ required: true, message: '请选择关联权限' }] }]"
          >
            <a-select-option v-for="(per, index) in perSelectList" :key="index" :value="per.id">
              {{ per.pName }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色状态" hasFeedback>
          <a-select v-decorator="['rState', { initialValue: 1, rules: [{ required: true }] }]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">注销</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色描述">
          <a-textarea
            placeholder="角色描述"
            :rows="5"
            v-decorator="['pDesc', { rules: [{ required: false, message: '请输入角色描述' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <role-edit-modal ref="roleEditModal" @ok="handleEdit" @onEditClose="onRoleEditClose"></role-edit-modal>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import RoleEditModal from './modules/RoleEditModal'
import { RoleList, RoleAdd } from '@/api/role'
import { PerSelect } from '@/api/permission'
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
  name: 'RoleList',
  components: {
    STable,
    RoleEditModal
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
          title: '角色识别码',
          dataIndex: 'rCode'
        },
        {
          title: '角色名称',
          dataIndex: 'rName'
        },
        {
          title: '角色描述',
          dataIndex: 'rDesc'
        },
        {
          title: '状态',
          dataIndex: 'rState',
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
        return RoleList(Object.assign(parameter, this.queryParam)).then((res) => {
          return res.data
        })
      },
      perSelectList: []
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
    this.loadPerSelect()
  },
  methods: {
    ...mapGetters(['mchId']),
    async loadPerSelect() {
      try {
        let iReturn = await PerSelect()
        if (iReturn.status === 200 && iReturn.data) {
          this.perSelectList = iReturn.data
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
      record.perSelectList = this.perSelectList
      let tmpList = []
      for (let itemData of record.actionList) {
        tmpList.push(itemData.id)
      }
      record.pId = tmpList
      this.$refs.roleEditModal.edit(record)
    },
    onRoleEditClose() {
      this.$refs.rTable.refresh(true)
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
          this.roleAdd(values)
        }
      })
    },
    async roleAdd(iParams) {
      this.addLoading = true
      try {
        iParams.mchId = this.mchId()
        let iReturn = await RoleAdd(iParams)
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.addVisible = false
          this.$refs.rTable.refresh(true)
          this.$notification.success({
            message: '成功',
            description: `新增角色成功`
          })
        } else {
          this.$notification.error({
            message: '新增角色失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '新增权限失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
