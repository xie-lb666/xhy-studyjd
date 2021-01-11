<template>
  <div class="login__page">
    <div class="login__header"></div>
    <div class="login__from">
      <div class="login__input">
        <input
          type="text"
          class="input"
          placeholder="请输入用户名"
          v-model="username"
        />
      </div>
      <div class="login__input">
        <input
          type="password"
          class="input"
          placeholder="请输入密码"
          v-model="password"
          autocomplete="new-password"
        />
      </div>
      <div class="login__input">
        <button @click="handleLogin">登录</button>
      </div>
      <div class="lognin__footer">
        <span @click="goRegist">立即注册</span>|
        <span>忘记密码</span>
      </div>
    </div>
    <Toast :message="toastMessage" v-if="show" />
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { post } from "../../utils/request";
import Toast, { useToastEffect } from "../../components/Toast";

// 登录
const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({ username: "", password: "" });
  const handleLogin = async () => {
    try {
      const result = await post("/api/user/login", {
        username: data.username,
        password: data.password,
      });
      if (result?.errno === 0) {
        showToast("登录成功");
        localStorage.isLogin = true;
        router.push({ name: "Home" });
      } else {
        showToast("登录失败");
      }
    } catch (e) {
      showToast("请求失败");
    }
  };
  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};

// 跳转注册
const RegiestEffect = () => {
  const router = useRouter();
  const goRegist = () => {
    console.log("点击了注册");
    router.push({
      name: "Register",
    });
  };
  return { goRegist };
};

export default {
  name: "Login",
  components: {
    Toast,
  },
  // 让setup变为控制整个页面的流程
  setup() {
    // 弹窗
    const { showToast, toastMessage,show } = useToastEffect();
    // 登录
    const { username, password, handleLogin } = useLoginEffect(showToast);
    // 注册跳转
    const { goRegist } = RegiestEffect();

    return {
      handleLogin,
      goRegist,
      username,
      password,
      toastMessage,
      show
    };
  },
};
</script>
<style lang="scss" scoped>
.login__page {
  // width: 340px;
  height: 300px;
  margin: 40px auto;

  .login__header {
    width: 66px;
    height: 66px;
    margin: auto;
    border-radius: 50%;
    background-color: rosybrown;
  }
  .login__from {
    // width: 100%;
    // height: 100%;
    .login__input {
      margin: 20px auto;
      width: 80%;
      height: 48px;
      input,
      button {
        padding-left: 16px;
        width: 295px;
        height: 48px;
        outline: none;
        margin: 0;
        box-sizing: border-box;
      }
      button {
        background: #0091ff;
        box-shadow: 0 4px 8px 0 rgba(0, 145, 255, 0.32);
        border-radius: 4px;
        border-radius: 4px;
        border: none;
        color: #fff;
      }
    }
  }
  .lognin__footer {
    margin-top: 16px;
    text-align: center;
    span {
      margin: 0px 10px;
    }
  }
}
</style>