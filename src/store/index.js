import Vuex from 'vuex'

const setLocalstorage = (state) => {
  const {
    cartList
  } = state;
  const cartListString = JSON.stringify(cartList);
  localStorage.cartList = cartListString;
};

const getLocalStorage = () => {
  let list = JSON.parse(localStorage.cartList);
  return list||{};
}

export default Vuex.createStore({
  state: {
    cartList :getLocalStorage()
    // cartList: {
    //   // shopId:{
    //   //   shopName:'沃尔玛',
    //   //     _id:'1',
    //   //     name:'西红柿',
    //   //     imgurl:'../../',
    //   //     sales:10,
    //   //     price:22.2,
    //   //     oldPrice:29.9,
    //   //     count:2
    //   // }
    // }
  },
  mutations: {
    // 加和减
    changeCartNum(state, obj) {
      const {
        shopId,
        productId,
        item,
        num
      } = obj;
      let shopInfo = state.cartList[shopId] || {};
      let product = shopInfo[productId];
      if (!product) {
        product = item;
        product.count = 0;
      }
      product.count = product.count + num;
      if (obj.num > 0) {
        product.check = true;
      }
      if (product.count < 0) {
        product.count = 0;

      }
      shopInfo[productId] = product;
      state.cartList[shopId] = shopInfo;
      setLocalstorage(state);
    },
    // 选择单个
    changeCartChecked(state, obj) {
      const {
        shopId,
        productId
      } = obj;
      const item = state.cartList[shopId][productId];
      item.check = !item.check;
      setLocalstorage(state);
    },
    // 清空购物车
    cleanCart(state, data) {
      console.log("触发清空");
      const {
        shopId
      } = data;
      state.cartList[shopId] = {};
      setLocalstorage(state);
    },
    // 全选
    setAllCart(state, data) {
      const {
        shopId
      } = data;
      const item = state.cartList[shopId];
      if (item) {
        for (let i in item) {
          console.log(item[i]);
          item[i].check = true;
        }
      }
      setLocalstorage(state);
    }
  },
})