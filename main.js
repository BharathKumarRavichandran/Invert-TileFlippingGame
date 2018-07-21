var tileOpen = false;
var tileOpenId;
var score = 0;
var gameOver = false;

var tileArray = ["1","2","3","4","5","6","7","8","9"];
var pairArray = [];
var colourArray = ["008DD5","DFBBB1","F56476","C5D86D"];
var colourArray = ["blue","red","darkgreen","brown"];

function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

function pair(firstTile,secondTile,colour,clicked,found){

	this.firstTile = firstTile;
	this.secondTile = secondTile;
	this.colour = colour;
	this.firstTileClicked = clicked;
	this.secondTileClicked = clicked;
	this.firstTileOpen = "no";
	this.secondTileOpen = "no";
	this.found = found;

}

function init(){

	var status = false;
	var tile1;
	var tile2;
	var index;

	for(var i=0;i<4;i++){

		tile1 = tileArray[Math.floor(Math.random()*tileArray.length)];
		index = tileArray.indexOf(tile1);
		tileArray.splice(index,1);

		tile2 = tileArray[Math.floor(Math.random()*tileArray.length)];
		index = tileArray.indexOf(tile2);
		tileArray.splice(index,1);

		pairArray.push(new pair(tile1,tile2,colourArray[i],"no","no"));
	}
	console.log(pairArray);
}

function restore(){

	for(var i=0;i<9;i++){
		document.getElementById(i).style.backgroundColor = "orange";
	}

}

function tileClick(y){

	if(gameOver==false){

		var id = y.getAttribute("id");

		var index = pairArray.findIndex(obj => obj.firstTile==id||obj.secondTile==id); //index in pairArray
		if(typeof pairArray[index] !== 'undefined'){
			document.getElementById(id).style.backgroundColor = pairArray[index].colour.toString();

			if(parseInt(pairArray[index].firstTile)==id){
				pairArray[index].firstTileOpen = "yes";
				pairArray[index].firstTileClicked = "yes";

				var tileOpenIdIndex;
				if(tileOpen==true){
					tileOpenIdIndex = pairArray.findIndex(obj => obj.firstTile==tileOpenId||obj.secondTile==tileOpenId); //index in pairArray

					if(pairArray[tileOpenIdIndex].colour==pairArray[index].colour){
						console.log("Found!");
						score+=20;
						document.getElementById("scoreDiv").innerHTML = "Score : "+score;
					}
					else{
						console.log("Not Found");
						document.getElementById(tileOpenId).style.backgroundColor = "orange";
						document.getElementById(id).style.backgroundColor = "orange";
						pairArray[index].firstTileOpen = "no";
						pairArray[index].firstTileClicked = "no";
					}
					console.log(tileOpen);
					tileOpen = false;
				}
				else{
					tileOpen = true;
					tileOpenId = id;
				}

			}
			else if(parseInt(pairArray[index].secondTile)==id){
				pairArray[index].secondTileOpen = "yes";
				pairArray[index].secondTileClicked = "yes";

				var tileOpenIdIndex;
				if(tileOpen==true){
					tileOpenIdIndex = pairArray.findIndex(obj => obj.firstTile==tileOpenId||obj.secondTile==tileOpenId); //index in pairArray

					if(pairArray[tileOpenIdIndex].colour==pairArray[index].colour){
						console.log("Found!");
						score+=20;
						document.getElementById("scoreDiv").innerHTML = "Score : "+score;
					}
					else{
						console.log("Not Found");
						document.getElementById(tileOpenId).style.backgroundColor = "orange";
						document.getElementById(id).style.backgroundColor = "orange";
						pairArray[index].secondTileOpen = "no";
						pairArray[index].secondTileClicked = "no";
					}
					console.log(tileOpen);
					tileOpen = false;
				}
				else{
					tileOpen = true;
					tileOpenId = id;
				}
			}
			
		}

		if(score>=80){
			gameOver = true;
			document.getElementById("statusDiv").innerHTML = "Succesfully Completed!";
			document.getElementById("statusDiv").style.color = "green";
		}

	}

}

init();