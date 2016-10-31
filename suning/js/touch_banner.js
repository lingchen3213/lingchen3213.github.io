(function(){
	// 面向对象
	// 定义一个类，唯一暴露在外面的
	window.FingerCarousel = function(oId){
		// 获取元素
		this.carousel = document.querySelector("#" + oId);
		this.lis = document.querySelectorAll("#" + oId + " ul li");
		this.olis = document.querySelectorAll("#" + oId + " ol li");
		this.ul = document.querySelector("#" + oId + "ul");
		this.imgs = document.querySelectorAll("#" + oId + " ul li img");		
		this.img = document.querySelector("#" + oId + " ul li img");		

		var self = this;

		//等所有图片加载好之后，然后才显示
		// for(var i = 0 , sum = 0 ; i < this.img.length ; i++){
		// 	this.img[i].onload = function(){
		// 		sum ++;
		// 		if(sum == self.img.length){
		// 			self.ul.style.display = "block";
		// 			self.loading.style.display = "none";
		// 		}
		// 	}
		// }

		this.init();

		// 定时器
		this.timer();


		// 跟随手指
		this.carousel.addEventListener("touchstart" , function(event){
			self.touchstartHandler.call(self , event);
		} , false);

		this.carousel.addEventListener("touchmove" , function(event){
			self.touchmoveHandler.call(self , event);
		} , false);

		this.carousel.addEventListener("touchend" , function(event){
			self.touchendHandler.call(self , event);
		} , false)
	}

	// FingerCarousel初始化的默认实例
	FingerCarousel.prototype.init = function(){
		// 信号量
		this.idx = 0;
		this.nextIdx = 1;
		this.prevIdx = this.lis.length - 1;

		// 获取大盒子的宽
		this.w = parseFloat(getComputedStyle(this.carousel)["width"]);
		this.imgH = parseFloat(getComputedStyle(this.img)["height"]);
		console.log(this.imgH);
		

		this.carousel.style.height = (this.imgH)  + "px";
		console.log(this.carousel.style.height);
		//第0张图复原
		this.lis[0].style.webkitTransition = "none";
		this.lis[0].style.webkitTransform = "translate3d(0px,0,0)";
		//用px为单位，除0之外的所有li去猫腻位置
		for(var i = 1 ; i < this.lis.length ; i++){
			this.lis[i].style.webkitTransition = "none";
			this.lis[i].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
		}

		
	}

	FingerCarousel.prototype.timer = function(){
		var self = this;
		self.ttimer = setInterval(function(){
			
			self.lis[self.idx].style.transform = "translate3d(" + -self.w + "px,0,0)";
			self.lis[self.nextIdx].style.transform = "translate3d(" + 0 + "px,0,0)";
			self.lis[self.prevIdx].style.transform = "translate3d(" + self.w + "px,0,0)";
			self.prevIdx = self.idx;
			self.idx = self.nextIdx;
			self.nextIdx++;

			if(self.nextIdx > self.lis.length - 1){
				self.nextIdx = 0;
			}

			for(var i = 0 ; i < self.olis.length ; i++){
				self.olis[i].className = "";
			}
			self.olis[self.idx].className = "cur";
		}, 2000)
	}
	// FingerCarousel的手指触摸开始的实例
	FingerCarousel.prototype.touchstartHandler = function(event){
		// 阻止手机默认事件
		event.preventDefault();
		clearInterval(this.ttimer);
		var finger = event.touches[0];

		this.startX = finger.clientX;
		// 去掉过渡
		this.lis[this.idx].style.webkitTransition = "none";
		this.lis[this.nextIdx].style.webkitTransition = "none";
		this.lis[this.prevIdx].style.webkitTransition = "none";

		// 所有图片就位
		this.lis[this.idx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
		this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
		this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)";
	}

	// FingerCarousel的手指触摸移动的实例
	FingerCarousel.prototype.touchmoveHandler = function(event){
		// 阻止手机默认事件
		event.preventDefault();

		var finger = event.touches[0];

		this.dx = finger.clientX - this.startX;
		// console.log(this.dx);
		this.lis[this.idx].style.webkitTransform = "translate3d(" + (0 + this.dx) + "px,0,0)";
 		this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + (this.w + this.dx) + "px,0,0)";
 		this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + (-this.w + this.dx) + "px,0,0)";

	}

	// FingerCarousel的手指触摸结束的实例
	FingerCarousel.prototype.touchendHandler = function(event){
		// 阻止手机默认事件
		event.preventDefault();
		this.timer();

		var finger = event.touches[0];

		if(this.dx >= this.w / 3){
			this.lis[this.idx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.idx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
			this.lis[this.prevIdx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";

			//信号量的改变
			this.nextIdx = this.idx;
			this.idx = this.prevIdx;
			this.prevIdx--;
			if(this.prevIdx < 0){
				this.prevIdx = this.lis.length - 1;
			}
		}else if(this.dx <= -this.w / 3){
			this.lis[this.idx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.idx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)";
			this.lis[this.nextIdx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";

			//信号量的改变
 			this.prevIdx = this.idx;
 			this.idx = this.nextIdx;
 			this.nextIdx++;
 			if(this.nextIdx > this.lis.length - 1){
 				this.nextIdx = 0;
 			}
		}else{
			this.lis[this.idx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.idx].style.webkitTransform = "translate3d(" + 0 + "px,0,0)";
			this.lis[this.prevIdx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.prevIdx].style.webkitTransform = "translate3d(" + -this.w + "px,0,0)";
			this.lis[this.nextIdx].style.webkitTransition = "all 0.3s cubic-bezier(0.56, 1.24, 1, 0.98) 0s";
			this.lis[this.nextIdx].style.webkitTransform = "translate3d(" + this.w + "px,0,0)";
		}
		
		// 小圆点
		for(var i = 0 ; i < this.olis.length ; i++){
			this.olis[i].className = "";
		}
		this.olis[this.idx].className = "cur";
	}

})()