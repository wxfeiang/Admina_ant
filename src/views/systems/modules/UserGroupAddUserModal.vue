<template>
  <a-modal :title="groupData.name" :width="800" centered :visible="visible" @cancel="handleCancel">
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="24">
        <a-spin :spinning="showLoading">
          <a-alert message="一个用户只能关联三个用户组!" banner style="margin-bottom: 10px;" />
          <a-transfer
            :titles="['可添加用户', '已添加用户']"
            :dataSource="listData"
            showSearch
            :listStyle="{
              width: '320px',
              height: '300px'
            }"
            :operations="['添加用户', '移除用户']"
            :filterOption="filterOption"
            :targetKeys="targetKeys"
            @change="handleChange"
            @search="handleSearch"
            :render="renderItem"
          >
            <span slot="notFoundContent">
              无数据
            </span>
          </a-transfer>
        </a-spin>
      </a-col>
    </a-row>

    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" type="primary" :loading="confirmLoading" @click="handleConfirm">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
import { UserGroupUserList, UserGroupLinkUser } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'UserGroupAddUserModal',
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
      visible: false,
      showLoading: true,
      confirmLoading: false,
      groupData: {
        id: '0',
        name: '用户组'
      },
      listData: [],
      targetKeys: [],
      hasFull: []
    }
  },
  methods: {
    ...mapGetters(['mchId', 'userInfo']),
    async getUserLinks() {
      let that = this
      let targetKeys = []
      let tmpData = []
      let iReturn = []
      try {
        let iparams = {
          mchId: this.mchId()
        }
        iReturn = await UserGroupUserList(iparams)
      } catch (err) {
        this.showLoading = false
        console.log('err: ' + JSON.stringify(err))
        this.$notification.error({
          message: '获取关联用户失败',
          description: `获取关联用户失败`
        })
      }
      if (iReturn.status === 200 && iReturn.data.length > 0) {
        for (let item of iReturn.data) {
          let itemData = {
            key: item.id.toString(),
            title: item.userName,
            description: item.userName,
            chosen: item.isGroup,
            group: 0
          }
          if (itemData.chosen > 0) {
            let gName = []
            item.group.map((every) => {
              gName.push(every.gName)
              if (every.gId === that.groupData.id) {
                targetKeys.push(item.id.toString())
              }
            })
            // let isExist = item.group.filter((item) => item.gId === that.groupData.id)
            itemData.description += `【${gName.join(' | ')}】`
            itemData.group = item.isGroup
            // console.log(JSON.stringify('isExist: ' + JSON.stringify(isExist)))
            // isExist.length > 0 ? targetKeys.push(isExist.gId.toString()) : ''
            console.log(JSON.stringify('targetKeys: ' + JSON.stringify(targetKeys)))
            // targetKeys.push(itemData.key)
          }
          tmpData.push(itemData)
        }
        this.visible = true
        this.listData = tmpData
        this.targetKeys = targetKeys
      } else {
        this.$notification.error({
          message: '请增加用户后,进行关联',
          description: `商户下没有用户`
        })
      }
      this.showLoading = false
    },
    filterOption(inputValue, option) {
      return option.description.indexOf(inputValue) > -1
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys)
      this.targetKeys = targetKeys
    },
    handleSearch(dir, value) {
      console.log('search:', dir, value)
    },
    renderItem(item) {
      const customLabel = <span class="custom-item">{item.description}</span>
      return {
        label: customLabel,
        value: item.title
      }
    },
    edit(record) {
      this.groupData.id = record.gId || '0'
      this.groupData.name = record.gName || '用户组'
      this.getUserLinks()
    },
    handleCancel() {
      this.visible = false
    },
    async handleConfirm() {
      this.confirmLoading = true
      console.log('groupId:  ' + this.groupData.id)
      console.log('targetKeys:  ' + JSON.stringify(this.targetKeys))
      console.log('有组: ' + JSON.stringify(this.listData))
      let tmpData = []
      this.targetKeys.map((item) => {
        this.listData.map((every) => {
          if (item === every.key && every.group > 3) {
            const ttd = `${every.description}已经加入3个组了!`
            tmpData.push(ttd)
          }
        })
      })
      console.log('tmp:   ' + JSON.stringify(tmpData))
      if (tmpData.length > 0) {
        this.$message.warning(`${JSON.stringify(tmpData)}`)
        return
      }
      try {
        let iparams = {
          gId: this.groupData.id,
          uIds: this.targetKeys,
          operaId: this.userInfo().id,
          isDefault: 0
        }
        console.log('iparams: ' + JSON.stringify(iparams))
        let iReturn = await UserGroupLinkUser(iparams)
        if (iReturn.status === 200 && iReturn.data) {
          this.confirmLoading = false
          this.visible = false
        } else {
          this.confirmLoading = false
          this.$notification.error({
            message: '关联用户失败',
            description: `关联用户失败`
          })
        }
      } catch (err) {
        this.confirmLoading = false
        console.log('err: ' + JSON.stringify(err))
        this.$notification.error({
          message: '关联用户异常',
          description: `关联用户异常`
        })
      }
    }
  }
}
</script>
