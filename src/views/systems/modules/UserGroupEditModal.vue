<template>
  <a-modal title="编辑角色" :width="800" centered :visible="visible" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="uEditForm">
        <a-form-item label="用户组id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
          <a-input v-decorator="['id', { initialValue: '', rules: [{ required: false }] }]" />
        </a-form-item>
        <a-form-item label="用户组名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
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
        <a-form-item label="用户组描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            placeholder="用户组描述"
            :rows="5"
            v-decorator="['gDes', { rules: [{ required: false, message: '请输入用户组描述' }] }]"
          />
        </a-form-item>
        <a-form-item label="用户组状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['gState', { initialValue: 1, rules: [{ required: true }] }]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="0">注销</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleConfirm">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { UserGroupEdit } from '@/api/user'
export default {
  name: 'UserGroupEditModal',
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      showItem: false,
      visible: false,
      confirmLoading: false,
      id: '',
      uEditForm: this.$form.createForm(this),
      ruleSelectList: [],
      mchSelectList: []
    }
  },
  methods: {
    edit(record) {
      this.visible = true
      this.ruleSelectList = record.ruleSelectList
      this.mchSelectList = record.mchSelectList
      this.$nextTick(() => {
        this.uEditForm.setFieldsValue(pick(record, ['id', 'gName', 'rId', 'gDes', 'gState']))
      })
    },
    handleConfirm() {
      const {
        uEditForm: { validateFields }
      } = this
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          this.userGroupUpdate(values)
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    async userGroupUpdate(iparams) {
      this.confirmLoading = true
      try {
        let iReturn = await UserGroupEdit(iparams)
        this.confirmLoading = false
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.$notification.success({
            message: '成功',
            description: '编辑用户组信息成功!'
          })
          this.visible = false
          this.$emit('onEditClose')
        } else {
          this.$notification.error({
            message: '编辑用户组信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '编辑用户组信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
