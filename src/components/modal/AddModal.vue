<template>
  <a-modal
    v-model:open="open"
    width="1000px"
    title="新增人物设定"
    ok-text="确认"
    cancel-text="取消"
    @ok="handleOk"
  >
    <a-form>
      <a-upload
        v-model:file-list="fileList"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://frckqy.laf.run/img_upload"
        @change="handleChange"
      >
        <!-- :before-upload="beforeUpload" -->

        <a-image :width="80" v-if="modalEdit?.img_url" :src="modalEdit?.img_url" alt="avatar" />
        <div v-else>
          <loading-outlined v-if="loading"></loading-outlined>
          <plus-outlined v-else></plus-outlined>
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
      <a-form-item v-for="item in items" :label="item.name" :key="item.name">
        <a-input :placeholder="item.placeHolder" v-model:value="modalForm[item.name]"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue'
import { agentAdd, agentEdit } from '../../utils/api'
import { defineModel } from 'vue'
import type { UploadChangeParam } from 'ant-design-vue'
interface ModalForm {
  uuid: string
  bot_info: string
  bot_name: string
  user_info: string
  user_name: string
  img_url?: string
}
const emit = defineEmits(['fetTableData'])
const open = defineModel('open')
const modalEdit = defineModel('modalEdit')
console.log('%c Line:51 🍕 modalEdit', 'color:#fca650', { ...modalEdit.value })
const items = [
  { name: 'bot_info', placeHolder: 'bot_info' },
  { name: 'bot_name', placeHolder: 'bot_name' },
  { name: 'user_info', placeHolder: 'user_info' },
  { name: 'user_name', placeHolder: 'user_name' }
]
const fileList = ref([])
const loading = ref<boolean>(false)
const handleChange = (info: UploadChangeParam) => {
  modalEdit.value = { ...modalEdit.value, img_url: info.file.response }
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    loading.value = false
  }
  if (info.file.status === 'error') {
    loading.value = false
  }
}
const modalForm = ref<ModalForm>({
  uuid: '',
  bot_info: '1111',
  bot_name: '222',
  user_info: '',
  user_name: '',
  img_url: ''
})
const isEdit = computed(() => {
  return modalEdit.value?.uuid !== '' && modalEdit.value?.uuid !== undefined
})
watchEffect(() => {
  if (isEdit.value) {
    modalForm.value = modalEdit.value
  } else {
    console.log('新增')
  }
})

const handleOk = async () => {
  if (isEdit.value) {
    await agentEdit(modalForm.value)
  } else {
    await agentAdd(modalForm.value)
  }
  open.value = false
  emit('fetTableData')
}
</script>
