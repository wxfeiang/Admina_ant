<template>
  <a-modal
    title="编辑停车场"
    :width="840"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="peform">
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
              <a-input v-decorator="['id', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="parkId" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
              <a-input v-decorator="['parkId', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="mchId" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
              <a-input v-decorator="['mchId', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12"></a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="停车场名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['address', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['contact', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['tel', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="车位数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['num', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['lat', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['lng', { rules: [{ required: true }] }]" />
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
import { parkEdit } from '@/api/park'
export default {
  name: 'ParkEditModal',
  data() {
    return {
      showItem: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      mchId: '',
      mchOptions: [],
      confirmLoading: false,
      peform: this.$form.createForm(this)
    }
  },
  methods: {
    edit(record) {
      this.visible = true
      const {
        peform: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(
          pick(record, ['id', 'parkId', 'mchId', 'name', 'contact', 'tel', 'address', 'num', 'lat', 'lng', 'state'])
        )
      })
    },
    handleConfirm() {
      const {
        peform: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          values.operation = '2'
          console.log('values:', values)
          parkEdit(values).then((res) => {
            if (res.status === 200) {
              this.$notification.success({
                message: '编辑成功',
                description: '修改停车场信息成功!'
              })
              this.visible = false
              this.$emit('onEditClose')
            } else {
              this.$notification.error({
                message: '编辑失败',
                description: `${res.wrapperColreasonPhrase}`
              })
            }
          })
          this.confirmLoading = false
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
