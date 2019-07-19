<template>
  <div>
    <a-row :gutter="8">
      <a-col :md="24" :lg="8">
        <a-card :bordered="false">
          <a-row type="flex" justify="space-around">
            <a-col :md="24" :lg="24">
              <a-tag color="#108ee9" @click="handleMchAdd()">新增商户</a-tag>
            </a-col>
          </a-row>
          <a-divider />
          <a-spin :spinning="treeLoading">
            <a-tree autoExpandParent @expand="onExpand" showIcon @select="onSelect" :treeData="treeData">
              <a-icon slot="shop" type="shop" theme="twoTone" />
              <a-icon slot="car" type="car" theme="twoTone" twoToneColor="#eb2f96" />
              <a-icon slot="dollar" type="dollar" theme="twoTone" twoToneColor="#52c41a" />
            </a-tree>
          </a-spin>
        </a-card>
      </a-col>
      <a-col :md="24" :lg="16">
        <a-card :bordered="false" v-show="showContent">
          <div>
            <div v-show="showMch">
              <a-spin :spinning="mchLoading">
                <a-card :bordered="false">
                  <detail-list title="商户信息">
                    <a-tag color="cyan" @click="handleMchAdd()">新增商户</a-tag>
                    <a-tag color="blue" @click="handleMchEdit()">编辑商户</a-tag>
                    <a-tag color="green" @click="handleMchParkAdd(merchantData, 'mch')">新增停车场</a-tag>
                    <a-divider style="margin-bottom: 32px" />
                    <detail-list-item term="商户名称">{{ merchantData.name }}</detail-list-item>
                    <detail-list-item term="营业执照">{{ merchantData.path }}</detail-list-item>
                    <detail-list-item term="商户地址">{{ merchantData.address }}</detail-list-item>
                    <detail-list-item term="省份">{{ merchantData.province }}</detail-list-item>
                    <detail-list-item term="城市">{{ merchantData.city }}</detail-list-item>
                    <detail-list-item term="区域">{{ merchantData.district }}</detail-list-item>
                    <detail-list-item term="联系人">{{ merchantData.userName }}</detail-list-item>
                    <detail-list-item term="联系人电话">{{ merchantData.phone }}</detail-list-item>
                    <detail-list-item term="联系人邮箱">{{ merchantData.email }}</detail-list-item>
                    <detail-list-item term="商户状态">{{ merchantData.state | parkStateFilters }}</detail-list-item>
                    <detail-list-item term="注册时间">{{ merchantData.pbDate }}</detail-list-item>
                    <detail-list-item term="更新时间">{{ merchantData.upDate }}</detail-list-item>
                  </detail-list>
                </a-card>
              </a-spin>
              <a-card>
                <a-spin :spinning="pTableLoading">
                  <a-table
                    row-key="id"
                    size="small"
                    :columns="mpColumns"
                    :dataSource="parkTableData"
                    :pagination="{ pageSize: 10 }"
                  ></a-table>
                </a-spin>
              </a-card>
              <mch-edit-modal ref="merchantEditModal" @ok="handleMchEdit" @onEditClose="onMchEditClose" />
            </div>
            <div v-show="showPark">
              <a-card :bordered="false">
                <a-spin :spinning="parkLoading">
                  <detail-list title="停车场信息">
                    <a-tag color="cyan" @click="handleParkAdd(parkData, 'park')">新增停车场</a-tag>
                    <a-tag color="blue" @click="handleParkEdit(parkData)">编辑停车场</a-tag>
                    <a-tag color="green" @click="handleRateAdd(parkData)">新增停车场费率</a-tag>
                    <a-divider style="margin-bottom: 32px" />
                    <detail-list-item term="停车场">{{ parkData.name }}</detail-list-item>
                    <detail-list-item term="停车场地址">{{ parkData.address }}</detail-list-item>
                    <detail-list-item term="车位数">{{ parkData.num }}</detail-list-item>
                    <detail-list-item term="联系人">{{ parkData.contact }}</detail-list-item>
                    <detail-list-item term="联系人电话">{{ parkData.tel }}</detail-list-item>
                    <detail-list-item term="经度">{{ parkData.lat }}</detail-list-item>
                    <detail-list-item term="纬度">{{ parkData.lng }}</detail-list-item>
                    <detail-list-item term="状态">{{ parkData.state | parkStateFilters }}</detail-list-item>
                  </detail-list>
                </a-spin>
              </a-card>
              <a-card title="阶梯费率">
                <a-spin :spinning="pTableLoading">
                  <a-table
                    row-key="id"
                    size="small"
                    :columns="mpfColumns1"
                    :dataSource="rateTableData1"
                    :pagination="{ pageSize: 10 }"
                  >
                    <span slot="state" slot-scope="text">
                      {{ text | parkStateFilters }}
                    </span>
                  </a-table>
                </a-spin>
              </a-card>
              <a-card title="时长费率">
                <a-spin :spinning="pTableLoading">
                  <a-table
                    row-key="id"
                    size="small"
                    :columns="mpfColumns2"
                    :dataSource="rateTableData2"
                    :pagination="{ pageSize: 10 }"
                  >
                    <span slot="state" slot-scope="text">
                      {{ text | parkStateFilters }}
                    </span>
                  </a-table>
                </a-spin>
              </a-card>
              <park-edit-modal ref="parkEditModal" @ok="handleParkEdit" @onEditClose="onParkEditClose" />
            </div>
            <div v-show="showFee">
              <a-spin :spinning="parkFeeLoading">
                <detail-list v-show="rateData.rateType === 1" title="停车场阶梯费率信息">
                  <a-tag color="cyan" @click="handleRateAdd(rateData)">新增停车场费率</a-tag>
                  <a-tag color="blue" @click="handleRateEdit(rateData)">编辑停车场费率</a-tag>
                  <a-divider style="margin-bottom: 32px" />
                  <detail-list-item term="免费时长">{{ rateData.freeTime }}</detail-list-item>
                  <detail-list-item term="首次时长">{{ rateData.firstTime }}</detail-list-item>
                  <detail-list-item term="首次金额">{{ rateData.firstFee }}</detail-list-item>
                  <detail-list-item term="续费时长">{{ rateData.renewTime }}</detail-list-item>
                  <detail-list-item term="续费金额">{{ rateData.renewFee }}</detail-list-item>
                  <detail-list-item term="收费类型">{{ rateData.payType }}</detail-list-item>
                  <detail-list-item term="提前支付后允许的停车时间">{{ rateData.timeOut }}</detail-list-item>
                  <detail-list-item term="超出允许停车时间后的收费金额">{{ rateData.feeOut }}</detail-list-item>
                  <detail-list-item term="费率描述">{{ rateData.description }}</detail-list-item>
                </detail-list>
                <detail-list v-show="rateData.rateType === 2" title="停车场时长费率信息">
                  <a-tag color="cyan" @click="handleRateAdd(rateData)">新增停车场费率</a-tag>
                  <a-tag color="blue" @click="handleRateEdit(rateData)">编辑停车场费率</a-tag>
                  <a-divider style="margin-bottom: 32px" />
                  <detail-list-item term="收费时长">{{ rateData.amTime }}</detail-list-item>
                  <detail-list-item term="收费金额">{{ rateData.amAmount }}</detail-list-item>
                  <detail-list-item term="费率描述">{{ rateData.description }}</detail-list-item>
                </detail-list>
                <a-divider />
                <detail-list title="导入用户信息关联停车场费率" />
                <a href="/用户关联停车场费率.xlsx">下载导入模板</a>
                <a-divider type="vertical" />
                <a-upload
                  @change="handleChange"
                  :customRequest="importFile"
                  :fileList="fileList"
                  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                >
                  <a-button type="primary" :loading="confirmLoading">导入用户</a-button>
                </a-upload>
                <a-divider />
                <a-alert type="error" message="数据解析有误,请确认数据正确并重新导入!" banner v-show="showErrMsg" />
                <a-table :columns="columns" :dataSource="excelData"></a-table>
              </a-spin>
              <rate-edit-modal ref="rateEditModal" @ok="handleRateEdit" @onEditClose="onRateEditClose" />
            </div>
          </div>
        </a-card>
        <a-card :bordered="false" v-show="showRouter">
          <mpr-add
            :id="toChildId"
            :type="toChildType"
            :showMer="showChildMer"
            :showPark="showChildPark"
            :showParkFee="showChildParkFee"
            :showDefaultFee="showDefaultFee"
            :showImport="showChildImport"
            @cancelSave="cancelSave"
            @saveOk="saveOk"
            @saveThen="saveThen"
          ></mpr-add>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import DetailList from '@/components/tools/DetailList'
