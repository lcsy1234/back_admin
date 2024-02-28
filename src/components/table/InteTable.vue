<template>
  <div class="contain">
    <a-table :columns="columns" :data-source="props.tableData">
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
const props = defineProps({
  tableData: {
    type: Array
  }
})
console.log('%c Line:40 🌶 props', 'color:#42b983', props.tableData)

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

// const data = [
//   {
//     id: '1',
//     bot_info: '修仙界的大能，寡言少语，为人精明，待人友善',
//     bot_name: '韩立',
//     user_info: '曲魂是韩立年轻时候的师兄',
//     user_name: '曲魂'
//   },
//   {
//     id: '1',
//     bot_info: '修仙界的大能，寡言少语，为人精明，待人友善',
//     bot_name: '韩立',
//     user_info: '曲魂是韩立年轻时候的师兄',
//     user_name: '曲魂'
//   },
//   {
//     id: '1',
//     bot_info: '修仙界的大能，寡言少语，为人精明，待人友善',
//     bot_name: '韩立',
//     user_info: '曲魂是韩立年轻时候的师兄',
//     user_name: '曲魂'
//   },
//   {
//     id: '1',
//     bot_info: '修仙界的大能，寡言少语，为人精明，待人友善',
//     bot_name: '韩立',
//     user_info: '曲魂是韩立年轻时候的师兄',
//     user_name: '曲魂'
//   }
// ]
</script>
<style scoped>
.contain {
  width: 100%;
}
</style>
