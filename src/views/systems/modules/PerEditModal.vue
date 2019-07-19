<template>
  <a-modal title="编辑权限" :width="800" centered :visible="visible" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item label="权限id" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="showItem">
          <a-input v-decorator="['id', { initialValue: '', rules: [{ required: false }] }]" />
        </a-form-item>
        <a-form-item label="权限识别码" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="权限识别码(英文大小写)"
            v-decorator="['pCode', { rules: [{ required: true, message: '请输入权限识别码' }] }]"
          />
        </a-form-item>
        <a-form-item label="权限名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input
            placeholder="权限名称"
            v-decorator="['pName', { rules: [{ required: true, message: '请输入权限名称' }] }]"
          />
        </a-form-item>
        <a-form-item label="关联菜单" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['mId', { rules: [{ required: true, message: '请选择关联菜单' }] }]">
            <a-select-option v-for="(menu, index) in menuSelectList" :key="index" :value="menu.id">
              {{ menu.title }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="权限描述" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-textarea
            placeholder="权限描述"
            :rows="5"
            v-decorator="['pDesc', { rules: [{ required: false, message: '请输入权限描述' }] }]"
          />
        </a-form-item>
        <a-form-item label="权限状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select v-decorator="['pState', { initialValue: 1, rules: [{ required: true }] }]">
            <a-select-option :value="1">正常</a-select-option>
            <a-select-option :value="2">注销</a-select-option>
          </a-select>
        </a-form-item>
        <a-divider />
        <a-form-item label="权限粒度" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
            mode="multiple"
            :allowClear="true"
            v-decorator="['pAttr', { rules: [{ required: true, message: '请选择权限粒度' }] }]"
          >
            <a-select-option v-for="(action, index) in permissionList" :key="index" :value="action.id">
              {{ action.gName }}
            </a-select-option>
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
import { PerEdit } from '@/api/permission'
export default {
  name: 'MenuEditModal',
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
      form: this.$form.createForm(this),
      permissionList: [],
      menuSelectList: []
    }
  },
  methods: {
    edit(record) {
      this.visible = true
      this.permissionList = record.permissionList
      this.menuSelectList = record.menuSelectList
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, ['id', 'pCode', 'pName', 'mId', 'pState', 'pDesc', 'pAttr']))
      })
    },
    handleConfirm() {
      const {
        form: { validateFields }
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
        let iReturn = await PerEdit(iparams)
        this.confirmLoading = false
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.$notification.success({
            message: '成功',
            description: '修改权限信息成功!'
          })
          this.visible = false
          this.$emit('onEditClose')
        } else {
          this.$notification.error({
            message: '编辑权限信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '编辑权限信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
