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
        <a-input :placeholder="item.placeHolder"></a-input>
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
            <a-button type="primary" html-type="submit" class="button-style"> 查询 </a-button>
            <a-button type="primary" html-type="submit" class="button-style"> 重置 </a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <InteTable />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
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

const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}
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
