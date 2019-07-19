<template>
  <a-modal
    title="编辑"
    :width="800"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="新闻标题">
              <a-input
                v-decorator="[
                  'titles',
                  {
                    rules: [{ required: true }]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="副标题">
              <a-input
                v-decorator="[
                  'subhead',
                  {
                    rules: [{ required: true }]
                  }
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <quill-editor ref="textEditor" v-model="artContent" :options="editorOption"></quill-editor>
          </a-col>
        </a-row>
        <a-row :Gutter="48" type="flex" justify="space-around">
          <a-col :span="24">
            <a-form-item label="上传头图">
              <div class="clearfix">
                <a-upload
                  listType="picture-card"
                  action="/sys/news/uploadFile"
                  :fileList="fileList"
                  accept="image/*"
                  @preview="handlePreview"
                  @change="handleChange"
                >
                  <div v-if="fileList.length < 1">
                    <a-icon type="plus" />
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handleImgCancel">
                  <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
              </div>
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
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import AFormItem from 'ant-design-vue/es/form/FormItem'
import { NewsUpdate } from '@/api/news'

export default {
  name: 'StepByStepModal',
  components: {
    AFormItem,
    quillEditor
  },
  data() {
    return {
      itemShow: false,
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      artContent: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      editorOption: {
        // modules: {
        //   toolbar: [
        //     ['bold', 'italic', 'underline', 'strike'],
        //     [{ color: [] }, { background: [] }],
        //     [{ align: [] }],
        //     [{ size: ['small', false, 'large', 'huge'] }],
        //     ['clean'],
        //     ['blockquote'],
        //     [{ list: 'ordered' }, { list: 'bullet' }],
        //     [{ script: 'sub' }, { script: 'super' }],
        //     [{ indent: '-1' }, { indent: '+1' }]
        //   ]
        // },
        placeholder: '请输入内容 ...',
        record: ''
      }
    }
  },
  methods: {
    edit(record) {
      this.visible = true
      const {
        form: { setFieldsValue }
      } = this
      // DownloadImg(record.imgPath).then((res) => {
      //   console.log(JSON.stringify(res))
      //   this.fileList[0].thumbUrl=res
      // });
      this.$nextTick(() => {
        setFieldsValue(pick(record, ['id', 'newType', 'pbDate', 'state', 'subhead', 'titles', 'upDate', 'userId']))
      })

      if (record.imgPath) {
        this.fileList[0] = {
          url: '/sys/news/downloadFile?imageId=' + record.imgPath,
          uid: record.imgPath,
          response: { data: record.imgPath },
          status: 'done',
          name: 'xxx.png'
        }
      }
      this.artContent = record.content
      this.record = record
    },
    normFile(e) {
      console.log('Upload event:', e)
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
    handleConfirm() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log('errors:', errors, 'val:', values)
        if (!errors) {
          console.log('save art:  ' + this.artContent)
          const fieldsValue = {
            ...values,
            content: this.artContent,
            id: this.record.id,
            imgPath: this.fileList[0].response.data
          }
          NewsUpdate(fieldsValue).then((res) => {
            console.log(res)
            this.visible = false
            this.$emit('onClose')
          })
          setTimeout(() => {
            this.confirmLoading = false
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.visible = false
    },
    handleImgCancel() {
      this.previewVisible = false
    }
  }
}
</script>
