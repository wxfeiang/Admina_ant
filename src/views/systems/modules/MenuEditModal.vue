<template>
  <a-modal title="编辑菜单" :width="800" centered :visible="visible" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :Gutter="48" type="flex" justify="space-around" v-show="showItem">
          <a-col :span="12">
            <a-form-item label="菜单id" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['id', { initialValue: '', rules: [{ required: false }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12"></a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="菜单名称(中文)" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['title', { initialValue: '', rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="菜单名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', { initialValue: '', rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="菜单url" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['path', { initialValue: '', rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="vue页面" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['component', { initialValue: '', rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="菜单重定向" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['redirect', { initialValue: '', rules: [{ required: false }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12"></a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="15">
            <a-form-item label="是否隐藏" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
              <a-switch checkedChildren="是" unCheckedChildren="否" v-decorator="['hidden', { initialValue: false }]" />
            </a-form-item>
          </a-col>
          <a-col :span="9">
            <a-form-item label="是否隐藏子菜单" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
              <a-switch
                checkedChildren="是"
                unCheckedChildren="否"
                v-decorator="['hideChildrenInMenu', { initialValue: false }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider />
        <a-row type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="元信息-名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['metaTitle', { initialValue: '', rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="元信息-图标" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['metaIcon', { initialValue: '', rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="start">
          <a-col :span="8">
            <a-form-item label="元信息-是否缓存" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
              <a-switch
                checkedChildren="是"
                unCheckedChildren="否"
                v-decorator="['metaKeepAlive', { initialValue: false }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="元信息-特殊隐藏" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
              <a-switch
                checkedChildren="是"
                unCheckedChildren="否"
                v-decorator="['metaHiddenHeaderContent', { initialValue: false }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="元信息-是否隐藏" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
              <a-switch
                checkedChildren="是"
                unCheckedChildren="否"
                v-decorator="['metaHidden', { initialValue: false }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="11"> </a-col>
          <a-col :span="12"> </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="11">
            <a-form-item label="元信息-权限" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['metaPermission', { rules: [{ required: false }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="元信息-排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['metaSort', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="菜单状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-select
                v-decorator="['menuState', { initialValue: 1, rules: [{ required: true }] }]"
                style="width: 100%"
              >
                <a-select-option :value="1">正常</a-select-option>
                <a-select-option :value="2">注销</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12"></a-col>
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
import { MenuEdit } from '@/api/menu'
export default {
  name: 'MenuEditModal',
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
      tLabelCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      },
      tWrapperCol: {
        xs: { span: 12 },
        sm: { span: 12 }
      },
      showItem: false,
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
            'id',
            'title',
            'name',
            'path',
            'component',
            'redirect',
            'hidden',
            'hideChildrenInMenu',
            'metaTitle',
            'metaIcon',
            'metaKeepAlive',
            'metaHiddenHeaderContent',
            'metaHidden',
            'metaPermission',
            'metaSort',
            'menuState'
          ])
        )
      })
    },
    handleConfirm() {
      const {
        form: { validateFields }
      } = this
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          console.log('values:', values)
          this.menuUpdate(values)
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    async menuUpdate(iparams) {
      this.confirmLoading = true
      try {
        let iReturn = await MenuEdit(iparams)
        this.confirmLoading = false
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.$notification.success({
            message: '编辑菜单信息成功',
            description: '修改菜单信息成功!'
          })
          this.visible = false
          this.$emit('onEditClose')
        } else {
          this.$notification.error({
            message: '编辑菜单信息失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.$notification.error({
          message: '编辑菜单信息失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
