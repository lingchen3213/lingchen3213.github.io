
		window.onload=function(){
			var oImg=new Image();
			oImg.src="images/img.png";
			oImg.offOn=false;
			oImg.onload=function(){
				oImg.offOn=true;
				// draw();
			};
			/*行星数据存储*/
			var planetData=[{
				type:"html/css",
				speed:100,
				location:220,
				r:100,
				tw:222,
				th:220,
				sw:30,
				sh:30,
				num:50,
				count:260,
				fontShow:false
			},{
				type:"html5/css3",
				speed:100,
				location:440,
				r:120,
				tw:228,
				th:228,
				sw:36,
				sh:36,
				num:200,
				count:360,
				fontShow:false	
			},{
				type:"javascript",
				r:150,
				speed:100,
				location:668,
				tw:252,
				th:252,
				sw:40,
				sh:40,
				num:400,
				count:460,
				fontShow:false
			},{
				type:"jQuery",
				r:180,
				speed:100,
				location:920,
				tw:275,
				th:276,
				sw:50,
				sh:50,
				num:500,
				count:560,
				fontShow:false	
			},{
				type:"vue",
				r:210,
				speed:100,
				location:1654,
				tw:480,
				th:480,
				sw:66,
				sh:66,
				num:600,
				count:660,
				fontShow:false	
			},{
				type:"less",
				r:240,
				speed:100,
				location:2134,
				tw:533,
				th:376,
				sw:70,
				sh:55,
				num:700,
				count:760,
				fontShow:false	
			},{
				type:"php",
				r:270,
				speed:100,
				location:1196,
				tw:342,
				th:458,
				sw:46,
				sh:55,
				num:800,
				count:860,
				fontShow:false	
			},{
				type:"Ajax",
				r:300,
				speed:100,
				location:0,
				tw:220,
				th:220,
				sw:40,
				sh:40,
				num:900,
				count:960,
				fontShow:false	
			}]
			/*太阳字体显示变量*/
			var sunShow=true;
			/*画布开始*/
			var oCas=document.getElementById("canvas");
			var ctx=oCas.getContext("2d");
			function resize_canvas(){
				canvas= document.getElementById("canvas");
				if(canvas.width  < window.innerWidth){
					canvas.width  = 960;
				}
			}
			resize_canvas();
			canvas.height=700;
			function draw(){
			
				ctx.clearRect(0,0,canvas.width,canvas.height);
				if(oImg.offOn){
					/*太阳*/
					ctx.drawImage(oImg,0,2510,750,750,(oCas.width-100)/2,(oCas.height-100)/2,100,100);
					/*太阳字体显示*/
					if(sunShow){
						ctx.font="20px Arial";
						ctx.fillStyle="#fff";
						ctx.textAlign="center";
						ctx.fillText("PS/AI",oCas.width/2,oCas.height/2-50);
					}
					/*轨迹颜色*/
					ctx.strokeStyle="rgba(0,153,255,.4)";
					/*循环行星数据，绘制出行星*/
					for(var i=0;i<planetData.length;i++){
						planetData[i].num+=planetData[i].speed/planetData[i].r;
						if(planetData[i].num>=planetData[i].count){
							planetData[i].num=planetData[i].count-360;
						}
						ctx.beginPath();
						ctx.arc(oCas.width/2,oCas.height/2,planetData[i].r,0,2*Math.PI);
						ctx.stroke();
						ctx.save();
						ctx.translate(oCas.width/2,oCas.height/2);
						ctx.rotate(planetData[i].num*Math.PI/180);
						ctx.translate(planetData[i].r,0);
						ctx.drawImage(oImg,0,planetData[i].location,planetData[i].tw,planetData[i].th,-planetData[i].sw/2,-planetData[i].sh/2,planetData[i].sw,planetData[i].sh);
						
						ctx.beginPath();
						ctx.fillStyle="rgba(0,0,0,0)";
						ctx.fillRect(0,-planetData[i].sh/2,planetData[i].sw/2,planetData[i].sh);
						ctx.restore();
						/*字体显示*/
						//if(planetData[i].fontShow)
						if(true){
							var rx=oCas.width/2+planetData[i].r*Math.cos(planetData[i].num*Math.PI/180),
									ry=oCas.height/2+planetData[i].r*Math.sin(planetData[i].num*Math.PI/180),
									str=planetData[i].type,
									sh=planetData[i].sh;
							ctx.font="20px Arial";
							ctx.fillStyle="#fff";
							ctx.textAlign="center";
							ctx.fillText(str,rx,ry-sh/2-10);
						}
					}
				}
				requestAnimationFrame(draw);
			}


			draw();

			oCas.onmousemove=function(ev){
						return;
						ev=ev || window.event;
						var x=ev.layerX || ev.offsetX;
						var y=ev.layerY || ev.offsetY;
						/*太阳字体显示*/
						ctx.beginPath();
						ctx.arc(oCas.width/2,oCas.height/2,50,0,2*Math.PI);
						if(ctx.isPointInPath(x,y)){
							for(var j=0;j<planetData.length;j++){
										planetData[j].fontShow=false;
									}
									sunShow=true;
						};
						for(var i=0;i<planetData.length;i++){
							/*八大行星字体显示判断*/
								ctx.beginPath();
							var rx=oCas.width/2+planetData[i].r*Math.cos(planetData[i].num*Math.PI/180),
								ry=oCas.height/2+planetData[i].r*Math.sin(planetData[i].num*Math.PI/180),
								str=planetData[i].type;
							ctx.arc(rx,ry,planetData[i].sw/2,0,2*Math.PI);
							if(ctx.isPointInPath(x,y)){
								sunShow=false;
								for(var j=0;j<planetData.length;j++){
										planetData[j].fontShow=false;
									}
								switch(str){
									case "html/css": 
									planetData[0].fontShow=true;
									break;
									case "html5/css3": 
									planetData[1].fontShow=true;
									break;
									case "javascript": 
									planetData[2].fontShow=true;
									break;
									case "jQuery": 
									planetData[3].fontShow=true;
									break;
									case "vue": 
									planetData[4].fontShow=true;
									break;
									case "less": 
									planetData[5].fontShow=true;
									break;
									case "php": 
									planetData[6].fontShow=true;
									break;
									case "Ajax": 
									planetData[7].fontShow=true;
									break;
								}

							}
						}
					}

		}


var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
