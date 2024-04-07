<template>
  <div class="contain">
    <a-table :columns="columns" :data-source="props.tableData" :loading="props.loading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <span>
            <a @click="editClick(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="deleteClick(record.uuid)">删除</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> 上传头像 </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { LineHeightOutlined } from '@ant-design/icons-vue'
import { agentDelete } from '../../utils/api'
import { defineEmits, ref } from 'vue'
import linter from 'ant-design-vue/es/_util/cssinjs/linters/legacyNotSelectorLinter'
const emit = defineEmits(['fetTableData'])
const modalEdit = defineModel('modalEdit')
const openModal = defineModel('openModal')
const props = defineProps({
  tableData: {
    type: Array
  },
  loading: {
    type: Boolean
  }
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
    key: 'bot_name',
    width: 120
  },
  {
    title: '用户设定',
    key: 'user_info',
    dataIndex: 'user_info',
    width: 250
  },
  {
    title: '用户名称',
    key: 'user_name',
    dataIndex: 'user_name',
    width: 120
  },
  {
    title: 'Action',
    key: 'action',
    width: 120
  }
]
const deleteClick = async (uuid: string) => {
  await agentDelete({ uuid: uuid })
  emit('fetTableData')
}
const editClick = async (record: any) => {
  modalEdit.value = record
  openModal.value = true
}
</script>
<style scoped>
.contain {
  width: 100%;
}
</style>
