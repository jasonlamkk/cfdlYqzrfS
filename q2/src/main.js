import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import VueMaterial from 'vue-material';
Vue.use(VueMaterial);

import FriendListing from './components/FriendListing.vue';
import FriendDetail from './components/FriendDetail.vue';
import App from './App.vue';
import 'vue-material/dist/vue-material.min.css';
import './assets/spa.css';

const dataUrl = "http://www.json-generator.com/api/json/get/cfdlYqzrfS";
const dataFetchOption = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  mode: "cors", // no-cors, cors, *same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "omit", // include, same-origin, *omit
  headers: {
      "Accept": "application/json",
  },
  redirect: "follow", // manual, *follow, error
  referrer: "no-referrer", // no-referrer, *client
}
// const User = {
//   name: 'User',
//   props: ['id','state','query'],
//   template: '<div>User: {{id}} <br/> A:{{query}} {{state.friends}} </div>',
//   // mounted() {
//   //   debugger
//   // },
// };
Vue.config.productionTip = false;
let data = {
  state: {
    friendID: null,
    friends:[{"location": {"latitude": -25.446305, "longitude": 95.415437}, "picture": "http://placehold.it/32x32", "_id": "5ab8706aee622a5ef85cb2c4", "name": "Cook Mckay", "email": "cookmckay@xiix.com"},],
  }
};
var vm;

const selectFriend = (id)=>{
  let s = vm.state;
  s.friendID = id;
  vm.state = s;
  if(id){
    router.replace({ path: '/friend'})
  } else {
    router.replace({ path: '/'})
  }
};
const resetHome = () => {
  selectFriend(null);
};

const router = new VueRouter({
  mode:'history',
  base: '/',
  routes: [
    { path: '', component: FriendListing, props: (route) => ({
        query: route.query,
        state: data.state,
      })
    },
    { path: '/friend', component: FriendDetail, props: (route) => { 
        var f = null;
        if(data.state.friendID && Array.isArray(data.state.friends)){
          f = data.state.friends.find(e=>e._id===data.state.friendID);
        }
        return ({
          query: route.query,
          state: data.state,
          f: f,
        });
      }
    }
  ]
});
vm = new Vue({
  data: data,
  router:router,
  template: '<App :state="state"/>',
  components: { 
    App
  },
  beforeMount(){
    if(this._route.path == "/" ){
      this.state.friendID = null;
    } else if(this.state.friendID === null){
      router.replace({ path: '/'});
    }
    fetch(dataUrl, dataFetchOption).then(r=>{
      r.json().then(jo=>{
        let s = vm.state;
        s.friends = jo;
        vm.state = s;
      });
    }).catch((e)=>{
      // console.log(e);
      alert("no internet!",e);
    })
  },
}).$mount('#app');
vm.selectFriend = selectFriend;
vm.resetHome = resetHome;