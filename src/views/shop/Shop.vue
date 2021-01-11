<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBack">&#xe618;</div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe70b;</span>
        <input class="search__content__input" placeholder="请输入商品名称" />
      </div>
    </div>
    <ShopInfo :item="item" v-show="item.imgUrl" />
    <Content />
    <Cart/>
  </div>
</template>



<script>
import { reactive, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";

import { get } from "../../utils/request";

import ShopInfo from "../../components/ShopInfo";
import Content from "./Content";
import Cart from './Cart';


const useShopInfoEffect = () => {
  /**
   * 获得路由，
   * 传递id
   * 请求数据
   */
  const route = useRoute();
  const id = route.params.id;
  const data = reactive({
    item: {},
  });

  const getItemData = async () => {
    const res = await get(`/api/shop/${id}`);
    console.log(res);
    data.item = res.data;
  };
  const { item } = toRefs(data);
  return { item, getItemData };
};

const useBackEffect = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return handleBack;
};

export default {
  name: "Shop",
  components: {
    ShopInfo,
    Content,
    Cart
  },
  setup() {
    const { item, getItemData } = useShopInfoEffect();
    const handleBack = useBackEffect();
    getItemData();

    return { item, handleBack };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
.wrapper {
  padding: 0 18px;
}
.search {
  margin: 20px 0 4px 0px;
  display: flex;
  align-items: center;
  .search__back {
    width: 30px;
    height: 32px;
    font-size: 24px;
    color: #b6b6b6;
    line-height: 32px;
  }
  .search__content {
    flex: 1;
    background-color: $search-baColor;
    border-radius: 16px;
    display: flex;
    .search__content__icon {
      width: 44px;
      height: 32px;
      text-align: center;
      color: $search-fontColor;
      line-height: 32px;
    }
    .search__content__input {
      height: 32px;
      border: none;
      outline: none;
      //   width: 100%;
      display: block;
      padding-right: 20px;
      background-color: $search-baColor;
      font-size: 14px;
      &::placeholder {
        color: #333;
      }
    }
  }
}
</style>