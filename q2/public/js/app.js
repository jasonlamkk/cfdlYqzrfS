const makeMapUrl = (lat, lng) => {
    let w = $(window).width();
    let h = parseInt(w * 3 / 4);
    if(h < 200){
        h = 200;
    }
    let ll = lat+','+lng;
    return '//maps.googleapis.com/maps/api/staticmap?center='+ll+'&zoom=13&size='+w+'x'+h+'&maptype=roadmap&markers=color:red%7Clabel:%7C'+ll+'&key=AIzaSyCrWWC1t_438RY2cn0jO7t6KrijjFY7JfU'
}
class App {
    constructor(config){
        this.data = null;
        this.config = config;
        $.get('/api', (d,e)=>{
            // console.log(d,e);
            if(e=='success'){
                this.data = {};
                let tmpl = $(config.listTemplate).html();
                var ct = 0;
                let html = d.reduce((h,i)=>{
                    
                    this.data[i._id] = i;
                    
                    return h + tmpl
                        .replace('{{index}}',ct++)
                        .replace('{{href}}',"#"+i._id)
                        .replace('#{{image}}',i.picture)
                        .replace('{{name}}',i.name);
                },'');
                $(config.listHolder).html(html);
                // console.log()
            }
            
        },'json');
    }
    goto(o){
        let pos = o.href.indexOf('#');
        if(pos>-1){
            let copy = $(o).html();
            let tmpl = $(this.config.detailTemplate).html();
            let target = $(this.config.secondaryPage);
            let id = o.href.substr(pos+1);
            let dat =this.data[id]; 
            let url = (dat.location && dat.location.latitude && dat.location.longitude) ?  makeMapUrl(dat.location.latitude, dat.location.longitude) : '#';
            let html = tmpl.replace('#{{map-url}}',url).replace('{{list-item-copy}}', copy);
            target.html(html);
            this.goPageSecondary();
        }
    }
    goPagePrimary(){
        $(this.config.primaryPage).show();
        $(this.config.secondaryPage).hide();
        $(this.config.pageTitle).html("All Friends");
        $(this.config.backBtn).hide();
        $('body').css('background','rgb(239,239,239)');
        // background: rgb(239,239,239);
    }
    goPageSecondary(){
        $(this.config.primaryPage).hide();
        $(this.config.secondaryPage).show();
        $(this.config.pageTitle).html("Your Friend");
        $(this.config.backBtn).show();
        $('body').css('background','#FFF');
    }
}
const app = new App({
    "pageTitle":"#pageTitle",
    "backBtn":"#backBtn",
    "listHolder": "#primary-list",
    "primaryPage":"#primary-page",
    "secondaryPage":"#secondary-page",
    "listTemplate":"#template-list",
    "detailTemplate":"#template-detail",
});
app.goPagePrimary();