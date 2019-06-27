/**
 * Created by niuxingxing on 2019/6/17.
 */

var vue = new Vue({
    el:"#indexBox",
    data:{
        nav_list:[ {name:"党建宣传",href:""},
                    {name:"活动相册",href:""},
                    {name:"支部动态",href:""},
                    {name:"微党课",href:""},
                    {name:"干部管理",href:""},
                    {name:"党建考核",href:""},
                    {name:"支部考评",href:""},
                    {name:"学习强国",href:""}],
        listObject:{jiTuanNews:[],
                    dJList:[],
                    zBList:[],
                    huoDongList:[],
                    fanFuList:[],
                    zuanTiList:[],
                    hotList:[],
                    zuanHuoList:[],
        }
    },
    created:function () {
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
        /*新闻列表*/
        newsListShow:function (objectName,type,size) {
            var that = this;
            axios({
                url:"http://106.14.183.96/red-caragana-railway/news/getNewsListA.do?newsColumn="+type+"&page=1&size="+size,
                method:"GET",
            }).then(function(res){
                if(res.data.code == 200){
                    if(res.data.data.length >0){
                        for(var i=0;i<res.data.data.length;i++){
                            if(res.data.data[i].allImgUrl.length <= 0 && res.data.data[i].imgSrc != ""){
                                res.data.data[i].allImgUrl.push(res.data.data[i].imgSrc);
                            }
                        }
                    }
                    console.log("res.data.data",res.data.data)
                    that.listObject[objectName] = res.data.data;
                        var swiper = new Swiper('.swiper-container', {
                            spaceBetween: 30,
                            centeredSlides: true,
                            observer:true, //修改swiper自己或子元素时，自动初始化swiper
                            observeParents:true,
                            autoplay: {
                                delay: 1000,
                                disableOnInteraction: false,
                            },
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                         
                        });
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