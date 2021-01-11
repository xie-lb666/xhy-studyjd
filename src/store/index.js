import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    cartList: {}
  },
  mutations: {
    changeCartNum(state, obj) {
      const {
        shopId,
        productId,
        item,
        num
      } = obj;
      console.log(shopId, productId, item, num);
      let shopInfo = state.cartList[shopId];
      if (!shopInfo) {
        shopInfo = {};
      }
      let product = shopInfo[productId];
      if (!product) {
        product = item;
        product.count = 0;
      }
      product.count = product.count + num;
      if (product.count < 0) {
        product.count = 0;
      }
      shopInfo[productId] = product;
      state.cartList[shopId] = shopInfo;
    },
  },
  actions: {},
  modules: {}
})