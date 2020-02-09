<template>
  <div ref="imagezone">
    <p>
      <img class="img-thumbnail" :src="picture" />
    </p>

    <div class="row">
      <div class="col-md-2">
        <button type="button" class="btn btn-primary" @click="selectFile">Выбрать...</button>
        <input ref="file" type="file" class="hidden" @change="upload" />
      </div>

      <div class="col-md-10">
        <input v-model="picture" type="text" class="form-control" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Dropzone from 'dropzone'
import 'dropzone/dist/dropzone.css'

export default {
  name: 'AvatarUploader',
  model: {
    prop: 'picture'
  },
  props: {
    picture: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.initDropzone()
  },
  methods: {
    setNewAvatar(picture) {
      this.$emit('input', picture)
    },

    selectFile() {
      this.$refs.file.click()
    },

    upload() {
      const url = 'https://api.imgur.com/3/image'

      const data = new FormData()
      data.append('image', this.$refs.file.files[0])

      // https://api.imgur.com/oauth2/addclient
      const config = {
        headers: {
          Authorization: 'Client-ID 770e90134b361a5'
        }
      }
      axios
        .post(url, data, config)
        .then(response => response.data)
        .then(response => {
          this.setNewAvatar(response.data.link)
          this.$refs.file.value = ''
        })
    },

    initDropzone() {
      /* eslint-disable no-new */
      new Dropzone(this.$refs.imagezone, {
        url: 'https://api.imgur.com/3/image',
        paramName: 'image',
        acceptedFiles: 'image/*',
        method: 'post',
        headers: {
          'Cache-Control': null,
          'X-Requested-With': null,
          Authorization: 'Client-ID 770e90134b361a5'
        },
        createImageThumbnails: false,
        previewTemplate: '<div style="display:none"></div>',
        success: (file, response) => {
          this.setNewAvatar(response.data.link)
          this.$refs.file.value = ''
        }
      })
    }
  }
}
</script>

<style>
.hidden {
  display: none;
}
</style>
