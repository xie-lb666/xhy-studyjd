import {toRefs} from 'vue';
import { useStore } from "vuex";

export const useCommonCartEffect = () => {
    const store = useStore();
    const {
        cartList
    } = toRefs(store.state);
    // 添加
    const changeCartNum = (shopId, productId, item, num) => {
        // 存store
        console.log(shopId, productId, item, num);
        store.commit("changeCartNum", {
            shopId,
            productId,
            item,
            num
        });
    };
    return {
        cartList,
        changeCartNum
    };
};