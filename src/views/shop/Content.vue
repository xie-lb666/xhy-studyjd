<template>
  <div class="content">
    <div class="nav">
      <div
        :class="{ nav__item: true, nav__item__active: navActive === item.tab }"
        v-for="item in nav"
        :key="item.id"
        @click="checkNav(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="body">
      <div class="body__item" v-for="item in contList" :key="item._id">
        <div class="body__item__image">
          <img :src="item.imgUrl" />
        </div>
        <div class="body__item__cent">
          <div class="item__title">
            {{ item.name }}
          </div>
          <div class="item__sales">月售 {{ item.sales }} 件</div>
          <div class="item__footer">
            <div>
              <span class="item__footer__price">
                <span>￥</span>{{ item.price }}</span
              >
              <span class="item__footer__oldprice">￥{{ item.oldPrice }}</span>
            </div>
            <div class="item__footer__btn">
              <div
                class="footer__btn__reduce"
                @click="changeCartNum(shopId, item._id, item,-1)"
              >
                -
              </div>
              <div class="footer__btn__number">
                {{ cartList?.[shopId]?.[item._id]?.count || 0 }}
              </div>
              <div
                class="footer__btn__add"
                @click="changeCartNum(shopId, item._id, item,1)"
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { reactive, ref, toRefs, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { get } from "../../utils/request";

// 获取数据相关逻辑
const useContentEffect = (navActive, shopId) => {
  const data = reactive({
    contList: [],
  });
  // 获取数据
  const getData = async () => {
    const res = await get(`/api/shop/${shopId}/products`, {
      tab: navActive.value,
    });
    console.log(res);
    // 判断有无数据
    if (res?.errno === 0 && res?.data?.length) {
      data.contList = res.data;
    }
  };

  // tab变化,
  watchEffect(() => {
    getData();
  });

  const { contList } = toRefs(data);
  return { contList, getData };
};

// 切换tab
const useTabEffect = () => {
  // 初始默认为 ‘全部’
  const navActive = ref("all");
  const checkNav = (tab) => {
    console.log("点击了切换:", tab);
    navActive.value = tab;
    // getData(tab);
  };
  return { navActive, checkNav };
};

// 购物车的逻辑

const useCartEffect = () => {
  const store = useStore();
  const { cartList } = toRefs(store.state);
  // 添加
  const changeCartNum = (shopId, productId, item,num) => {
    // 存store
    store.commit("changeCartNum", {
      shopId,
      productId,
      item,
      num
    });
  };
  return { cartList, changeCartNum };
};

export default {
  name: "Content",
  setup() {
    const route = useRoute();
    const shopId = route.params.id;

    // 定义初始数据
    const data = reactive({
      nav: [
        { name: "全部商品", id: "all", tab: "all" },
        { name: "秒杀", id: "seckill", tab: "seckill" },
        { name: "新鲜水果", id: "fruit", tab: "fruit" },
      ],
    });

    // 点击切换
    const { checkNav, navActive } = useTabEffect();
    // 获取数据
    const { contList } = useContentEffect(navActive, shopId);
    const { cartList, changeCartNum } = useCartEffect();
    // 解构nav
    const { nav } = toRefs(data);

    return {
      contList,
      checkNav,
      nav,
      navActive,
      cartList,
      shopId,
      changeCartNum
    };
  },
};
</script>


<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 150px;
  bottom: 50px;
}
.nav {
  width: 76px;
  height: 100%;
  background-color: $search-baColor;
  overflow-y: scroll;
  .nav__item {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .nav__item__active {
    background-color: $bgColor;
  }
}

.body {
  flex: 1;
  height: 100%;
  overflow-y: scroll;
  margin-left: 16px;
  padding-right: 18px;
  .body__item {
    display: flex;
    padding: 12px 0px;
    border-bottom: 1px solid $content-bgColor;
    .body__item__image {
      width: 68px;
      height: 68px;
      // background-color: forestgreen;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .body__item__cent {
      margin-left: 16px;
      flex: 1;
      overflow: hidden;
      .item__title {
        font-size: 14px;
        color: #333;
        @include ellipsis;
      }
      .item__sales {
        font-size: 12px;
        line-height: 16px;
        margin-top: 6px;
      }
      .item__footer {
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
        .item__footer__price {
          color: $hight-fontColor;
          font-size: 14px;
        }
        .item__footer__oldprice {
          text-decoration: line-through;
          margin-left: 6px;
        }
        .item__footer__btn {
          display: flex;
          align-content: center;
          .footer__btn__reduce {
            width: 20px;
            height: 20px;
            border: 1px solid #666666;
            border-radius: 50%;
            box-sizing: border-box;
            text-align: center;
            line-height: 20px;
            font-size: 18px;
          }
          .footer__btn__number {
            line-height: 20px;
            margin: 0px 10px;
          }
          .footer__btn__add {
            font-size: 18px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            box-sizing: border-box;
            background-color: $btn-baColor;
            text-align: center;
            line-height: 20px;
            color: $bgColor;
          }
        }
      }
    }
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>