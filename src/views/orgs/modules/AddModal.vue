<template>
  <a-modal
    title="新增机构"
    :width="840"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="机构编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['orgId', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="机构名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['orgName', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="联系方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['title', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['contact', { rules: [{ required: true }] }]" />
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
import notification from 'ant-design-vue/es/notification'
import { OrgAdd } from '@/api/org'

export default {
  name: 'OrgAddModal',
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
    add() {
      this.visible = true
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
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          console.log('values', values)
          this.orgAdd(values)
          this.$emit('onClose')
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    async orgAdd(iparams) {
      try {
        let iReturn = await OrgAdd(iparams)
        this.confirmLoading = false
        if (iReturn.status === 200 && iReturn.data === 1) {
          notification.success({
            message: '新增机构信息成功',
            description: '新增机构信息成功!'
          })
          this.visible = false
        } else {
          notification.error({
            message: '新增机构信息失败',
            description: `${iReturn.data}`
          })
        }
      } catch (err) {
        notification.error({
          message: '新增机构信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
