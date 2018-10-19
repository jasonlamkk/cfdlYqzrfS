<template>
    <div class="page-detail">
        <img class="mapmap" :src="mapUrl"/>
        <md-list >
        <md-list-item >
            <md-avatar class="md-large">
            <img :src="f.picture" :alt="f.name">
            </md-avatar>
            <span class="md-list-item-text">{{f.name}}</span>
        </md-list-item>
        </md-list>
    </div>
</template>

<script>
const makeMapUrl = function (lat, lng) {
    let w = window.innerWidth;
    let h = parseInt(w * 3 / 4);
    if(h < 200){
        h = 200;
    }
    let ll = lat+','+lng;
    return '//maps.googleapis.com/maps/api/staticmap?center='+ll+'&zoom=13&size='+w+'x'+h+'&maptype=roadmap&markers=color:red%7Clabel:%7C'+ll+'&key=AIzaSyCrWWC1t_438RY2cn0jO7t6KrijjFY7JfU'
};
export default {
  name: 'FriendDetail',
  props: ['state','query', 'f'],
  computed: {
    mapUrl: function () {
        try{
            let la = this.f.location.latitude;
            let lg = this.f.location.longitude;
            
            return makeMapUrl(la, lg);
        }catch(e){
            // console.error('no friend selected', e);
        }
        return '';
    }
  }
}
</script>
