const fs = require('fs');

let rawSrc = fs.readFileSync(__dirname+'/FriendDetail.vue',{encoding:'utf-8'});
let s = rawSrc.indexOf('<script')+'<script'.length+1;
let e = rawSrc.indexOf('export', s);

let src = rawSrc.substr(s,e-s).replace('const ', 'var ');
let r = eval(src);

let window = {
    width: 320
};//stub window object

describe('FriendDetail', () => {
    it('makeMapUrl shall format url correctly', () => {
        let url = makeMapUrl(0.000001,0.000001);
        url.indexOf('center=0.000001,0.000001').should.be.greaterThan(-1);
        // .should.greaterThan(-1);
        url.indexOf('color:red%7Clabel:%7C0.000001,0.000001').should.be.greaterThan(-1);
        // console.log(url.indexOf('color:red%7Clabel:%7C0.000001,0.000001'));
    })
})
