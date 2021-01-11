<template>
  <div>
    <div class="postion">
      <div class="iconfont postion__icon">&#xe76f;</div>
      <div class="postion__text">湖南信息职业技术学院 南4 栋620室</div>
      <div class="iconfont postion__icon">&#xe619;</div>
    </div>
    <div class="search">
      <div class="iconfont search__icon">&#xe70b;</div>
      <div class="search__input">
        <input
          type="text"
          style="border: none"
          name=""
          id=""
          placeholder="山姆大叔的商店"
        />
      </div>
    </div>
    <div class="banner">
      <img
        class="banner__img"
        src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
        alt=""
      />
    </div>
    <div class="icons">
      <div class="icons__item" v-for="item in iconList" :key="item.id">
        <img
          :src="item.icon"
          class="icons__item__img"
          alt=""
        />
        <div class="icons__item__desc">{{item.text}}</div>
      </div>
    </div>
    <div class="gap"></div>
  </div>
</template>
<script>
export default {
  name:'',
  setup() {
const  iconList = [{icon:'http://www.dell-lee.com/imgs/vue3/超市.png',text:'超市便利',id:0},
{icon:'http://www.dell-lee.com/imgs/vue3/超市.png',text:'超市便利',id:1},
{icon:'http://www.dell-lee.com/imgs/vue3/超市.png',text:'超市便利',id:2},
{icon:'http://www.dell-lee.com/imgs/vue3/超市.png',text:'超市便利',id:4},
{icon:'http://www.dell-lee.com/imgs/vue3/超市.png',text:'超市便利',id:3},
{icon:'http://www.dell-lee.com/imgs/vue3/超市.png',text:'超市便利',id:5},
{icon:'http://www.dell-lee.com/imgs/vue3/超市.png',text:'超市便利',id:6},
{icon:'http://www.dell-lee.com/imgs/vue3/超市.png',text:'超市便利',id:7}]
    return {iconList}
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

 .postion {
    padding: 0.16rem 0;
    line-height: 0.22rem;
    font-size: 0.16rem;
    display: flex;
    justify-content: space-between;
    align-content: center;
    color: $content-fontcolor;
    .postion__text {
      // 省略号
      @include ellipsis;
      margin-left: 0.02rem;
      color: $content-fontcolor;
    }

    .postion__icon {
      font-size: 0.2rem;
    }
  }
  .search {
    height: 0.32rem;
    line-height: 0.32rem;
    background: chartreuse;
    color: $search-fontColor;
    border-radius: 0.16rem;
    font-size: 0.14rem;
    display: flex;
    .search__icon {
      display: inline-block;
      font-size: 0.16rem;
      margin-left: 0.1rem;
      padding: 0 0.12rem 0 0.16rem;
    }
    .search__input {
      flex: 1;
      input {
        padding: 0;
        margin: 0;
        width: 98%;
        background-color: chartreuse;
        border: none;
        outline: none;
      }
      input:focus {
        border: none;
      }
    }
  }
  .banner {
    margin-top: 0.12rem;

    // 高度设为0   设一个底内边，然后隐藏，占个位置
    height: 0;
    padding-bottom: 25.5%;
    overflow: hidden;

    //
    .banner__img {
      width: 100%;
    }
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: 0.2rem;

    .icons__item {
      width: 20%;
      .icons__item__img {
        width: 0.4rem;
        height: 0.4rem;
        margin: 0 auto;
        display: block;
      }
      .icons__item__desc {
        margin: 0.06rem 0rem 0.16rem 0rem;
        text-align: center;
        color: $content-fontcolor;
      }
    }
  }
  .gap {
    height: 0.1rem;
    background-color: $content-bgColor;
    margin: 0 -0.18rem;
  }
</style>