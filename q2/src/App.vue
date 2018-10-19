<template>
    <div id="app">
        <TopNavBar :state="state"></TopNavBar>
        <router-view class="page-bg"/>
    </div>
</template>

<script>
import TopNavBar from './components/NavBar.vue';
export default {
  name: 'app',
  props: ['state'],
  components: { 
      TopNavBar
  },
  mounted(){
     this.$nextTick(() => {
        let h = window.innerHeight;
        let target = document.querySelector('.page-bg');
        if(target){ target.style.minHeight = (h-48)+"px"; }
    },1)
  }
}
</script>

