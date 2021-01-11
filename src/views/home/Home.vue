<template>
  <div id="app" class="app">
    <div class="wrapper">
      <StaticPart></StaticPart>
     <NearBy/>
    </div>
    <div class="bottom"></div>
  <Docker/>
  </div>
</template>


<script>
import StaticPart from './StaticPart';
import NearBy from './NearBy';
import Docker from './Docker';
export default {
    name:'Home',
    components:{
        StaticPart,
        NearBy,
        Docker
    }
}
</script>
<style lang="scss">
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

.app{
    padding:0 0 200px 0;
}

.wrapper {
//   position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  bottom: 0.5rem;
  padding: 0 0.18rem;
  box-sizing: border-box;
}
</style>

