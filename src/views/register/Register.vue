<template>
  <div class="register__body">
    <div class="register__header"></div>
    <div class="register__input">
      <input type="text" placeholder="请输入用户名"  v-model="username"/>
    </div>
    <div class="register__input">
      <input type="password" placeholder="请输入密码" v-model="password"/>
    </div>
    <div class="register__input">
      <input type="password" placeholder="确认密码" v-model="enspassword"/>
    </div>
    <div class="register__btn" @click="handleRegister">注册</div>
    <div class="register__gologin" @click="goLogin">已有账号，去登录</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>



<script>
import { useRouter } from "vue-router";
import { reactive, toRefs } from "vue";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

// 注册
const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "",enspassword:"" });
  const handleRegister = async () => {
    try {
      const result = await post("/api/user/register", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        showToast("注册成功");
        localStorage.isLogin = true;
        router.push({ name: "Login" });
      } else {
        showToast("注册失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password,enspassword } = toRefs(data);
  return { username, password,enspassword, handleRegister };
};

// 去登录
const LoginEffect = () => {
  const router = useRouter();
  const goLogin = () => {
    router.push({ name: "Login" });
  };
  return { goLogin };
};

export default {
  name: "Register",
  components:{
    Toast
  },
  setup() {
   
    // 弹窗
    const { showToast, toastMessage, show } = useToastEffect();
    // 注册
    const { username, password, handleRegister } = useRegisterEffect(showToast);
    // 跳转登录
    const { goLogin } = LoginEffect();
    return {
      handleRegister,
      goLogin,
      username,
      password,
      toastMessage,
      show,
    };
  },
};
</script>




<style lang="scss" scoped>
.register__body {
  margin: 120px auto;
  width: 300px;
  color: #999;
  .register__header {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    background-color: aqua;
    margin: 0px auto 40px;
  }
  .register__input {
    margin: auto;
    margin-bottom: 16px;
    input {
      border: none;
      width: 295px;
      height: 48px;
      background: #f9f9f9;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      outline: none;
      box-sizing: border-box;
      padding-left: 16px;
      margin: auto;
      color: #999;
    }
    input::-webkit-input-placeholder {
      color: #999;
    }
  }
  .register__btn {
    background: #0091ff;
    box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
    border-radius: 4px;
    color: #fff;
    margin: 16px auto;
    margin-top: 32px;
    width: 295px;
    height: 45px;
    border-top: 1px solid transparent;
    text-align: center;
    line-height: 45px;
  }
  .register__gologin {
    text-align: center;
    margin-top: 16px;
  }
}
</style>