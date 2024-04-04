<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0"></a-layout-header>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <a-menu
        v-model:selectedKeys="state.selectedKeys"
        v-model:openKeys="state.openKeys"
        theme="dark"
        mode="inline"
        :items="items"
        @click="menuClick"
      >
      </a-menu>
    </a-layout-sider>
    <router-view></router-view>
  </a-layout>
</template>
<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { MailOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const collapsed = ref<boolean>(false)
const state = reactive({
  collapsed: false,
  selectedKeys: ['2'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1']
})
const items = reactive([
  {
    key: 'sub1',
    label: '系统首页',
    title: '系统首页'
  },
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: '智能体管理',
    title: '智能体管理',
    children: [
      {
        key: '2',
        label: '智能体列表',
        title: '智能体列表'
      }
    ]
  }
])
const menuClick = () => {
  console.log('menuClick')
  router.push('/content')
}
</script>
<style lang="scss" scoped></style>
