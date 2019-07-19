<template>
  <a-modal
    title="编辑车辆信息"
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
            <a-form-item label="id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="itemShow">
              <a-input v-decorator="['id', { rules: [{ required: true }] }]" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="userId" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="itemShow">
              <a-input v-decorator="['userId', { rules: [{ required: true }] }]" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="车牌号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['plateNo', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="车牌颜色" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['plateColor', { initialValue: 0, rules: [{ required: true }] }]">
                <a-select-option :value="0">蓝色</a-select-option>
                <a-select-option :value="1">其他</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="停车场服务" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['parkService', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="车辆类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['carType', { initialValue: 1, rules: [{ required: true }] }]">
                <a-select-option :value="1">普通车辆</a-select-option>
                <a-select-option :value="2">ETC车辆</a-select-option>
                <a-select-option :value="3">公务车辆</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
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
          <a-col :span="12">
            <a-form-item label="车辆状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['carStatus', { initialValue: 1, rules: [{ required: true }] }]"
                style="width: 100%"
              >
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">删除</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="ETC服务" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['etcService', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="ETC卡号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['etcNo', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="ETC卡类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['mcard', { initialValue: 1, rules: [{ required: true }] }]" style="width: 100%">
                <a-select-option :value="1">主卡</a-select-option>
                <a-select-option :value="2">副卡</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="机构编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['orgId', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="充值卡类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['cardType', { initialValue: 22, rules: [{ required: true }] }]"
                style="width: 100%"
              >
                <a-select-option :value="22">储值卡</a-select-option>
                <a-select-option :value="23">记账卡</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
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
          <a-col :span="12">
            <a-form-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['mobile', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否包月" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['ifMonthly', { initialValue: 0, rules: [{ required: true }] }]"
                style="width: 100%"
              >
                <a-select-option :value="0">否</a-select-option>
                <a-select-option :value="1">是</a-select-option>
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
import moment from 'moment'
import notification from 'ant-design-vue/es/notification'
import { CarEdit } from '@/api/car'
export default {
  name: 'CarEditModal',
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      itemShow: false,
      labelCol: {
        xs: { span: 9 },
        sm: { span: 9 }
      },
      wrapperCol: {
        xs: { span: 13 },
        sm: { span: 13 }
      },
      config: { rules: [{ required: true, message: '请选择包月周期!' }] },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    moment,
    edit(record) {
      this.visible = true
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(
          pick(record, [
            'id',
            'userId',
            'plateNo',
            'plateColor',
            'parkService',
            'etcService',
            'carType',
            'validity',
            'carStatus',
            'etcNo',
            'orgId',
            'mobile',
            'cardType',
            'state',
            'ifMonthly',
            'mcard',
            'mstartDate',
            'mendDate',
            'pbDate',
            'upDate'
          ])
        )
      })
    },
    onSDataChange(date, dateString) {
      console.log(date, dateString)
    },
    onEDataChange(date, dateString) {
      console.log(date, dateString)
    },
    handleConfirm() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          const allValues = {
            ...values,
            mstartDate: values['mstartDate'].format('YYYY-MM-DD'),
            mendDate: values['mendDate'].format('YYYY-MM-DD')
          }
          console.log('values:', allValues)
          this.carEdit(allValues)
          this.$emit('onClose')
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    async carEdit(iparams) {
      try {
        let iReturn = await CarEdit(iparams)
        this.confirmLoading = false
        if (iReturn.status === 200 && iReturn.data === 1) {
          notification.success({
            message: '编辑车辆信息成功',
            description: '编辑车辆信息成功!'
          })
          this.visible = false
        } else {
          notification.error({
            message: '编辑车辆信息失败',
            description: `${iReturn.data}`
          })
        }
      } catch (err) {
        notification.error({
          message: '编辑车辆信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
