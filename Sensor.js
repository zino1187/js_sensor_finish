/*----------------------------------------------
센서는 오브젝트 메니져에 등록하지 않음
----------------------------------------------*/
class Sensor extends GameObject{
	constructor(id,container,json,velX,velY,bg,src){
		super(id,container, json.x, json.y, json.width , json.height,velX,velY,bg,src);
	}

	tick(x, y){
		this.x=x;
		this.y=y;
	}
}