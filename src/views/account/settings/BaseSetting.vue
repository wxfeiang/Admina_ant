<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical">
          <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入自己的名称" />
          </a-form-item>
          <a-form-item label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入自己的密码" />
          </a-form-item>
          <a-form-item label="手机号码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入自己的手机号码" />
          </a-form-item>
          <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="请输入自己的邮箱" />
          </a-form-item>
          <a-form-item label="归属商户" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input placeholder="未加入商户" disabled />
          </a-form-item>
          <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea rows="4" placeholder="You are not alone." />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 5 }">
            <a-button type="primary">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <!-- <div class="ant-upload-preview" @click="$refs.modal.edit(1)"> -->
        <div class="ant-upload-preview">
          <!-- <a-icon type="retweet" class="upload-icon" /> -->
          <div class="mask">
            <a-icon type="retweet" />
          </div>
          <img :src="choseImg" />
        </div>
        <div class="cimgs">
          <div class="cii" @click="choseAvatar('male')"><img src="/avatar1.png" class="ciics" /></div>
          <div class="cii" @click="choseAvatar('female')"><img src="/avatar2.png" class="ciics" /></div>
        </div>
      </a-col>
    </a-row>

    <avatar-modal ref="modal"></avatar-modal>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { mapGetters } from 'vuex'
export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      // cropper
      preview: {},
      option: {
        img: this.avatar(),
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      choseImg: this.avatar()
    }
  },
  methods: {
    ...mapGetters(['mchId', 'avatar']),
    choseAvatar(item) {
      item === 'male' ? (this.choseImg = '/avatar1.png') : (this.choseImg = '/avatar2.png')
    }
  }
}
</script>

<style lang="less" scoped>
.cimgs {
  margin: 10px auto;
  width: 100%;
  text-align: center;

  .cii {
    display: inline;
    cursor: pointer;

    .ciics {
      width: 50px;
      height: 50px;
    }
  }
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
