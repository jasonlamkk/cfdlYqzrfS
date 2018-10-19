<template>
  <span id="topNavBar">
      <md-toolbar md-elevation="0" class="md-primary">
      <md-button v-if="state.friendID!==null" class="md-icon-button" @click="($root.resetHome());" >
        <md-icon class="md-size-2x" ><img src="/img/img-back.png"/></md-icon>
      </md-button>
    </md-toolbar>

    <div class="x-center-top md-layout-item" >
        <div class="md-layout-item md-alignment-center-center md-title">
            <span v-if="state.friendID!==null">Your Friend</span>
            <span v-if="state.friendID===null">All Friends</span>
        </div>
    </div>
  </span>
</template>

<script>
export default {
  name: 'TopNavBar',
  props: ['state'],
  methods: {
    resetHome: function(){
        return this.$root.resetHome;
    }
  }
}
</script>
