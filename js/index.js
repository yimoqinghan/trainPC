/**
 * Created by niuxingxing on 2019/6/17.
 */

var vue = new Vue({
    el:"#indexBox",
    data:{
        nav_list:[ {name:"党建宣传",href:"/trainPC/html/index.html"},
                    {name:"活动相册",href:"/trainPC/html/huoDongXiangCe/list.html"},
                    {name:"支部动态",href:"/trainPC/html/zhiBuDongTai/list.html"},
                    {name:"微党课",href:"/trainPC/html/demo/weidangke.html"},
                    {name:"干部管理",href:"/trainPC/html/demo/ganbuguanli.html"},
                    {name:"党建考核",href:"/trainPC/html/demo/dangjiankaohe.html"},
                    {name:"支部考评",href:"/trainPC/html/zhikao.html"},
                    {name:"三会一课",href:"/trainPC/html/sanhuiyike.html"},
                    {name:"积分排名",href:"/trainPC/html/jifen.html"},
                    {name:"学习强国",href:"https://www.xuexi.cn/"}],
        listObject:{jiTuanNews:[],
                    dJList:[],
                    zBList:[],
                    huoDongList:[],
                    fanFuList:[],
                    zuanTiList:[],
                    hotList:[],
                    zuanHuoList:[],
        },
        // token:"",
        guoNeiYaoWen:[],
    },
    mounted:function(){
        // if(window.location.href.indexOf("?USER_TOKEN") != -1){
        //     var href_url = this.getId()["USER_TOKEN"];
        //     this.token = href_url;
        //     window.localStorage.setItem("token",href_url);
        // };
        // if(window.localStorage.getItem("token")){
        //     this.token = window.localStorage.getItem("token");
        // };
        this.newsListShow("hotList",4,6);
        this.newsListShow("jiTuanNews",2,7);
        this.newsListShow("dJList",3,6);
        this.getzhiBuData(10);
        this.getHuoDongData(6);
        this.newsListShow("fanFuList",5,7);
        this.newsListShow("zuanTiList",9,7);
        this.newsListShow("zuanHuoList",10,4);
    },
    methods:{
        onloadImg:function(imgSrc){
            if(imgSrc){
                return 'this.onload=null;this.src='+'"'+imgSrc+'";'
            }
        },
        initSwiper:function(){
            var swiper = new Swiper('.swiper-container', {
                spaceBetween: 30,
                centeredSlides: true,
                observer:true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents:true,
                loop:true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
             
            });
        },
        getId:function(){
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        /*新闻列表*/
        newsListShow:function (objectName,type,size) {
            var that = this;
            axios({
                url:"http://106.14.183.96/red-caragana-railway/news/getNewsListA.do?newsColumn="+type+"&page=1&size="+size,
                method:"GET",
                // headers:{
                //     authorization:that.token,
                // }
            }).then(function(res){
                if(res.data.code == 200){
                    if(res.data.data.length >0){
                        for(var i=0;i<res.data.data.length;i++){
                            if(res.data.data[i].allImgUrl.length <= 0 && res.data.data[i].imgSrc != ""){
                                res.data.data[i].allImgUrl.push(res.data.data[i].imgSrc);
                            }
                        }
                    }
                    if(objectName == "hotList" && res.data.data.length >0){
                        for(var k=0;k<res.data.data.length;k++){
                           if( k >= 1){
                                that.guoNeiYaoWen.push(res.data.data[k]);
                           }
                        }
                        that.$nextTick(() => { // 下一个UI帧再初始化swiper
                            that.initSwiper();
                         });
                    }
                    that.listObject[objectName] = res.data.data;
                }
                /*that.dangJianNews*/
            }).catch(function(err){

            })
        },
        //支部动态列表获取
        getzhiBuData:function(size){
            var that = this;
            axios({
                url:"http://106.14.183.96/red-caragana-railway/organization/getOrganizationList.do?page=1&size="+size,
                method:"GET",
                // headers:{
                //     authorization:that.token,
                // }
            }).then(function(res){
                if(res.data.code == 200){
                    that.listObject.zBList = res.data.data;
                }
                /*that.dangJianNews*/
            }).catch(function(err){

            })
        },
        //活动相册列表获取
        getHuoDongData:function(size){
            var that = this;
            
            axios({
                url:"http://106.14.183.96/red-caragana-railway/album/getAlbumList.do?page=1&size="+size,
                method:"GET",
                // headers:{
                //     authorization:that.token,
                // }
            }).then(function(res){
                if(res.data.code == 200){
                    that.listObject.huoDongList = res.data.data;
                }
                /*that.dangJianNews*/
            }).catch(function(err){

            })
        },
        navMethod:function (index) {
            $(".navbar-nav li").eq(index).addClass("active").siblings().removeClass("active");
        }
    }
})