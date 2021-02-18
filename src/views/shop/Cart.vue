<template>
  <div>
    <div class="mask" v-if="showCart && total > 0" @click="setShow"></div>
    <div class="box">
      <div class="products" v-if="showCart && total > 0">
        <div class="products__header">
          <div class="products__header__all" @click="allCart">
            <span
              class="iconfont"
              v-html="allChecked ? '&#xe61a;' : '&#xe61b;'"
            ></span
            >全选
          </div>
          <div class="products__header__clear" @click="cleanCart">
            清空购物车
          </div>
        </div>
        <template v-for="(item, index) in produstList" :key="index">
          <div class="body__item" v-if="item.count > 0">
            <div
              class="iconfont"
              v-html="item.check ? '&#xe61a;' : '&#xe61b;'"
              @click="changeCartCheck(item._id)"
            ></div>
            <div class="body__item__image">
              <img :src="item.imgUrl" />
            </div>
            <div class="body__item__cent">
              <div class="item__title">
                {{ item.name }}
                <div class="item__footer">
                  <div>
                    <span class="item__footer__price">
                      <span>￥</span>{{ item.price }}</span
                    >
                    <span class="item__footer__oldprice"
                      >￥{{ item.oldPrice }}</span
                    >
                  </div>
                  <div class="item__footer__btn">
                    <div
                      class="footer__btn__reduce"
                      @click="changeCartNum(shopId, item._id, item, -1)"
                    >
                      -
                    </div>
                    <div class="footer__btn__number">
                      {{ item.count || 0 }}
                    </div>
                    <div
                      class="footer__btn__add"
                      @click="changeCartNum(shopId, item._id, item, 1)"
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="cart">
        <div class="cart__body">
          <div class="cart__body__image">
            <div class="body__image__num">{{ total }}</div>
            <img src="../../assets/images/basket.png" alt="" @click="setShow" />
          </div>
          <div class="cart__body__text">
            总计：<span class="body__text__price">￥{{ price }}</span>
          </div>
        </div>
        <div class="cart__btn" @click="goPage()">结算</div>
      </div>
    </div>
  </div>
</template>



<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { useCommonCartEffect } from "./useCartEffect";

const useCartEffect = () => {
  const store = useStore();
  const route = useRoute();
  const shopId = route.params.id;
  const cartList = store.state.cartList;
  // 这里的  computed可以优化
  const total = computed(() => {
    console.log(cartList);
    const productList = cartList[shopId];
    console.log(shopId, total);
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        console.log("================", product);
        count += product.count;
      }
      console.log(count);
    }
    return count;
  });
  const price = computed(() => {
    const productList = cartList[shopId];
    let count = 0;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.check) {
          count += product.count * product.price;
        }
      }
    }
    return count.toFixed(2);
  });
  const produstList = computed(() => {
    const produstList = cartList[shopId] || [];
    return produstList;
  });

  // 选择
  const changeCartCheck = (productId) => {
    console.log("点击", shopId);
    store.commit("changeCartChecked", {
      shopId,
      productId,
    });
  };
  // 清空
  const cleanCart = () => {
    store.commit("cleanCart", {
      shopId,
    });
  };
  // 全选
  const allChecked = computed(() => {
    const productList = cartList[shopId];
    let result = true;
    if (productList) {
      for (let i in productList) {
        const product = productList[i];
        if (product.count > 0 && !product.check) {
          result = false;
        }
      }
    }
    return result;
  });
  // 全选
  const allCart = () => {
    store.commit("setAllCart", {
      shopId,
    });
  };

  const { changeCartNum } = useCommonCartEffect();
  return {
    total,
    price,
    produstList,
    changeCartNum,
    changeCartCheck,
    cleanCart,
    allCart,
    allChecked,
    shopId,
  };
};

const useShowEffect = () => {
  const showCart = ref(false);

  const setShow = () => {
    showCart.value = !showCart.value;
  };

  return { showCart, setShow };
};

const useRouteEffect = () => {
  const router = useRouter();
  const route = useRoute();
  const shopId = route.params.id;
  const goPage = () => {
    console.log("跳转路由");
    router.push({
      path: "/Order",
      query: {
        shopId: shopId,
      },
    });
  };
  return { goPage };
};

export default {
  name: "Cart",
  setup() {
    const {
      total,
      price,
      produstList,
      changeCartNum,
      changeCartCheck,
      cleanCart,
      allCart,
      allChecked,
      shopId,
    } = useCartEffect();

    const { showCart, setShow } = useShowEffect();

    const { goPage } = useRouteEffect();

    return {
      total,
      price,
      produstList,
      changeCartNum,
      changeCartCheck,
      cleanCart,
      allCart,
      allChecked,
      setShow,
      showCart,
      goPage,
      shopId,
    };
  },
};
</script>


<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: rgba($color: #000000, $alpha: 0.5);
}
.box {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 9;
  border-top: 1px solid #f1f1f1;
}
.cart {
  height: 50px;
  display: flex;
  // box-sizing: border-box;
}
.cart__body {
  display: flex;
  flex: 1;
  align-items: center;
  box-sizing: border-box;
  padding-left: 24px;
  .cart__body__image {
    position: relative;
    img {
      width: 28px;
      height: 26px;
      vertical-align: middle;
    }
    .body__image__num {
      width: 10px;
      height: 10px;
      position: absolute;
      top: 0px;
      right: -10px;
      border-radius: 50%;
      color: #ffffff;
      background: #e93b3b;
      text-align: center;
      line-height: 10px;
      font-size: 12px;
    }
  }
  .cart__body__text {
    margin-left: 32px;
    .body__text__price {
      font-size: 18px;
      color: #e93b3b;
    }
  }
}
.cart__btn {
  height: 50px;
  width: 100px;
  background: #4fb0f9;
  color: #ffffff;
  font-size: 14px;
  line-height: 50px;
  text-align: center;
}

.products {
  .products__header {
    height: 50px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .products__header__all {
      padding-left: 18px;
    }
    .products__header__clear {
      // flex: 1;
      font-size: 14px;
      color: #333;
      margin-right: 16px;
    }
  }
  .body__item {
    display: flex;
    padding: 12px;
    border-bottom: 1px solid $content-bgColor;
    align-items: center;
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
</style>