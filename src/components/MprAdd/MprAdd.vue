<template>
  <div>
    <div v-show="innerShowMer">
      <detail-list title="商户信息" />
      <a-form :form="mchForm">
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="商户名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="营业执照" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['path', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="省市区" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <VDistpicker
                @selected="onSelected"
                :province="province"
                :city="city"
                :area="area"
                v-decorator="['province', { rules: [{ required: true }] }]"
              ></VDistpicker>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="详细地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['address', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row align="middle" justify="space-around">
          <a-col :span="12">
            <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['userName', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['phone', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="联系人邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['email', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12"> </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
              <a-button key="cancel" style="margin-left: 8px" @click="cancelSave">取消</a-button>
              <a-divider type="vertical" />
              <a-button key="forward" :loading="confirmLoading" type="primary" @click="mchConfirm">保存</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div v-show="innerShowPark">
      <detail-list title="停车场信息" />
      <a-form :form="parkForm">
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="停车场名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['name', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['address', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="联系人" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['contact', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="联系人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['tel', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="车位数" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['num', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="经度" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['lat', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item label="纬度" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="['lng', { rules: [{ required: true }] }]" />
            </a-form-item>
          </a-col>
          <a-col :span="12"></a-col>
        </a-row>
        <a-row type="flex" justify="space-around">
          <a-col :span="12">
            <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
              <a-button key="cancel" style="margin-left: 8px" @click="cancelSave">取消</a-button>
              <a-divider type="vertical" />
              <a-button key="forward" :loading="confirmLoading" type="primary" @click="parkConfirm">保存</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div v-show="innerShowParkFee">
      <detail-list title="停车场费率信息" />是否使用默认停车场费率模板：
      <a-switch checkedChildren="启用" unCheckedChildren="停用" defaultChecked @change="onDefaultFeeChange" />
      <a-divider />
      <div v-show="innerShowDefaultFee">
        <a-row type="flex" justify="center" align="middle">
          <a-col :span="24">
            <detail-list title="停车场费率默认模板">
              <detail-list-item term="免费时长">{{ parkFeeItems.freeTime }}</detail-list-item>
              <detail-list-item term="首次时长">{{ parkFeeItems.firstTime }}</detail-list-item>
              <detail-list-item term="首次金额">{{ parkFeeItems.firstFee }}</detail-list-item>
              <detail-list-item term="续费时长">{{ parkFeeItems.renewTime }}</detail-list-item>
              <detail-list-item term="续费金额">{{ parkFeeItems.renewFee }}</detail-list-item>
              <detail-list-item term="收费类型">{{ parkFeeItems.payType }}</detail-list-item>
              <detail-list-item term="提前支付后允许的停车时间">{{ parkFeeItems.timeOut }}</detail-list-item>
              <detail-list-item term="超出提前支付停车时间收费金额">{{ parkFeeItems.feeOut }}</detail-list-item>
              <detail-list-item term="费率描述">{{ parkFeeItems.description }}</detail-list-item>
            </detail-list>
          </a-col>
        </a-row>
        <a-divider />
      </div>
      <div v-show="!innerShowDefaultFee">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane key="1">
            <span slot="tab">
              阶梯费率
            </span>
            <a-form :form="parkFeeForm1">
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="12">
                  <a-form-item label="免费时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['freeTime', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="首次时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['firstTime', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :Gutter="48" type="flex" justify="space-around">
                <a-col :span="12">
                  <a-form-item label="首次金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['firstFee', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="续费时长" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['renewTime', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :Gutter="48" type="flex" justify="space-around">
                <a-col :span="12">
                  <a-form-item label="续费金额" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['renewFee', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="收费类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-select
                      v-decorator="['payType', { initialValue: 1, rules: [{ required: true }] }]"
                      style="width: 100%"
                    >
                      <a-select-option :value="1">包月</a-select-option>
                      <a-select-option :value="2">员工</a-select-option>
                      <a-select-option :value="3">会员</a-select-option>
                      <a-select-option :value="4">临时</a-select-option>
                      <a-select-option :value="5">特殊</a-select-option>
                      <a-select-option :value="6">其他</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :Gutter="48" type="flex" justify="space-around">
                <a-col :span="24">
                  <a-form-item label="提前支付后允许的停车时间">
                    <a-input v-decorator="['timeOut', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row :Gutter="48" type="flex" justify="space-around">
                <a-col :span="24">
                  <a-form-item label="超出提前支付后允许的停车时间的收费金额">
                    <a-input v-decorator="['feeOut', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item label="费率描述">
                <a-textarea
                  v-decorator="['description', { rules: [{ required: true }] }]"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                ></a-textarea>
              </a-form-item>
              <a-row type="flex" justify="space-around">
                <a-col :span="12">
                  <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
                    <a-button key="cancel" style="margin-left: 8px" @click="cancelSave">取消</a-button>
                    <a-divider type="vertical" />
                    <a-button key="forward" :loading="confirmLoading" type="primary" @click="parkFeeConfirm1"
                      >保存</a-button
                    >
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              时长费率
            </span>
            <a-form :form="parkFeeForm2" layout="horizontal">
              <a-row type="flex" justify="start" align="middle">
                <a-col :span="12">
                  <a-form-item label="收费时长：" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['amTime', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="收费金额：" :labelCol="labelCol" :wrapperCol="wrapperCol">
                    <a-input v-decorator="['amAmount', { rules: [{ required: true }] }]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <a-form-item label="收费类型" v-show="false">
                    <a-select v-decorator="['payType', { initialValue: 2, rules: [{ required: true }] }]"> </a-select>
                  </a-form-item>
                </a-col>
                <a-col>
                  <a-form-item label="费率类型：" v-show="false">
                    <a-input v-decorator="['rateType', { initialValue: 2 }]" />
                  </a-form-item>
                </a-col>
              </a-row>
              <a-form-item label="费率描述">
                <a-textarea
                  v-decorator="['description', { rules: [{ required: true }] }]"
                  :autosize="{ minRows: 6, maxRows: 6 }"
                ></a-textarea>
              </a-form-item>
              <a-row type="flex" justify="space-around">
                <a-col :span="12">
                  <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
                    <a-button key="cancel" style="margin-left: 8px" @click="cancelSave">取消</a-button>
                    <a-divider type="vertical" />
                    <a-button key="forward" :loading="confirmLoading" type="primary" @click="parkFeeConfirm2"
                      >保存</a-button
                    >
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div v-show="innerShowImport">
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
    </div>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import DetailList from '@/components/tools/DetailList'
import { MerchantAddNew } from '@/api/merchant'
import { ParkAddNew, ParkFeeAddNew } from '@/api/park'
import { MprAddUser } from '@/api/mpr'
import notification from 'ant-design-vue/es/notification'
import VDistpicker from 'v-distpicker'

const DetailListItem = DetailList.Item
export default {
  components: {
    DetailList,
    DetailListItem,
    VDistpicker
  },
  props: {
    id: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'default'
    },
    showMer: {
      type: Boolean,
      required: true,
      default: false
    },
    showPark: {
      type: Boolean,
      required: true,
      default: false
    },
    showParkFee: {
      type: Boolean,
      required: true,
      default: false
    },
    showDefaultFee: {
      type: Boolean,
      required: true,
      default: false
    },
    showImport: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  watch: {
    showMer: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log('watch showMer : ' + newVal)
        this.innerShowMer = newVal
        console.log('watch showMer innerShowMer : ' + this.innerShowMer)
      }
    },
    showPark: {
      handler(newVal, oldVal) {
        this.innerShowPark = newVal
      },
      immediate: true
    },
    showParkFee: {
      handler(newVal, oldVal) {
        this.innerShowParkFee = newVal
      },
      immediate: true
    },
    showDefaultFee: {
      handler(newVal, oldVal) {
        this.innerShowDefaultFee = newVal
      },
      immediate: true
    },
    showImport: {
      handler(newVal, oldVal) {
        this.innerShowImport = newVal
      },
      immediate: true
    }
  },
  data() {
    return {
      description: '',
      labelCol: {
        xs: { span: 6 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 13 },
        sm: { span: 16 }
      },
      province: '',
      city: '',
      area: '',
      confirmLoading: false,
      mchForm: this.$form.createForm(this),
      parkForm: this.$form.createForm(this),
      parkFeeForm1: this.$form.createForm(this),
      parkFeeForm2: this.$form.createForm(this),
      defaultFeeform: this.$form.createForm(this),
      fileList: [],
      parkFeeItems: {
        freeTime: '12',
        firstTime: '12',
        firstFee: '12',
        renewTime: '12',
        renewFee: '12',
        payType: '1',
        timeOut: '12',
        feeOut: '12',
        description: '12'
      },
      showErrMsg: false,
      imFile: '',
      excelData: [],
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
      mchId: '',
      parkId: '',
      rateId: '',
      innerShowMer: false,
      innerShowPark: false,
      innerShowParkFee: false,
      innerShowImport: false,
      innerShowDefaultFee: false
    }
  },
  methods: {
    onSelected(data) {
      this.mchForm.setFieldsValue({ province: data.province.value })
      this.city = data.city.value
      this.area = data.area.value
      console.log(data)
    },
    mchConfirm(e) {
      e.preventDefault()
      this.mchForm.validateFields((err, values) => {
        if (!err) {
          const fieldValues = {
            ...values,
            city: this.city,
            district: this.area
          }
          console.log('fieldValues:', fieldValues)
          this.serialMerchantAdd(fieldValues)
        } else {
          this.confirmLoading = false
        }
      })
    },
    parkConfirm(e) {
      e.preventDefault()
      this.parkForm.validateFields((err, values) => {
        if (!err) {
          values.mchId = this.type === 'park' ? this.id : this.mchId
          console.log('parkConfirm values:', values)
          this.serialParkAdd(values)
        } else {
          this.confirmLoading = false
        }
      })
    },
    parkFeeConfirm1(e) {
      e.preventDefault()
      this.parkFeeForm1.validateFields((err, values) => {
        if (!err) {
          values.parkId = this.type === 'rate' ? this.id : this.parkId
          const params = {
            ...values,
            rateType: 1
          }
          console.log('parkFeeConfirm values:', params)
          this.serialRateAdd(params)
        } else {
          this.confirmLoading = false
        }
      })
    },
    parkFeeConfirm2(e) {
      e.preventDefault()
      this.parkFeeForm2.validateFields((err, values) => {
        if (!err) {
          values.parkId = this.type === 'rate' ? this.id : this.parkId
          const params = {
            ...values,
            rateType: 2
          }
          console.log('parkFeeConfirm values:', params)
          this.serialRateAdd(values)
        } else {
          this.confirmLoading = false
        }
      })
    },
    onDefaultFeeChange(checked) {
      this.innerShowDefaultFee = checked
      this.innerShowImport = checked
    },
    parkFeeDefaultConfirm(itemData) {
      console.log('停车场使用默认费率: ' + JSON.stringify(itemData))
      // TODO: 调接口保存默认费率
    },
    async serialMerchantAdd(iparams) {
      let that = this
      try {
        let iReturn = await MerchantAddNew(iparams)
        if (iReturn.status === 200 && iReturn.data.mchId) {
          this.mchId = iReturn.data.mchId
          console.log('串行-商户增加ok: ' + this.mchId)
          that.saveThen()
          this.$confirm({
            title: '是否新增停车场?',
            content: '',
            onOk() {
              that.innerShowMer = false
              that.innerShowPark = true
            },
            onCancel() {
              let val = {
                saveType: 'mch',
                id: iReturn.data.mchId
              }
              that.saveOk(val)
            }
          })
        } else {
          this.$notification.error({
            message: '商户新增失败',
            description: `${iReturn.data}`
          })
        }
        this.confirmLoading = false
      } catch (err) {
        this.confirmLoading = false
        this.$notification.error({
          message: '商户新增失败',
          description: `${err.response.data.data}`
        })
      }
    },
    async serialParkAdd(iparams) {
      let that = this
      try {
        let iReturn = await ParkAddNew(iparams)
        if (iReturn.status === 200 && iReturn.data.parkId) {
          this.parkId = iReturn.data.parkId
          that.saveThen()
          this.$confirm({
            title: '是否新增停车场费率?',
            content: '',
            onOk() {
              that.innerShowMer = false
              that.innerShowPark = false
              that.innerShowParkFee = true
              that.innerShowDefaultFee = true
              that.innerShowImport = true
            },
            onCancel() {
              let val = {
                saveType: 'park',
                id: iReturn.data.parkId
              }
              that.saveOk(val)
            }
          })
        } else {
          this.$notification.error({
            message: '停车场新增失败',
            description: `${iReturn.data}`
          })
        }
        this.confirmLoading = false
      } catch (err) {
        this.$notification.error({
          message: '停车场新增失败',
          description: `${err.response.data.data}`
        })
        this.confirmLoading = false
      }
    },
    async serialRateAdd(iparams) {
      let that = this
      try {
        let iReturn = await ParkFeeAddNew(iparams)
        if (iReturn.status === 200 && iReturn.data.rateId) {
          this.rateId = iReturn.data.rateId
          that.saveThen()
          this.$confirm({
            title: '新增费率成功，是否导入用户信息?',
            content: '',
            okText: '现在导入',
            cancelText: '稍后导入',
            onOk() {
              that.innerShowMer = false
              that.innerShowPark = false
              that.innerShowParkFee = false
              that.innerShowImport = true
            },
            onCancel() {
              let val = {
                saveType: 'rate',
                id: iReturn.data.rateId
              }
              that.saveOk(val)
            }
          })
        } else {
          this.$notification.error({
            message: '停车场费率新增失败',
            description: `${iReturn.data}`
          })
        }
        this.confirmLoading = false
      } catch (err) {
        this.$notification.error({
          message: '停车场费率新增失败',
          description: `${err.response.data.data}`
        })
        this.confirmLoading = false
      }
    },
    cancelSave() {
      console.log('cancelSave')
      this.$emit('cancelSave')
    },
    saveOk(val) {
      this.$emit('saveOk', { val })
    },
    saveThen() {
      this.$emit('saveThen')
    },
    handleChange(info) {
      this.fileList = info.fileList
      if (info.fileList.length === 0) {
        this.excelData = []
      }
      if (info.fileList.length > 0) {
        info.file.status = 'done'
      }
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
      console.log('toChildId', this.id)
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
            rateId: this.rateId ? 1 : this.rateId,
            parkId: this.id
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
          notification.error({
            message: '用户信息导入失败',
            description: `${iReturn.data}`
          })
          this.excelData = []
          this.fileList = []
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
