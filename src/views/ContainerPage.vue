<template>
  <div class="container">
    <a-form class="search-form" :model="formState" ref="formRef">
      <a-row :gutter="[16, 16]">
        <a-col :span="8">
          <a-form-item class="form-id" name="id">
            <a-input v-model:value="formState.id" placeholder="智能体ID" class="form-id"> </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item class="form-id" name="name">
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
            <a-button type="primary" html-type="submit" class="button-style" @click="resetClick">
              重置
            </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <InteTable
      :tableData="tableData"
      :loading="loading"
      @fetTableData="fetchData"
      v-model:modalEdit="modalEdit"
      v-model:openModal="openModal"
    />
    <AddModal v-model:open="openModal" @fetTableData="fetchData" v-model:modalEdit="modalEdit" />
  </div>
</template>
<script lang="ts" setup>
import { agentSearch, agentAdd } from '../utils/api'
import { onMounted, reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import InteTable from '../components/table/InteTable.vue'
import AddModal from '@/components/modal/AddModal.vue'
interface FormState {
  id: string
  name: string
}
const modalEdit = ref({
  uuid: '',
  bot_info: '',
  bot_name: '',
  user_info: '',
  user_name: ''
})
const openModal = ref<boolean>(false)
const loading = ref(false)
const formState: UnwrapRef<FormState> = reactive({
  id: '',
  name: ''
})
const formRef = ref()
const tableData = ref([])

const addClick = () => {
  openModal.value = true
}

const fetchData = async () => {
  loading.value = true
  const res = await agentSearch({ bot_name: formState.name, _id: formState.id })
  const AddIdRes = res.data.aiList.map((item: any, index: number) => {
    item.id = index + 1
    return item
  })
  AddIdRes.sort((a: any, b: any) => a.id - b.id)
  tableData.value = AddIdRes
  loading.value = false
}
const resetClick = () => {
  formRef.value.resetFields()
  fetchData()
}
onMounted(async () => {
  fetchData()
})
</script>
<style scoped>
.container {
  width: 100%;
  padding: 30px 16px;
}
.search-form {
  width: 100%;
}
.button-style {
  margin-right: 30px;
}
</style>
