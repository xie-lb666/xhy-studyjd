<template>
  <div class="docker">
    <div
      :class="{ docker__item: true, 'docker__item--active': item.flag == true }"
      v-for="item in dockList"
      :key="item.icon"
      @click="goPage(item.name)"
    >
      <div class="iconfont" v-html="item.icon"></div>
      <div class="docker__title">{{ item.text }}</div>
    </div>
  </div>
</template>
<script>
import {useRouter} from 'vue-router'
export default {
  name: "Docker",
  setup() {
    const router = useRouter();
    const dockList = [
      {
        icon: "&#xe630;",
        text: "首页",
        flag: true,
        link: "",
        name: "Home",
      },
      {
        icon: "&#xe604;",
        text: "购物车",
        flag: false,
        name: "Cart",
      },
      {
        icon: "&#xe63b;",
        text: "订单",
        flag: false,
        name: "Home",
      },
      {
        icon: "&#xe638;",
        text: "我的",
        flag: false,
         name: "Home",
      },
    ];

    const goPage = (data) => {
      console.log(data);
      router.push({
        name:data
      })
    };

    return {
      dockList,
      goPage
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.docker {
  display: flex;
  position: fixed;
  padding: 0 0.18rem;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.49rem;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #f1f1f1;
  background-color: $content-bgColor;
  .docker__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem;
      font-size: 0.18rem;
    }
  }
  .docker__item--active {
    color: #1fa4fc;
  }
  .docker__title {
    font-size: 20px;
    transform: scale(0.5, 0.5);
    transform-origin: center top;
  }
}
</style>