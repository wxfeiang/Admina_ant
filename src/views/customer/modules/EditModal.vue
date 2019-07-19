<template>
  <a-modal
    title="编辑客户信息"
    :width="840"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="昵称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['nickName', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="用户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['userName', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['mobile', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="身份证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['identityId', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['gender', { initialValue: 1, rules: [{ required: true }] }]" style="width: 100%">
                <a-select-option :value="1">女</a-select-option>
                <a-select-option :value="2">男</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="用户类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['type', { initialValue: 1, rules: [{ required: false }] }]"
                disabled
                style="width: 100%"
              >
                <a-select-option :value="1">微信</a-select-option>
                <a-select-option :value="2">支付宝</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="用户级别" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['userLevel', { initialValue: 1, rules: [{ required: false }] }]"
                disabled
                style="width: 100%"
              >
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">支付宝</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="用户状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['state', { initialValue: 1, rules: [{ required: true }] }]" style="width: 100%">
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">注销</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['pbDate', { rules: [{ required: false }] }]" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="修改时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['upDate', { rules: [{ required: false }] }]" disabled />
            </a-form-item>
          </a-col>
        </a-row>
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
import { CustomerEdit } from '@/api/customer'
import notification from 'ant-design-vue/es/notification'
export default {
  name: 'CustomerEditModal',
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      id: '',
      form: this.$form.createForm(this)
    }
  },
  methods: {
    edit(record) {
      this.visible = true
      this.id = record.id
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(
          pick(record, [
            'userName',
            'mobile',
            'nickName',
            'identityId',
            'gender',
            'state',
            'type',
            'userLevel',
            'pbDate',
            'upDate'
          ])
        )
      })
    },
    handleConfirm() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          values.id = this.id
          this.custormerUpdate(values)
          this.confirmLoading = false
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    async custormerUpdate(iparams) {
      console.log('iparams:', iparams)
      try {
        let iReturn = await CustomerEdit(iparams)
        if (iReturn.status === 200 && iReturn.data === 1) {
          notification.success({
            message: '编辑客户信息成功',
            description: '修改客户信息成功!'
          })
          this.visible = false
          this.$emit('onClose')
        } else {
          notification.error({
            message: '编辑客户信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        notification.error({
          message: '编辑客户信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
