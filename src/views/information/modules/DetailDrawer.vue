<template>
  <a-drawer width="700" placement="left" @close="onClose" :closable="false" :visible="isShow">
    <div class="am-g am-g-fixed blog-g-fixed">
      <div class="am-u-md-8" style="width: 100%;font-size: 15px;">
        <article class="blog-main">
          <h3 class="blog-title" id="title">{{ dataItems.titles }}</h3>
          <p class="am-article-meta blog-meta" id="title2" style="font-size: 13px;">
            {{ new Date().toLocaleDateString() }}
          </p>
          <div class="blog-content" id="content">
            <p style="font-size: 12px; text-align: justify;">
              {{ dataItems.content1 }}
            </p>
            <div v-for="items in dataItems.fileList" :key="items">
              <p style="text-align: center; text-indent: 0em;">
                <img :src="items.thumbUrl" :title="items.name" :alt="items.name" />
              </p>
            </div>
            <p style="text-indent: 2em; text-align: justify;">
              {{ dataItems.content2 }}
            </p>
            <p><br /></p>
          </div>
        </article>
      </div>
    </div>
  </a-drawer>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'DetailDrawer',
  props: {
    dataName: {
      type: String,
      default: '详情'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    dataItems: {
      type: Object,
      default: (res) => {
        console.log(res)
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    onClose() {
      console.log(this.dataItems)
      this.$emit('onClose')
    }
  }
}
</script>
