<template>
  <div class="contain">
    <a-table :columns="columns" :data-source="data">
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
            <a>编辑</a>
            <a-divider type="vertical" />
            <a>删除</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> 对话测试 </a>
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '形象集合',
    dataIndex: 'group',
    key: 'group'
  },
  {
    title: '人物设定',
    key: 'character',
    dataIndex: 'character'
  },
  {
    title: '上线时间',
    key: 'upTime',
    dataIndex: 'upTime'
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime'
  },
  {
    title: 'Action',
    key: 'action'
  }
]

const data = [
  {
    id: '1',
    name: 'John Brown',
    group: 32,
    character: '小武',
    upTime: '3333',
    updateTime: '44444',
    tags: ['上线']
  },
  {
    id: '1',
    name: 'John Brown',
    group: 32,
    character: '小武',
    upTime: '3333',
    updateTime: '44444',
    tags: ['上线']
  },
  {
    id: '1',
    name: 'John Brown',
    group: 32,
    character: '小武',
    upTime: '3333',
    updateTime: '44444',
    tags: ['上线']
  },
  {
    id: '1',
    name: 'John Brown',
    group: 32,
    character: '小武',
    upTime: '3333',
    updateTime: '44444',
    tags: ['下线']
  }
]
</script>
<style scoped>
.contain {
  width: 100%;
}
</style>
