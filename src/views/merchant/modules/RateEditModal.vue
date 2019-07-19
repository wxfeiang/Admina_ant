<template>
  <a-modal
    title="编辑费率"
    :width="840"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form v-show="record.rateType === 1" :form="form">
        <detail-list title="阶梯费率信息" />
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
              <a-input v-decorator="['id', { rules: [{ required: type }] }]" disabled />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="停车场id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
              <a-input v-decorator="['parkId', { rules: [{ required: type }] }]" disabled />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="type" v-show="showItem">
              <a-input v-decorator="['type', { rules: [{ required: type }] }]" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="免费时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['freeTime', { rules: [{ required: type }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="首次时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['firstTime', { rules: [{ required: type }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="首次金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['firstFee', { rules: [{ required: type }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="续费时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['renewTime', { rules: [{ required: type }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="续费金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['renewFee', { rules: [{ required: type }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="收费类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select v-decorator="['payType', { initialValue: 1, rules: [{ required: type }] }]" style="width: 100%">
                <a-select-option value="1">包月</a-select-option>
                <a-select-option value="2">员工</a-select-option>
                <a-select-option value="3">会员</a-select-option>
                <a-select-option value="4">临时</a-select-option>
                <a-select-option value="5">特殊</a-select-option>
                <a-select-option value="6">其他</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="费率状态" hasFeedback>
              <a-select v-decorator="['state', { initialValue: 1, rules: [{ required: type }] }]">
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">注销</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12"></a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="24">
            <a-form-item label="提前支付后允许的停车时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['timeOut', { rules: [{ required: type }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="24">
            <a-form-item label="超出允许停车时间后的收费金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['feeOut', { rules: [{ required: type }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="24">
            <a-form-item label="费率描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['description', { rules: [{ required: type }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <a-form v-show="record.rateType === 2" :form="form">
        <detail-list title="时长费率信息" />
        <a-row>
          <a-col>
            <a-form-item label="id" v-show="showItem">
              <a-input v-decorator="['id', { rules: [{ required: !type }] }]" disabled />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="停车场id" v-show="showItem">
              <a-input v-decorator="['parkId', { rules: [{ required: !type }] }]" disabled />
            </a-form-item>
          </a-col>
          <a-col>
            <a-form-item label="type" v-show="showItem">
              <a-input v-decorator="['rateType', { rules: [{ required: !type }] }]" disabled />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="8">
            <a-form-item label="收费时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['amTime', { rules: [{ required: !type }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="收费金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['amAmount', { rules: [{ required: !type }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="费率状态">
              <a-select v-decorator="['state', { initialValue: 1, rules: [{ required: !type }] }]">
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">注销</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="收费类型" v-show="false">
              <a-select
                v-decorator="['payType', { initialValue: 2, rules: [{ required: !type }] }]"
                :disabled="true"
                style="width: 100%"
              >
                <a-select-option value="2">员工</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-form-item label="费率描述">
              <a-textarea
                v-decorator="['description', { rules: [{ required: !type }] }]"
                :autosize="{ minRows: 6, maxRows: 6 }"
              ></a-textarea>
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
import DetailList from '@/components/tools/DetailList'
import notification from 'ant-design-vue/es/notification'
import { updateParkFee } from '@/api/park'
const DetailListItem = DetailList.Item
export default {
  name: 'ParkFeeEditModal',
  components: {
    DetailList,
    DetailListItem
  },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      showItem: false,
      confirmLoading: false,
      type: true,
      record: [],
      form: this.$form.createForm(this)
    }
  },
  methods: {
    edit(record) {
      console.log('edit record:  ' + JSON.stringify(record))
      this.record = record
      this.visible = true
      this.type = this.record.rateType === 1
      const {
        form: { setFieldsValue }
      } = this
      this.$nextTick(() => {
        setFieldsValue(
          pick(record, [
            'id',
            'parkId',
            'freeTime',
            'firstTime',
            'firstFee',
            'renewTime',
            'renewFee',
            'payType',
            'description',
            'timeOut',
            'feeOut',
            'amTime',
            'amAmount',
            'rateType'
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
          updateParkFee(values).then((res) => {
            if (res.status === 200) {
              notification.success({
                message: '编辑成功',
                description: '编辑停车场费率成功!'
              })
              this.visible = false
              this.$emit('onEditClose')
            } else {
              notification.error({
                message: '编辑失败',
                description: `${res.wrapperColreasonPhrase}`
              })
            }
            this.confirmLoading = false
          })
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
