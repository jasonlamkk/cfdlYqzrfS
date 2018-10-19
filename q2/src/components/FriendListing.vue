<template>
<div  class="page-listing">
    <md-list >
      <md-list-item v-for="f in state.friends" :key="f._id" v-on:click="selectFriend(f._id)">
        <md-avatar class="md-large">
          <img :src="f.picture" :alt="f.name">
        </md-avatar>
        <span class="md-list-item-text">{{f.name}}</span>
      </md-list-item>
    </md-list>
</div>
</template>

<script>
export default {
  name: 'FriendList',
  props: ['state','query'],
  methods: {
    selectFriend: function (id) {
        this.$root.selectFriend(id);
    }
  }
}
</script>