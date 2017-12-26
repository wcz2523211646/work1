function Dialog(){
	this.oBox = null;
	this.oMark = null;
	this.oClose = null;
	this.timer = null;
	this.clientW = document.documentElement.clientWidth;
	this.clientH = document.documentElement.clientHeight;
	this.settings = {
		title:'标题',
		content:'内容',
		width:200,
		height:200,
		mark:true,
		drag:false,
		time:0
	};//默认对象
}
Dialog.prototype.init = function(opt){//配置参数
	extend(this.settings,opt);
	this.create();
	this.createMark();
	this.closeFn();
	if(this.settings.drag){
		this.Drag();
	}
	if(this.settings.time){
		this.timeFn();
	}
}
//窗体
Dialog.prototype.create = function(){
	this.oBox = document.createElement('div');
	this.oBox.className = 'box';
	this.oBox.style.width = this.settings.width + 'px';
	this.oBox.style.height = this.settings.height + 'px';
	this.oBox.style.left = (this.clientW - this.settings.width) / 2 + 'px';
	this.oBox.style.top = (this.clientH - this.settings.height) / 2 + 'px';
	this.oBox.innerHTML = 
			'<div class="title">'+
				'<span class="close">X</span>'+
				'<h3>'+ this.settings.title +'</h3>'+				
			'</div>'+
			'<div class="content">'+ this.settings.content +'</div>'
		;
	document.body.appendChild(this.oBox);
	//关闭
	this.oClose = document.getElementsByClassName('close')[0];
}
//遮罩
Dialog.prototype.createMark = function(){
	if(this.settings.mark){
		this.oMark = document.createElement('div');
		this.oMark.className = 'mark';
		this.oMark.style.width = this.clientW + 'px';
		this.oMark.style.height = this.clientH + 'px';
		document.body.appendChild(this.oMark);
	}
	
}
//关闭
Dialog.prototype.closeFn = function(){
	var _this = this;
	this.oClose.onclick = function(){
		document.body.removeChild(_this.oBox);
		if(_this.settings.mark){
			document.body.removeChild(_this.oMark);
		}
		clearTimeout(_this.timer);
	}
}
//拖拽
Dialog.prototype.Drag = function(){
	var _this = this;
	this.oDrag = document.getElementsByTagName('h3')[0];
	this.oDrag.onmousedown = function(ev){
		var ev = ev || event;
		var x = ev.clientX - _this.oBox.offsetLeft;
		var y = ev.clientY - _this.oBox.offsetTop;
//		console.log(x,y);
		document.onmousemove = function(ev){
			var ev = ev || event;
			var X = ev.clientX - x;
			var Y = ev.clientY - y;
			if(X < 0){
				X = 0;
			}else if(X > _this.clientW - _this.oBox.offsetWidth){
				X =  _this.clientW - _this.oBox.offsetWidth;
			}
			if(Y < 0){
				Y = 0;
			}else if(Y > _this.clientH - _this.oBox.offsetHeight){
				Y =  _this.clientH - _this.oBox.offsetHeight;
			}
			_this.oBox.style.left = X + 'px';
			_this.oBox.style.top = Y + 'px';
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			document.onmouseup = null;
		}
		return false;
	}
}
//计时器
Dialog.prototype.timeFn = function(){
	var _this = this;
	this.timer = setTimeout(function(){
		document.body.removeChild(_this.oBox);
		if(_this.settings.mark){
			document.body.removeChild(_this.oMark);
		}
	},_this.settings.time * 1000)
}
function extend(obj1,obj2){
	for(var i in obj2){
		obj1[i] = obj2[i];
	}
}
