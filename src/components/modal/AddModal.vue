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
      <a-form-item v-for="item in items" :label="item.name" :key="item.name">
        <a-input :placeholder="item.placeHolder" v-model:value="modalForm[item.name]"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { agentAdd, agentEdit } from '../../utils/api'
import { defineProps, defineModel } from 'vue'
const emit = defineEmits(['fetTableData'])
const open = defineModel('open')
const props = defineProps({
  modalEdit: Object
})
import { watchEffect } from 'vue'
const modalForm = ref<ModalForm>({
  uuid: '',
  bot_info: '1111',
  bot_name: '222',
  user_info: '',
  user_name: ''
})
watchEffect(() => {
  if (props.modalEdit?.uuid !== '' && props.modalEdit?.uuid !== undefined) {
    modalForm.value = props.modalEdit
  } else {
    console.log('新增')
  }
})
interface ModalForm {
  uuid: string
  bot_info: string
  bot_name: string
  user_info: string
  user_name: string
}

const items = [
  { name: 'bot_info', placeHolder: 'bot_info' },
  { name: 'bot_name', placeHolder: 'bot_name' },
  { name: 'user_info', placeHolder: 'user_info' },
  { name: 'user_name', placeHolder: 'user_name' }
]
const handleOk = async () => {
  if (props.modalEdit?.uuid !== '' && props.modalEdit?.uuid !== undefined) {
    await agentEdit(modalForm.value)
  } else {
    await agentAdd(modalForm.value)
  }
  open.value = false
  emit('fetTableData')
}
</script>
