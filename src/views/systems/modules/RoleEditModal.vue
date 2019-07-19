<template>
  <a-modal title="编辑角色" :width="800" centered :visible="visible" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="rEditForm">
        <a-form-item label="角色id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
          <a-input v-decorator="['id', { initialValue: '', rules: [{ required: false }] }]" />
        </a-form-item>
        <a-form-item label="角色识别码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="识别码(英文大小写)"
            v-decorator="['rCode', { rules: [{ required: true, message: '请输入角色识别码' }] }]"
          />
        </a-form-item>
        <a-form-item label="角色名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="角色名称"
            v-decorator="['rName', { rules: [{ required: true, message: '请输入角色名称' }] }]"
          />
        </a-form-item>
        <a-form-item label="关联权限" :labelCol="labelCol" :wrapperCol="wrapperCol">
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
        <a-form-item label="角色描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            placeholder="角色描述"
            :rows="5"
            v-decorator="['rDesc', { rules: [{ required: false, message: '请输入角色描述' }] }]"
          />
        </a-form-item>
        <a-form-item label="角色状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['rState', { initialValue: 1, rules: [{ required: true }] }]">
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
import { RoleEdit } from '@/api/role'
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
      rEditForm: this.$form.createForm(this),
      perSelectList: []
    }
  },
  methods: {
    edit(record) {
      this.visible = true
      this.perSelectList = record.perSelectList
      this.$nextTick(() => {
        this.rEditForm.setFieldsValue(pick(record, ['id', 'rCode', 'pId', 'rName', 'rState', 'rDesc', 'rState']))
      })
    },
    handleConfirm() {
      const {
        rEditForm: { validateFields }
      } = this
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          this.perUpdate(values)
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    async perUpdate(iparams) {
      this.confirmLoading = true
      try {
        let iReturn = await RoleEdit(iparams)
        this.confirmLoading = false
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.$notification.success({
            message: '成功',
            description: '修改角色信息成功!'
          })
          this.visible = false
          this.$emit('onEditClose')
        } else {
          this.$notification.error({
            message: '编辑角色信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '编辑角色信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
