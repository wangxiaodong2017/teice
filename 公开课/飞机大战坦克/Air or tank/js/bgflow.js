//给背景设置定时器，让背景不停的动
var bgtimer=setInterval(bgRun,10);
function bgRun(){
	jsBg1.style.top=jsBg1.offsetTop+1+'px';
	jsBg2.style.top=jsBg2.offsetTop+1+'px';
	if(jsBg1.offsetTop>=768){jsBg1.style.top='-768px';
	}else{
		if(jsBg2.style.top>=768){jsBg2.style.top='-768px';}
	}
}
