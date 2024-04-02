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

        <a-image
          :width="80"
          v-if="modalForm?.img_url"
          :src="modalForm?.img_url"
          alt="avatar"
          style="border-radius: 50%"
        />
        <div v-else>
          <div class="ant-upload-text">上传头像</div>
        </div>
      </a-upload>
      <a-form-item v-for="item in items" :label="item.placeHolder" :key="item.name">
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
const items = [
  { name: 'bot_name', placeHolder: '智能体名称' },
  { name: 'bot_info', placeHolder: '智能体简介' },
  { name: 'user_name', placeHolder: '用户名称' },
  { name: 'user_info', placeHolder: '用户信息' }
]
const fileList = ref([])
const modalForm = ref<ModalForm>({
  uuid: '',
  bot_info: '',
  bot_name: '',
  user_info: '',
  user_name: '',
  img_url: ''
})
const handleChange = (info: UploadChangeParam) => {
  modalForm.value = { ...modalForm.value, img_url: info.file.response }
}

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
