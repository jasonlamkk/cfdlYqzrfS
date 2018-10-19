// const fs = require('fs');


// let rawSrc = fs.readFileSync(__dirname+'/FriendDetail.vue',{encoding:'utf-8'});
// let s = rawSrc.indexOf('<script')+'<script'.length+1;
// let e = rawSrc.indexOf('export', s);

// let src = rawSrc.substr(s,e-s);
// let r = eval(src);
// console.log(makeMapUrl);
// describe('FriendDetail', () => {
//     it('makeMapUrl shall format url correctly', () => {
//         let url = makeMapUrl(0.000001,0.000001);
//         console.log(url);
//     })
// })
import { mount } from '@vue/test-utils';
import FriendDetail from './FriendDetail.vue';

const wrapper = mount(FriendDetail);
console.log(wrapper.find('.md-list-item-text'))
describe('FriendDetail', () => {
    it('init title shall be All Friends', () => {
        // let o = new FriendDetail();
        // console.log(App);
        // const Constructor = Vue.extend(TestMe);
        // expect(wrapper.find('.md-title span').text()).toBe('All Friends');
    })
})