import MprAdd from '@/components/MprAdd'
import { mapGetters } from 'vuex'
import { MerchantDetail, MchParkRateList } from '@/api/merchant'
import { getParkDetail, getParkFeeDetail, getParkList, getParkFeeInfo } from '@/api/park'
import notification from 'ant-design-vue/es/notification'
import MchEditModal from './modules/MchEditModal'
import ParkEditModal from './modules/ParkEditModal'
import XLSX from 'xlsx'
import { MprAddUser } from '@/api/mpr'
import RateEditModal from './modules/RateEditModal'
const DetailListItem = DetailList.Item
const parkState = {
  1: {
    text: '正常'
  },
  2: {
    text: '注销'
  }
}
export default {
  components: {
    DetailList,
    DetailListItem,
    MchEditModal,
    ParkEditModal,
    RateEditModal,
    MprAdd
  },
  filters: {
    parkStateFilters(type) {
      return parkState[type] ? parkState[type].text : ''
    }
  },
  data() {
    return {
      actionForm: this.$form.createForm(this),
      customStyle: 'border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      showContent: false,
      showRouter: false,
      showMch: false,
      showPark: false,
      showFee: false,
      selectedKeys: [],
      treeData: [],
      merchantData: {},
      parkData: {},
      rateData: {},
      fileList: [],
      parkTableData: [],
      rateTableData1: [],
      rateTableData2: [],
      treeLoading: false,
      mchLoading: false,
      parkLoading: false,
      parkFeeLoading: false,
      pTableLoading: false,
      showChildMer: true,
      showChildPark: false,
      showChildParkFee: false,
      showDefaultFee: false,
      showChildImport: false,
      toChildId: '',
      toChildType: '',
      parkId: '',
      rateId: '',
      queryParam: {
        pageSize: 10,
        pageNo: 1
      },
      columns: [
        {
          title: '姓名',
          dataIndex: 'userName',
          key: 'userName'
        },
        {
          title: '车牌号',
          dataIndex: 'plateNo',
          key: 'plateNo'
        },
        {
          title: '车牌颜色',
          dataIndex: 'plateColor',
          key: 'plateColor'
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          key: 'mobile'
        }
      ],
      // 表头
      mpColumns: [
        {
          title: '停车场',
          dataIndex: 'name'
        },
        {
          title: '车位总数',
          dataIndex: 'num'
        },
        {
          title: '联系人',
          dataIndex: 'contact'
        },
        {
          title: '联系人手机号',
          dataIndex: 'tel'
        },
        {
          title: '状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      mpfColumns1: [
        {
          title: '免费时长(秒)',
          dataIndex: 'freeTime'
        },
        {
          title: '首次时长(秒)',
          dataIndex: 'firstTime'
        },
        {
          title: '首次金额(分)',
          dataIndex: 'firstFee'
        },
        {
          title: '续费时长(秒)',
          dataIndex: 'renewTime'
        },
        {
          title: '续费金额(分)',
          dataIndex: 'renewFee'
        },
        {
          title: '收费类型',
          dataIndex: 'payType'
        },
        {
          title: '费率状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '提前支付后允许的停车时间(秒)',
          dataIndex: 'timeOut'
        },
        {
          title: '超出允许停车时间后的收费金额(分)',
          dataIndex: 'feeOut'
        },
        {
          title: '费率描述',
          dataIndex: 'description'
        }
      ],
      mpfColumns2: [
        {
          title: '收费时长(小时)',
          dataIndex: 'amTime'
        },
        {
          title: '收费金额',
          dataIndex: 'amAmount'
        },
        {
          title: '费率状态',
          dataIndex: 'state',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '收费类型',
          dataIndex: 'payType'
        },
        {
          title: '费率描述',
          dataIndex: 'description'
        }
      ],
      showErrMsg: false,
      confirmLoading: false,
      excelData: [],
      selectedRowKeys: [],
      selectedRows: [],
      // custom table alert & rowSelection
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  mounted() {
    this.getMchParkRateList()
  },
  methods: {
    handleChange(info) {
      this.fileList =info.fileList
      if (info.fileList.length === 0) {
        this.excelData = []
      }
      if (info.fileList.length > 0) {
        info.file.status = 'done'
      }
    },
    asignTree(pData) {
      let mchList = pData.mchList
      let parkList = pData.parkList
      let rateList = pData.rateList
      for (let mchItem of mchList) {
        mchItem.key = mchItem.id
        mchItem.title = mchItem.name
        mchItem.type = 'mch'
        mchItem.slots = { icon: 'shop' }
        mchItem.children = []
        for (let parkItem of parkList) {
          parkItem.title = parkItem.name
          parkItem.type = 'park'
          parkItem.slots = { icon: 'car' }
          parkItem.key = `${mchItem.id}-${parkItem.park_id}`
          parkItem.children = []
          if (mchItem.id === parkItem.parentId) {
            mchItem.children.push(parkItem)
          }
          for (let rateItem of rateList) {
            rateItem.title = rateItem.name
            rateItem.type = 'rate'
            rateItem.slots = { icon: 'dollar' }
            rateItem.key = `${mchItem.id}-${parkItem.park_id}-${rateItem.id}`
            if (parkItem.park_id === rateItem.parentId) {
              parkItem.children.push(rateItem)
            }
          }
        }
      }
      this.treeData = mchList
    },
    asignPark(pData) {
      let parkList = pData.parkList
      let rateList = pData.rateList
      for (let parkItem of parkList) {
        parkItem.title = parkItem.name
        parkItem.type = 'park'
        parkItem.slots = { icon: 'car' }
        parkItem.key = `${parkItem.park_id}`
        parkItem.children = []
        for (let rateItem of rateList) {
          rateItem.title = rateItem.description
          rateItem.type = 'rate'
          rateItem.slots = { icon: 'dollar' }
          rateItem.key = `${parkItem.park_id}-${rateItem.id}`
          if (parkItem.park_id === rateItem.parentId) {
            parkItem.children.push(rateItem)
          }
        }
      }
      this.asignMch(parkList, pData)
    },
    asignMch(parkData, orignData) {
      let mchList = orignData.mchList
      for (let mchItem of mchList) {
        mchItem.key = mchItem.id
        mchItem.title = mchItem.name
        mchItem.type = 'mch'
        mchItem.slots = { icon: 'shop' }
        mchItem.children = []
        for (let parkItem of parkData) {
          parkItem.title = parkItem.name
          parkItem.type = 'park'
          parkItem.slots = { icon: 'car' }
          parkItem.key = `${mchItem.id}-${parkItem.park_id}`
          if (mchItem.id === parkItem.parentId) {
            mchItem.children.push(parkItem)
          }
        }
      }
      this.treeData = mchList
    },
    ...mapGetters(['userInfo', 'roleId']),
    onExpand(expandedKeys, expanded) {
      console.log('onExpand', expandedKeys)
      console.log('expanded', expanded.expanded)
    },
    onSelect(selectedKeys, info) {
      this.showContent = true
      console.log('onSelect', info.node.dataRef)
      this.showMch = true
      if (info.node.dataRef.type === 'mch') {
        this.mchLoading = true
        this.getMerchantDetail(info.node.dataRef.id)
        this.showContent = true
        this.showRouter = false
        this.showMch = true
        this.showPark = false
        this.showFee = false
      }
      if (info.node.dataRef.type === 'park') {
        this.parkLoading = true
        this.getParkDetail(info.node.dataRef.park_id)
        this.showContent = true
        this.showRouter = false
        this.showMch = false
        this.showPark = true
        this.showFee = false
      }
      if (info.node.dataRef.type === 'rate') {
        this.parkFeeLoading = true
        this.getParkFeeInfo(info.node.dataRef.id)
        this.showContent = true
        this.showRouter = false
        this.showMch = false
        this.showPark = false
        this.showFee = true
      }
    },
    async loadParkData(param) {
      let iparams = {
        mchId: param.id,
        pageNo: 1,
        pageSize: 10
      }
      let iDatas = await getParkList(iparams)
      if (iDatas.status === 200 && iDatas.data) {
        this.parkTableData = iDatas.data.list
      }
    },
    async loadParkRateData(param) {
      let iparams = {
        parkId: param.parkId,
        pageNo: 1,
        pageSize: 10
      }
      let iDatas = await getParkFeeDetail(iparams)
      if (iDatas.status === 200 && iDatas.data) {
        this.rateTableData1 = []
        this.rateTableData2 = []
        iDatas.data.list.forEach((item) => {
          if (item.rateType === 1) {
            this.rateTableData1.push(item)
          } else {
            this.rateTableData2.push(item)
          }
        })
      }
    },
    async getMchParkRateList() {
      this.treeLoading = true
      let iparams = {
        mchId: this.userInfo().mchId
      }
      let iDatas = await MchParkRateList(iparams)
      if (iDatas.status === 200 && iDatas.data) {
        console.time('assignTree')
        this.asignPark(iDatas.data)
        console.timeEnd('assignTree')
        this.treeLoading = false
      }
    },
    async getMerchantDetail(mchId) {
      let iparams = {
        id: mchId
      }
      let iDatas = await MerchantDetail(iparams)
      this.merchantData = iDatas.data
      this.mchLoading = false
      this.loadParkData(this.merchantData)
    },
    async getParkDetail(parkId) {
      let iparams = {
        parkId: parkId,
        pageSize: 100,
        pageNo: 1
      }
      let iDatas = await getParkDetail(iparams)
      this.parkData = iDatas.data.parkInfo
      this.parkLoading = false
      this.loadParkRateData(this.parkData)
    },
    async getParkFeeInfo(Id) {
      let res = await getParkFeeInfo(Id)
      this.rateData = res.data[0]
      console.log('this.rateData', this.rateData)
      this.parkFeeLoading = false
      this.parkId = res.data[0].parkId
      this.rateId = res.data[0].id
    },
    handleMchAdd() {
      this.showContent = false
      this.showRouter = true

      this.showChildMer = true
      this.showChildPark = false
      this.showChildParkFee = false
      this.showChildImport = false
      this.showDefaultFee = false
      this.toChildId = ''
      this.toChildType = 'mch'
    },
    handleMchParkAdd(itemData) {
      this.showContent = false
      this.showRouter = true
      console.log('handleParkAdd: ' + JSON.stringify(itemData))
      this.showChildMer = false
      this.showChildPark = true
      this.showChildParkFee = false
      this.showChildImport = false
      this.showDefaultFee = false
      this.toChildId = itemData.id
      this.toChildType = 'park'
    },
    handleParkAdd(itemData) {
      this.showContent = false
      this.showRouter = true
      console.log('handleParkAdd: ' + JSON.stringify(itemData))
      this.showChildMer = false
      this.showChildPark = true
      this.showChildParkFee = false
      this.showChildImport = false
      this.showDefaultFee = false
      this.toChildId = itemData.mchId
      this.toChildType = 'park'
    },
    handleRateAdd(itemData) {
      this.showContent = false
      this.showRouter = true
      console.log('handleRateAdd: ' + JSON.stringify(itemData))
      this.showChildMer = false
      this.showChildPark = false
      this.showChildParkFee = true
      this.showDefaultFee = true
      this.showChildImport = true
      this.toChildId = itemData.parkId
      this.toChildType = 'rate'
    },
    cancelSave() {
      this.showContent = true
      this.showRouter = false
      this.showChildMer = false
      this.showChildPark = false
      this.showChildParkFee = false
      this.showChildImport = false
      this.showDefaultFee = false
    },
    saveOk(val) {
      console.log('saveOk: ', val.val)
      this.showChildMer = false
      this.showChildPark = false
      this.showChildParkFee = false
      this.showChildImport = false
      this.showDefaultFee = false
      if (val.val.saveType === 'mch') {
        this.mchLoading = true
        this.getMerchantDetail(val.val.id)
        this.showContent = true
        this.showRouter = false
        this.showMch = true
        this.showPark = false
        this.showFee = false
      }
      if (val.val.saveType === 'park') {
        this.parkLoading = true
        this.getParkDetail(val.val.id)
        this.showContent = true
        this.showRouter = false
        this.showMch = false
        this.showPark = true
        this.showFee = false
      }
      if (val.val.saveType === 'rate') {
        this.parkFeeLoading = true
        this.getParkFeeInfo(val.val.id)
        this.showContent = true
        this.showRouter = false
        this.showMch = false
        this.showPark = false
        this.showFee = true
      }
    },
    saveThen() {
      this.getMchParkRateList()
    },
    handleMchEdit() {
      this.$refs.merchantEditModal.edit(this.merchantData)
    },
    handleParkEdit(itemData) {
      this.$refs.parkEditModal.edit(itemData)
    },
    handleRateEdit(itemData) {
      console.log('handleRateEdit: ' + JSON.stringify(itemData))
      this.$refs.rateEditModal.edit(itemData)
    },
    onMchEditClose() {
      this.getMchParkRateList()
      this.showMch = false
    },
    onParkEditClose() {
      this.getMchParkRateList()
      this.showPark = false
    },
    onRateEditClose() {
      this.getMchParkRateList()
      this.showFee = false
    },
    importFile: function(file) {
      console.log(file)
      this.confirmLoading = true
      let obj = file
      if (!obj.file) {
        this.confirmLoading = false
        return
      }
      let f = obj.file
      let reader = new FileReader()
      let $t = this
      reader.onload = function(e) {
        let data = e.target.result
        console.log(e)
        if ($t.rABS) {
          $t.wb = XLSX.read(btoa(this.fixdata(data)), {
            // 手动转化
            type: 'base64'
          })
        } else {
          $t.wb = XLSX.read(data, {
            type: 'binary'
          })
        }
        let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
        $t.dealFile($t.analyzeData(json))
      }
      if (this.rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    analyzeData: function(data) {
      console.log('analyzeData: ', data)
      console.log('parkid', this.parkId)
      console.log('rateid', this.rateId)
      return data
    },
    dealFile: function(data) {
      this.confirmLoading = false
      if (data.length <= 0) {
        this.showErrMsg = true
      } else {
        this.showErrMsg = false
        this.excelData = data
        console.log('dealFile: ' + JSON.stringify(data))
        let userArr = []
        data.forEach((item) => {
          let user = {
            ...item,
            rateId: this.rateId,
            parkId: this.parkId
          }
          userArr.push(user)
        })
        this.mprLead(userArr)
      }
    },
    async mprLead(data) {
      try {
        let iReturn = await MprAddUser(data)
        this.confirmLoading = false
        if (iReturn.status === 200) {
          notification.success({
            message: '用户信息导入成功',
            description: '用户信息导入成功!'
          })
          this.visible = false
        } else {
          this.fileList = []
          this.excelData = []
          notification.error({
            message: '用户信息导入失败',
            description: `${iReturn.data}`
          })
        }
      } catch (err) {
        this.fileList = []
        this.excelData = []
        notification.error({
          message: '用户信息导入失败',
          description: `${err.response.data.data}`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
