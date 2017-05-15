/**
 * Created by i on 2017/1/5.
 */
window.onload=function(){
    imgLocation('container','box');
    //模拟数据
    var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"}]};
    //自定义方法加载图片
    window.onscroll=function(){
        imgLocation('container','box');
        if(checkFlag()){
            var cparent=document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
                console.log(1);
                var ccontain=document.createElement("div");
                ccontain.className='box';
                cparent.appendChild(ccontain);
                var boximg=document.createElement('div');
                boximg.className='contain';
                ccontain.appendChild(boximg);
                var img=document.createElement('img');
                img.src='img/'+imgData.data[i].src;
                boximg.appendChild(img)

            }
        }
    }
}
//查找最后到顶部的距离
function checkFlag() {
    var cparent=document.getElementById('container');
    var ccontain=getChlidElement(cparent,'box');
    //获得最底部的图片到顶部的高度
    var lastcontainHeight=ccontain[ccontain.length-1].offsetTop;
    //获得当前未显示的高度
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    //获得当前页面的高度
    var  pageheight=document.documentElement.clientHeight||document.body.clientHeight;
    if(lastcontainHeight<pageheight+scrollTop){
        return true;
    }
}

//瀑布流函数
function imgLocation(parent,contain){
    //得到parent下的contain全部取出
    var cparent=document.getElementById(parent);
    var ccontain=getChlidElement(cparent,contain);
    var imgWidth=ccontain[0].offsetWidth;
    //图片盛放的个数
    var cols=Math.floor(document.documentElement.clientWidth/imgWidth);
    cparent.style.cssText="width:"+imgWidth*cols+"px;margin:0 auto";
    //得到页面显示上的第一排图片的高度,存储在BoxHeight中
    var BoxHeightArr=[];
    for(var i=0;i<ccontain.length;i++){
        if(i<cols){
            BoxHeightArr[i]=ccontain[i].offsetHeight;
        }else{
            var minheight=Math.min.apply(null,BoxHeightArr);
            var  minindex=getminheightLocation(BoxHeightArr,minheight);
            //对瀑布流摆放位置的调整
            ccontain[i].style.position='absolute';
            ccontain[i].style.top=minheight+'px';
            ccontain[i].style.left=ccontain[minindex].offsetLeft+'px';
            //重新选择最小的高度图片
            BoxHeightArr[minindex]=BoxHeightArr[minindex]+ccontain[i].offsetHeight;
        }
    }
}

//得到一排当前最小的位置
function getminheightLocation(BoxheightArr,minheight) {
    for(var i in BoxheightArr){
        if(BoxheightArr[i]==minheight){
            return i;
        }
    }
}
//从HTML中抓取符合条件的div，得到个数
function getChlidElement(parent,contain){
    var contentArr=[];
    var allcontain=parent.getElementsByTagName('*');
    for(var i=0;i<allcontain.length;i++){
        if(allcontain[i].className==contain){
            contentArr.push(allcontain[i]);
        }
    }
    return contentArr;

}