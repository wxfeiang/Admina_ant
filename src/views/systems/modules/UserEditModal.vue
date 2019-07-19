<template>
  <a-modal title="编辑角色" :width="800" centered :visible="visible" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="uEditForm">
        <a-form-item label="用户id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
          <a-input v-decorator="['id', { initialValue: '', rules: [{ required: false }] }]" />
        </a-form-item>
        <a-form-item label="用户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="用户名称"
            v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名称' }] }]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="登录密码" hasFeedback>
          <a-input
            placeholder="登录密码"
            v-decorator="['password', { rules: [{ required: true, message: '请输入登录密码' }] }]"
          />
        </a-form-item>
        <a-form-item label="电话号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="电话号码"
            v-decorator="['phone', { rules: [{ required: true, message: '请输入电话号码' }] }]"
          />
        </a-form-item>
        <a-form-item label="所属商户" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
          <a-select v-decorator="['mchId', { rules: [{ required: true, message: '请选择所属商户' }] }]">
            <a-select-option v-for="(mch, index) in mchSelectList" :key="index" :value="mch.id">
              {{ mch.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="用户描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            placeholder="用户描述"
            :rows="5"
            v-decorator="['remarks', { rules: [{ required: false, message: '请输入用户描述' }] }]"
          />
        </a-form-item>
        <a-form-item label="用户状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['state', { initialValue: 1, rules: [{ required: true }] }]">
            <a-select-option value="1">正常</a-select-option>
            <a-select-option value="2">注销</a-select-option>
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
import { UserEdit } from '@/api/user'
export default {
  name: 'RoleEditModal',
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
        this.uEditForm.setFieldsValue(
          pick(record, ['id', 'userName', 'password', 'phone', 'mchId', 'rId', 'remarks', 'state'])
        )
      })
    },
    handleConfirm() {
      const {
        uEditForm: { validateFields }
      } = this
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          this.userUpdate(values)
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    async userUpdate(iparams) {
      this.confirmLoading = true
      try {
        let iReturn = await UserEdit(iparams)
        this.confirmLoading = false
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.$notification.success({
            message: '成功',
            description: '编辑用户信息成功!'
          })
          this.visible = false
          this.$emit('onEditClose')
        } else {
          this.$notification.error({
            message: '编辑用户信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '编辑用户信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
