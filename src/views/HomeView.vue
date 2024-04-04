<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">智能体后台管理</div>
      <div class="user-profile">
        <a-dropdown trigger="click">
          <a class="ant-dropdown-link" @click.prevent style="display: flex">
            <img
              class="avator"
              src="https://oss.laf.run/frckqy-data/微信图片_20240401214643.jpg"
              alt=""
            />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item key="logout" @click="logout">
                <a-icon type="logout" />
                退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout>
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
      <div style="background-color: #fff">
        <router-view></router-view>
      </div>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { h, reactive, ref } from 'vue'
import { MailOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const logout = () => {
  router.push('/login')
}
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
<style  scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
}
.avator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user-profile {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
