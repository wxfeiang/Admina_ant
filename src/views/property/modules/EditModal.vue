<template>
  <a-modal
    title="编辑"
    :width="800"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="车牌号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['plate_no', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="车牌颜色" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['plate_color', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="停车场服务" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['park_service', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="车辆类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['car_type', { initialValue: 1, rules: [{ required: true }] }]"
                style="width: 100%"
              >
                <a-select-option :value="1">普通车辆</a-select-option>
                <a-select-option :value="2">ETC车辆</a-select-option>
                <a-select-option :value="3">公务车辆</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="车辆有效期" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['validity', { initialValue: 1, rules: [{ required: true }] }]"
                style="width: 100%"
              >
                <a-select-option :value="1">有效</a-select-option>
                <a-select-option :value="2">无效</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="车辆状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['car_status', { initialValue: 1, rules: [{ required: true }] }]"
                style="width: 100%"
              >
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">删除</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="ETC服务" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['etc_service', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="ETC卡号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['etc_no', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="充值卡类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['card_type', { initialValue: 1, rules: [{ required: true }] }]"
                style="width: 100%"
              >
                <a-select-option :value="1">储值卡</a-select-option>
                <a-select-option :value="2">记账卡</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="卡状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['state', { initialValue: 1, rules: [{ required: true }] }]" style="width: 100%">
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">有卡挂起</a-select-option>
                <a-select-option :value="3">无卡挂起</a-select-option>
                <a-select-option :value="4">有卡注销</a-select-option>
                <a-select-option :value="5">无卡注销</a-select-option>
                <a-select-option :value="6">卡挂失</a-select-option>
                <a-select-option :value="7">补办</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="创建时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['pb_date', { rules: [{ required: false }] }]" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="11">
            <a-form-item label="修改时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['up_date', { rules: [{ required: false }] }]" disabled />
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
export default {
  name: 'StepByStepModal',
  data() {
    return {
      labelCol: {
        xs: { span: 9 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 13 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    edit(record) {
      this.visible = true
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(
          pick(record, [
            'plate_no',
            'plate_color',
            'park_service',
            'car_type',
            'validity',
            'car_status',
            'etc_service',
            'etc_no',
            'card_type',
            'state',
            'pb_date',
            'up_date'
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
          console.log('values:', values)
          setTimeout(() => {
            this.confirmLoading = false
          }, 1500)
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
