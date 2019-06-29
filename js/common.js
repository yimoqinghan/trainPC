Vue.filter('readMore', function (text, length, suffix) {
        if(text.length >= length){
            return text.substring(0, length) + suffix ;
        }else{
            return text;
        }
})
Vue.prototype.transformTime=function(text){
    if(text.indexOf(" ") != -1){
        return text.split(" ")[0];
    }else{
        return text;
    }
}
