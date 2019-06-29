Vue.filter('readMore', function (text, length, suffix) {
        if(text.length >= length){
            return text.substring(0, length) + suffix ;
        }else{
            return text;
        }
})
