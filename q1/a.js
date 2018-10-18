const paths = require('./paths.json');
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function findAllPath(paths){
    // console.log(paths);
    var pairs = {};
    var chains = [];

    //prepair
    for(var i = 0; i<paths.length; i++){
        let start = paths[i][0];
        for(var j = 1; j < paths[i].length; j++){
            let newPair = [start,paths[i][j]];
            newPair.sort();
            let key = "_"+newPair[0]+"_"+newPair[1];
            if(!pairs[key]){
                pairs[key] = newPair;
                if(start == 'A'){
                    chains.push(newPair);
                }
            }
        }
    }
    var ends = [];
    var pending = {};
    function addChain(pair){
        for(var i = 0; i < chains.length; i++){
            let ln = chains[i].length;
            let i0 = chains[i].indexOf(pair[0]);
            let i1 = chains[i].indexOf(pair[1]);
            if(i0==ln-1 && i1<0){
                let key = ''+i;
                if(typeof pending[key] == 'undefined'){
                    pending[key] = [pair];
                } else {
                    pending[key].push(pair);
                }
            }
        }
    }

    do{
        pending = {};
        for(var i in pairs){
            addChain(pairs[i]);
        }
        if(Object.size(pending) < 1){
            break;//exit
        }
        for(var k in pending){
            let i = parseInt(k);
            for(var j = 0; j<pending[k].length;j++){
                if(chains[i][chains[i].length-1]=='H') continue;
                let base = chains[i].slice(0);
                base.push(pending[k][j][1]);
                if(j==0){
                    chains.splice(i,1,base);
                } else {
                    chains.splice(i+j,0,base);    
                }
            }
        }
    }while(true);
    return chains;
}

//usage
let chains = findAllPath(paths);
chains.forEach(c=>{
    process.stdout.write(c.join('->')+"\n");
});