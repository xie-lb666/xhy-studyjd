<template>
  <div class="cart">
    <div class="cart__body">
      <div class="cart__body__image">
        <div class="body__image__num">{{ total }}</div>
        <img src="../../assets/images/basket.png" alt="" />
      </div>
      <div class="cart__body__text">
        总计：<span class="body__text__price">￥{{price}}</span>
      </div>
    </div>
    <div class="cart__btn">结算</div>
  </div>
</template>



<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";


const useCartEffect = () =>{

const store = useStore();
    const route = useRoute();
    const shopId = route.params.id;
    const cartList = store.state.cartList;
    const total = computed(() => {
      const productList = cartList[shopId];
      console.log(shopId, total);
      let count = 0;
      if (productList) {
        for (let i in productList) {
          const product = productList[i];
          count += product.count;
        }
        console.log(count);
      }
      return count;
    });
    const price = computed(() => {
      const productList = cartList[shopId];
      console.log(shopId, total);
      let count = 0;
      if (productList) {
        for (let i in productList) {
          const product = productList[i];
          count += (product.count * product.price);
        }
        console.log(count);
      }
      return count.toFixed(2);
    });
    console.log("个数", total);
    return {total,price};

}


export default {
  name: "Cart",
  setup() {
    const {total,price}  = useCartEffect();
    return { total,price };
  },
};
</script>


<style lang="scss" scoped>
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  height: 50px;
  display: flex;
  border-top: 1px solid #f1f1f1;
  box-sizing: border-box;
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
</style>