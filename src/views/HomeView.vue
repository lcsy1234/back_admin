<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
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
    <!-- <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        Content
      </a-layout-content>
    </a-layout> -->
    <router-view></router-view>
  </a-layout>
</template>
<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { MailOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
// const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)
const state = reactive({
  collapsed: false,
  selectedKeys: ['1'],
  openKeys: ['sub1'],
  preOpenKeys: ['sub1']
})
const items = reactive([
  {
    key: 'sub1',
    icon: () => h(MailOutlined),
    label: '智能体管理',
    title: '智能体管理',
    children: [
      {
        key: '1',
        label: '故事集列表',
        title: '故事集列表'
      },
      {
        key: '2',
        label: '智能体列表',
        title: '智能体列表'
      },
      {
        key: '3',
        label: '故事集详情',
        title: '故事集详情'
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
