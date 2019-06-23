var vue = new Vue({
    el:"#dJ",
    data:{
        nav_list:[ {name:"党建宣传",href:""},
                {name:"活动相册",href:""},
                {name:"支部动态",href:""},
                {name:"微党课",href:""},
                {name:"干部管理",href:""},
                {name:"党建考核",href:""},
                {name:"支部考评",href:""},
                {name:"学习强国",href:""}],
        listData:[],
    },
    created:function(){
        this.getData(1,10);
    },
    methods: {
        navMethod:function (index) {
            $(".navbar-nav li").eq(index).addClass("active").siblings().removeClass("active");
        },
        getData:function(page,size){
            var that = this;
            axios({
                url:"http://106.14.183.96/red-caragana-railway/news/getNewsList.do?newsColumn=3&page="+page+"&size="+size,
                method:"GET",
            }).then(function(res){
                if(res.data.code == 200){
                    that.listData = res.data.data;
                }
                /*that.dangJianNews*/
            }).catch(function(err){

            })
        }
    },
})