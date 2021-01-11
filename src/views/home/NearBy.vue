<template>
  <div class="nearby">
    <h3 class="nearby__title">附进店铺</h3>
    <router-link  
    v-for="item in nearlist" 
    :key="item._id" 
    :to="`/shop/${item._id}`">
    <ShopInfo
    :item="item"/>
    </router-link>
  </div>
</template>
<script>
import { ref } from "vue";
import { get } from "../../utils/request";
import ShopInfo from "../../components/ShopInfo";

// 封装一个
const useNearbyListEffect = () => {
  const nearlist = ref([]);

  // 获得列表数据
  const getNavbyList = async () => {
    const res = await get("/api/shop/hot-list");
    console.log(res);
    nearlist.value = res.data;
    console.log(nearlist);
  };
  return { nearlist, getNavbyList };
};

export default {
  name: "NearBy",
  components: {
    ShopInfo,
  },
  setup() {
    // 获得首页数据
    const { nearlist, getNavbyList } = useNearbyListEffect();
    getNavbyList();
    return { nearlist };
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";
.nearby {
  .nearby__title {
    margin: 0.16rem 0rem 0.04rem 0rem;
    color: $content-fontcolor;
    font-size: 0.18rem;
    font-weight: normal;
  }
a{
  text-decoration: none;
}
}
</style>