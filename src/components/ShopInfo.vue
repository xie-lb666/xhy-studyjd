<template>
  <div class="shop">
    <!-- qqq -->
    <div class="shop__item__imgbox">
      <img :src="item.imgUrl" class="shop__img" alt="" />
    </div>
    <div :class="{ shop__content: true, 'shop__content--border': showBoder }">
      <div class="shop__content__title">{{ item.name }}</div>
      <div class="shop__content__tags">
        <div class="shop__content__tag">月售： {{ item.sales }}</div>
        <div class="shop__content__tag">起送： {{ item.expressLimit }}</div>
        <div class="shop__content__tag">基础运费 {{ item.expressPrice }}</div>
      </div>
      <div class="shop__content__height">{{ item.slogan }}</div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ShopInfo",
  props: {
    item: {
      type: Object,
      default: () =>  {}
      ,
    },
    showBoder: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
@import "../style/mixins.scss";
.shop {
  display: flex;
  padding-top: 0.12rem;
  .shop__item__imgbox {
    margin-right: 0.2rem;
  }
  .shop__img {
    width: 0.56rem;
    height: 0.56rem;
  }
  .shop__content--border {
    border-bottom: 1px solid $content-bgColor;
    //  border-bottom: 1px solid red;
  }
  .shop__content {
    flex: 1;
    .shop__content__title {
      font-size: 0.16rem;
      line-height: 0.22rem;
      color: $content-fontcolor;
    }
    .shop__content__tags {
      line-height: 0.18rem;
      font-size: 0.13rem;
      display: flex;
      .shop__content__tag {
        margin-right: 0.16rem;
      }
    }
    .shop__content__height {
      color: #e39b3b;
      line-height: 0.18rem;
      font-size: 0.13rem;
      margin: 0.04rem 0 0.04rem 0;
    }
  }
}
</style>