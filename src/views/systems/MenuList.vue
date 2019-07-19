<template>
  <div>
    <a-row :gutter="8">
      <a-col :md="24" :lg="6">
        <a-card :bordered="false">
          <a-spin :spinning="treeLoading">
            <a-tree @expand="onExpand" @select="onSelect" :treeData="treeData"></a-tree>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="18">
        <a-card :bordered="false" v-show="showContent">
          <a-spin :spinning="detailLoading">
            <a-card :bordered="false">
              <detail-list :title="menuTitle">
                <a-tag color="blue" @click="handleMenuEdit(menuData)">编辑菜单</a-tag>
                <a-tag color="cyan" @click="handleMenuAdd()">新增子菜单</a-tag>
                <a-divider style="margin-bottom: 32px" />
                <detail-list-item term="菜单名称(中文)">{{ menuData.title }}</detail-list-item>
                <detail-list-item term="菜单名称">{{ menuData.name }}</detail-list-item>
                <detail-list-item term="菜单url">{{ menuData.path }}</detail-list-item>
                <detail-list-item term="vue页面">{{ menuData.component }}</detail-list-item>
                <detail-list-item term="菜单重定向">{{ menuData.redirect }}</detail-list-item>
                <detail-list-item term="是否隐藏">{{ menuData.hidden }}</detail-list-item>
                <detail-list-item term="是否隐藏子菜单">{{ menuData.hideChildrenInMenu }}</detail-list-item>
                <detail-list-item term="元信息-名称">{{ menuData.metaTitle }}</detail-list-item>
                <detail-list-item term="元信息-图标">{{ menuData.metaIcon }}</detail-list-item>
                <detail-list-item term="元信息-是否缓存">{{ menuData.metaKeepAlive }}</detail-list-item>
                <detail-list-item term="元信息-特殊隐藏">{{ menuData.metaHiddenHeaderContent }}</detail-list-item>
                <detail-list-item term="元信息-是否隐藏">{{ menuData.metaHidden }}</detail-list-item>
                <detail-list-item term="元信息-权限">{{ menuData.metaPermission }}</detail-list-item>
                <detail-list-item term="元信息-排序">{{ menuData.metaSort }}</detail-list-item>
                <detail-list-item term="菜单状态">{{ menuData.menuState }}</detail-list-item>
              </detail-list>
            </a-card>
          </a-spin>
          <menu-edit-modal ref="menuEditModal" @ok="handleMenuEdit" @onEditClose="onMenuEditClose" />
        </a-card>
        <a-card :bordered="false" v-show="showAdd">
          <a-form :form="menuForm">
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
                  <a-switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    v-decorator="['hidden', { initialValue: false }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="9">
                <a-form-item label="是否隐藏子菜单" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
                  <a-switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    v-decorator="['hide_children_in_menu', { initialValue: false }]"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-divider />
            <a-row type="flex" justify="space-around">
              <a-col :span="11">
                <a-form-item label="元信息-名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="['meta_title', { initialValue: '', rules: [{ required: true }] }]" />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="元信息-图标" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="['meta_icon', { initialValue: '', rules: [{ required: true }] }]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="start">
              <a-col :span="8">
                <a-form-item label="元信息-是否缓存" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
                  <a-switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    v-decorator="['meta_keep_alive', { initialValue: false }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="元信息-特殊隐藏" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
                  <a-switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    v-decorator="['meta_hidden_header_content', { initialValue: false }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="元信息-是否隐藏" :labelCol="tLabelCol" :wrapperCol="tWrapperCol">
                  <a-switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    v-decorator="['meta_hidden', { initialValue: false }]"
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
                  <a-input
                    v-decorator="['meta_permission', { initialValue: 'default', rules: [{ required: false }] }]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="元信息-排序" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-input v-decorator="['meta_sort', { initialValue: '', rules: [{ required: true }] }]" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-row type="flex" justify="space-around">
              <a-col :span="12">
                <a-form-item label="菜单状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <a-select
                    v-decorator="['menu_state', { initialValue: 1, rules: [{ required: true }] }]"
                    style="width: 100%"
                  >
                    <a-select-option :value="1">正常</a-select-option>
                    <a-select-option :value="2">注销</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12"></a-col>
            </a-row>
            <a-row type="flex" justify="space-around">
              <a-col :span="12">
                <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
                  <a-button key="cancel" style="margin-left: 8px" @click="cancelSave">取消</a-button>
                  <a-divider type="vertical" />
                  <a-button key="forward" :loading="confirmLoading" type="primary" @click="menuConfirm">保存</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import DetailList from '@/components/tools/DetailList'
