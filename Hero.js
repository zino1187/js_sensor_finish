class Hero extends GameObject{
	constructor(id,container,x,y,width,height,velX,velY,bg,src){
		super(id,container,x,y,width,height,velX,velY,bg,src);
		
		/*------------------------------------------------------------
		센서들을 배열에 담아놓는다
		------------------------------------------------------------*/
		this.sensorArray=[];

		/*------------------------------------------------------------
		센서들을 배치한다
		------------------------------------------------------------*/
		this.leftSensor=new Sensor("SENSOR", container, getSensorSize("LEFT",this.x, this.y, this.width, this.height) , 0, 0, "blue","");
		this.rightSensor=new Sensor("SENSOR", container, getSensorSize("RIGHT",this.x, this.y, this.width, this.height) , 0, 0, "blue","");
		this.upSensor=new Sensor("SENSOR", container, getSensorSize("UP",this.x, this.y, this.width, this.height) , 0, 0, "blue","");
		this.downSensor=new Sensor("SENSOR", container, getSensorSize("DOWN",this.x, this.y, this.width, this.height) , 0, 0, "blue","");

		this.sensorArray.push(this.leftSensor);
		this.sensorArray.push(this.rightSensor);
		this.sensorArray.push(this.upSensor);
		this.sensorArray.push(this.downSensor);
	}

	tick(){
		
		/*------------------------------------------------------------
		충돌체크
		------------------------------------------------------------*/
		var hitCount=[0,0,0,0]; //0:left, 1:right, 2:up, 3:down
		var stopX=0;
		var stopY=0;

		for(var i=0;i<objectManager.objectArray.length;i++){
			var obj=objectManager.objectArray[i];
			if(obj.id=="BLOCK"){
				/*------------------------------------------------------
				블럭 하나를 대상으로 4방향의 센서들과 대조해본다
				------------------------------------------------------*/
				for(var a=0;a<this.sensorArray.length;a++){
					var s=this.sensorArray[a];
					
					if(hitTest(obj , s, this.velX, this.velY)){ //충돌이라면...
						hitCount[a]++;
						console.log(hitCount , "충돌");
						stopX=obj.x;
						stopY=obj.y;
					}						
				}
			}
		}

		/*---------------------------------------------------------------------------------------------------
		주인공의 벽에 닿으면 속도를 중지시킨다.
		★★★ 매우중요) 특히 && 조건을 부여하여 , 원할때는 이 조건을 빠져나올 수 있는 여지를 만든다
		---------------------------------------------------------------------------------------------------*/
		if(hitCount[0] > 0 && key==37){//좌측이 닿으면
			this.velX=0;
		}
		if(hitCount[1] > 0 && key==39){//우측이 닿으면
			this.velX=0;
		}
		if(hitCount[2] > 0 && key==38){//상단이 닿으면 
			this.velY=0;
		}
		if(hitCount[3] > 0 && key==40){//하단이 닿으면
			this.velY=0;
		}
		
		this.x+=this.velX;
		this.y+=this.velY;

		/*------------------------------------------------------------
		센서는 move 메서드로 구현했다
		오브젝트 메니져에 등록하지 않았으므로, render() 를 여기서 호출해준다
		------------------------------------------------------------*/
		for(var i=0;i<this.sensorArray.length;i++){
			var sensor=this.sensorArray[i];
			//console.log(i+"센서 위치 ", sensor.x, sensor.y);
			sensor.tick( sensor.x + this.velX , sensor.y + this.velY);
			sensor.render();
		}


	}
}