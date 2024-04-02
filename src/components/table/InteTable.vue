<template>
  <div class="contain">
    <a-table :columns="columns" :data-source="props.tableData" :loading="props.loading">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'"> </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="editClick(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="deleteClick(record.uuid)">删除</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> 对话测试 </a>
          </span>
        </template>
      </template>
    </a-table>
    <AddModal v-model:open="openModel" :modal-edit="modalEdit" />
  </div>
</template>
<script lang="ts" setup>
import { agentDelete } from '../../utils/api'
import { defineEmits, ref } from 'vue'
import AddModal from '../modal/AddModal.vue'
const emit = defineEmits(['updateTableData'])
const props = defineProps({
  tableData: {
    type: Array
  },
  loading: {
    type: Boolean
  }
})
const openModel = ref<boolean>(false)
const modalEdit = ref({
  uuid: '',
  bot_info: '',
  bot_name: '',
  user_info: '',
  user_name: ''
})

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '机器人信息',
    dataIndex: 'bot_info',
    key: 'bot_info'
  },
  {
    title: '机器人名称',
    dataIndex: 'bot_name',
    key: 'bot_name'
  },
  {
    title: '用户设定',
    key: 'user_info',
    dataIndex: 'user_info'
  },
  {
    title: '用户名称',
    key: 'user_name',
    dataIndex: 'user_name'
  },
  {
    title: 'Action',
    key: 'action'
  }
]
const deleteClick = async (uuid: string) => {
  await agentDelete({ uuid: uuid })
  emit('updateTableData')
}
const editClick = async (record: any) => {
  modalEdit.value = record
  openModel.value = true
}
</script>
<style scoped>
.contain {
  width: 100%;
}
</style>
