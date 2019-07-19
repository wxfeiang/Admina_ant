<template>
  <a-card :bordered="false">
    <a-row>
      <a-col :span="8">
        <a-icon type="backward" />
        <router-link :to="{ path: '/info/' + $route.params.type }">返回</router-link>
      </a-col>
    </a-row>
    <a-divider />
    <a-form :form="form" @submit="handleSave">
      <a-form-item>
        <a-input
          placeholder="请输入标题"
          size="large"
          style="width: 50%"
          v-decorator="['titles', { rules: [{ required: true }] }]"
        />
      </a-form-item>
      <a-form-item>
        <a-input
          placeholder="请输入副标题"
          style="width: 50%"
          v-decorator="['subhead', { rules: [{ required: true }] }]"
        />
      </a-form-item>
      <a-form-item>
        <a-textarea
          v-decorator="[
            'content1',
            {
              rules: [{ required: true }]
            }
          ]"
          placeholder="请输入内容"
          :rows="4"
        ></a-textarea>
      </a-form-item>
      <a-form-item>
        <a-upload
          v-decorator="[
            'contentImg',
            {
              rules: [{ required: true }],
              valuePropName: 'contentFileList',
              getValueFromEvent: normFile
            }
          ]"
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture"
          accept="image/*"
          :defaultFileList="contentFileList"
          class="upload-list-inline"
          @change="contentHandleChange"
        >
          <a-button v-if="contentFileList.length < 2"> <a-icon type="upload" /> 上传图片 </a-button>
        </a-upload>
      </a-form-item>
      <a-form-item>
        <a-textarea
          v-decorator="[
            'content2',
            {
              rules: [{ required: true }]
            }
          ]"
          placeholder="请输入内容"
          :rows="4"
        ></a-textarea>
      </a-form-item>
      <a-form-item>
        <a-upload
          v-decorator="[
            'imgPath',
            {
              rules: [{ required: true }],
              valuePropName: 'fileList',
              getValueFromEvent: normFile
            }
          ]"
          action="/api/file/upload.xhtml"
          listType="picture"
          accept="image/*"
          :defaultFileList="fileList"
          class="upload-list-inline"
          :remove="handleImgRemove"
          :data="uploadParams"
          @preview="handlePreview"
          @change="handleChange"
        >
          <a-button v-if="fileList.length < 1"> <a-icon type="upload" /> 上传头图 </a-button>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-upload>
      </a-form-item>
    </a-form>
    <a-divider />
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="24" :offset="20">
        <a-button icon="cloud" @click="handleDetail">预览</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" icon="cloud-upload" @click="handleSave">保存</a-button>
      </a-col>
    </a-row>
    <detail-drawer
      :is-show="adShow"
      :data-name="adDataItems.titles"
      :data-items="adDataItems"
      @onClose="adClose"
    ></detail-drawer>
  </a-card>
</template>

<script>
import { DeleteImg, NewsAdd } from '@/api/news'
import { mapGetters } from 'vuex'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import DetailDrawer from './modules/DetailDrawer'

export default {
  components: {
    AFormItem,
    DetailDrawer
  },
  data() {
    return {
      uploadParams: {
        userId: this.userInfo().id,
        noCallBack: 0,
        module: 8,
        type: 0,
        noTemp: 1,
        maxSize: 10240,
        minSize: 1
      },
      previewVisible: false,
      previewImage: '',
      fileList: [],
      contentFileList: [],
      mchId: '',
      adShow: false,
      adTitle: '文章详情',
      adDataItems: {},
      editorOption: {
        placeholder: '请输入内容 ...',
        config: {
          rules: [{ type: 'object', required: true, message: 'Please select time!' }]
        }
      },
      newsType: '',
      typeKey: ''
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  methods: {
    ...mapGetters(['userInfo']),
    adClose() {
      this.adShow = false
    },
    handleDetail() {
      this.adDataItems = {
        titles: this.form.getFieldValue('titles'),
        content1: this.form.getFieldValue('content1'),
        content2: this.form.getFieldValue('content2'),
        subhead: this.form.getFieldValue('subhead'),
        fileList: this.contentFileList
      }
      this.adShow = true
    },
    handleSave(e) {
      e.preventDefault()
      const { userInfo } = this
      console.log(this.fileList)
      this.form.validateFields((err, fieldsValue) => {
        if (!err) {
          console.log('Received values of form: ', fieldsValue)
        }
        const values = {
          ...fieldsValue,
          newType: this.$route.params.typeKey,
          imgPath: '/api/file/read/' + this.fileList[0].response.data[0].id,
          userId: userInfo().id
        }
        console.log('Received values of form: ', values)
        NewsAdd(values).then((res) => {
          if (res.data !== 0) {
            this.$message.success('保存成功')
            this.$router.push({ name: this.$route.params.type })
          }
        })
      })
      console.log(e)
    },
    handleCancel() {
      this.previewVisible = false
    },
    handleImgRemove(file) {
      DeleteImg(file.response.data).then((res) => {
        console.log(res)
      })
    },
    normFile(e) {
      console.log('Upload event:', e)
      this.uid = e.file.uid
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    contentHandleChange({ fileList }) {
      fileList.forEach((file) => {
        file.status = 'done'
      })
      this.contentFileList = fileList
    }
  }
}
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
