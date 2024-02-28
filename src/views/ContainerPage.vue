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
  <div class="container">
    <a-form class="search-form" :model="formState">
      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-form-item class="form-id">
            <a-input v-model:value="formState.id" placeholder="智能体ID" class="form-id"> </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item class="form-id">
            <a-input v-model:value="formState.name" placeholder="智能体名称"> </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item class="form-id">
            <a-button type="primary" html-type="submit" class="button-style" @click="addClick">
              新增
            </a-button>
            <a-button type="primary" html-type="submit" class="button-style" @click="fetchData">
              查询
            </a-button>
            <a-button type="primary" html-type="submit" class="button-style"> 重置 </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <InteTable :tableData="tableData" />
  </div>
</template>
<script lang="ts" setup>
import { agentSearch, agentAdd } from '../utils/api'
import { onMounted, reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import type { FormProps } from 'ant-design-vue'
import InteTable from '../components/table/InteTable.vue'
interface FormState {
  id: string
  name: string
}
const formState: UnwrapRef<FormState> = reactive({
  id: '',
  name: ''
})
const tableData = ref([])
const modalForm = reactive({
  bot_info: '1111',
  bot_name: '222',
  user_info: '',
  user_name: ''
})
const items = [
  { name: 'bot_info', placeHolder: 'bot_info' },
  { name: 'bot_name', placeHolder: 'bot_name' },
  { name: 'user_info', placeHolder: 'user_info' },
  { name: 'user_name', placeHolder: 'user_name' }
]
const open = ref<boolean>(false)

const addClick = () => {
  open.value = true
}

const handleOk = async (e: MouseEvent) => {
  const okAdd = await agentAdd(modalForm)

  open.value = false
}
const fetchData = async () => {
  const res = await agentSearch({ bot_name: formState.name, _id: formState.id })
  tableData.value = res.data.aiList
}
onMounted(async () => {
  fetchData()
})
</script>
<style scoped>
.container {
  width: 100%;
}
.search-form {
  width: 100%;
}
.button-style {
  margin-right: 30px;
}
</style>