import { mapGetters } from 'vuex'
import MenuEditModal from './modules/MenuEditModal'
import { MenuList, MenuAdd } from '@/api/menu'
const DetailListItem = DetailList.Item
export default {
  components: {
    DetailList,
    DetailListItem,
    MenuEditModal
  },
  data() {
    return {
      treeData: [],
      treeLoading: false,
      detailLoading: false,
      actionForm: this.$form.createForm(this),
      customStyle: 'border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      showContent: false,
      showAdd: false,
      // selectedItem: [],
      menuData: {},
      menuTitle: '',
      confirmLoading: false,
      menuForm: this.$form.createForm(this),
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
      parentId: ''
    }
  },
  mounted() {
    this.MenuList()
  },
  methods: {
    ...mapGetters(['mchId', 'roleId']),
    getTreeData(dataList) {
      // 取父节点
      let parentArr = dataList.filter((l) => l.parentId === 0)
      this.treeData = this.getTreeLink(dataList, parentArr)
    },
    // 这里处理没有children结构的数据
    getTreeLink(list, dataArr) {
      dataArr.map((pNode) => {
        let childObj = []
        list.map((cNode) => {
          if (pNode.id === cNode.parentId) {
            childObj.push(cNode)
          }
        })
        pNode.children = childObj
        if (childObj.length > 0) {
          this.getTreeLink(list, childObj)
        }
      })
      console.log('getTreeLink: ' + JSON.stringify(dataArr))
      return dataArr
    },
    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
      this.onSelect(checkedKeys, info)
    },
    onExpand(expandedKeys, expanded) {
      console.log('onExpand', expandedKeys)
      console.log('expanded', expanded.expanded)
    },
    onSelect(selectedKeys, info) {
      this.showContent = true
      this.showAdd = false
      console.log('selectedKeys', selectedKeys)
      console.log('onSelect', info.node.dataRef)
      this.menuTitle = info.node.dataRef.title
      this.menuData = info.node.dataRef
      this.parentId = info.node.dataRef.id
      // this.selectedItem.push(info.node.dataRef.id)
    },
    handleMenuEdit(itemData) {
      itemData.hidden = itemData.hidden === 'true' ? true : false
      itemData.hideChildrenInMenu = itemData.hideChildrenInMenu === 'true' ? true : false
      itemData.metaKeepAlive = itemData.metaKeepAlive === 'true' ? true : false
      itemData.metaHiddenHeaderContent = itemData.metaHiddenHeaderContent === 'true' ? true : false
      itemData.metaHidden = itemData.metaHidden === 'true' ? true : false
      this.$refs.menuEditModal.edit(itemData)
    },
    handleMenuAdd() {
      this.showContent = false
      this.showAdd = true
    },
    onMenuEditClose() {
      this.MenuList()
    },
    cancelSave() {
      this.showAdd = false
      this.showContent = true
    },
    menuConfirm(e) {
      e.preventDefault()
      this.menuForm.validateFields((err, values) => {
        if (!err) {
          values.parent_id = this.parentId
          console.log('menuAddConfirm values:', values)
          this.menuAdd(values)
        } else {
          this.confirmLoading = false
        }
      })
    },
    async MenuList(iparams) {
      this.treeLoading = true
      try {
        let iReturn = await MenuList(iparams)
        if (iReturn.status === 200 && iReturn.data) {
          // this.getTreeData(iReturn.data)
          this.treeData = iReturn.data
        }
        this.treeLoading = false
      } catch (err) {
        this.treeLoading = false
        this.$notification.error({
          message: '获取菜单失败',
          description: `${err.reasonPhrase}`
        })
      }
    },
    async menuAdd(iparams) {
      this.confirmLoading = true
      try {
        let iReturn = await MenuAdd(iparams)
        if (iReturn.status === 200 && iReturn.data === '1') {
          this.$notification.success({
            message: '新增菜单成功',
            description: '新增菜单成功!'
          })
          this.confirmLoading = false
          this.showAdd = false
          this.showContent = true
          this.MenuList()
        } else {
          this.confirmLoading = false
          this.$notification.error({
            message: '新增菜单失败',
            description: `${iReturn.reasonPhrase}`
          })
        }
      } catch (err) {
        this.confirmLoading = false
        this.$notification.error({
          message: '新增菜单失败',
          description: `${err.reasonPhrase}`
        })
      }
    }
  }
}
</script>
