<template>
  <a-modal
    title="编辑商户"
    :width="800"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="商户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="营业执照" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['path', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="省份" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['province', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="城市" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['city', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="区域" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['district', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['userName', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="联系人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['phone', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系人邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['email', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['address', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['state', { initialValue: 1, rules: [{ required: true }] }]" style="width: 100%">
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">注销</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['pbDate', { rules: [{ required: false }] }]" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="12">
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
import { MerchantEdit } from '@/api/merchant'
export default {
  name: 'CarEditModal',
  data() {
    return {
      labelCol: {
        xs: { span: 9 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 13 },
        sm: { span: 16 }
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
            'name',
            'phone',
            'address',
            'province',
            'city',
            'district',
            'path',
            'email',
            'userName',
            'state',
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
          console.log('values:', values)
          this.custormerUpdate(values)
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
        let iReturn = await MerchantEdit(iparams)
        this.confirmLoading = false
        if (iReturn.status === 200) {
          this.$notification.success({
            message: '编辑商户信息成功',
            description: '修改商户信息成功!'
          })
          this.visible = false
          this.$emit('onEditClose')
        } else {
          this.$notification.error({
            message: '编辑商户信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '编辑商户信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
