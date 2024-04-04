<template>
  <a-layout class="login-layout">
    <a-card class="login-card" size="default" hoverable>
      <div class="header">智能体管理后台</div>
      <a-form :model="formState" @submit="handleSubmit">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名!' }]">
          <a-input placeholder="用户名" prefix-icon="user" />
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码!' }]">
          <a-input type="password" placeholder="密码" prefix-icon="lock" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block> 登录 </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </a-layout>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
const formState = reactive({
  username: 'admin',
  password: 'ling'
})
const router = useRouter()
const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    console.log('Success:', formState)
    router.push('/content')
  } catch (errorInfo) {
    console.log('Failed:', errorInfo)
  }
}
</script>
<style scoped>
.login-layout {
  height: 100vh;
  width: 100vw;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('https://oss.laf.run/frckqy-data/51miz-P210999-008F9D62-3840x1988 (1).jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.header {
  border-bottom: 1px solid #ccc;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 16px;
  padding-bottom: 16px;
}
.login-content {
  max-width: 600px;
}
.login-card {
  width: 600px;
  z-index: 1;
  opacity: 0.8;
  background: rgb(2, 49, 71);
  color: white;
}
.bg-video {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100vw;
}
</style>