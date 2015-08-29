$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
    var food;
    var score;
  
    var d;
  
    var cw = 10;
	
	//Lets paint the canvas now
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);
	
	//Lets create the snake now
	var snake_array;
  
  
    function init(){
      d="right";//default direction
      score = 0;
      create_snake();
      create_food();
      
      //calls paint every 60ms.
      
      //dont understand this. something to do with restart?
      if(typeof game_loop !== "undefined"){
        clearInterval(game_loop);
      }
      game_loop = setInterval(paint, 60);
    }
  
    init();
  
  
  
    create_snake();
    function create_snake(){
        var length = 5; //starting length
        snake_array = [];
        for(var i = length-1; i>=0; i--){
          //gives snake_array coordinates:
          //[(0,0),(1,0),(2,0)...(5,0)]
          snake_array.push({x:i, y:0});
        }
    }
    
  
    //create food
    //I dont know why we rounded it.
      //lookinto this function!
    function create_food(){
      food = {
        x: Math.round(Math.random()*(w-cw)/cw),
        y: Math.round(Math.random()*(h-cw)/cw),
      };
    }
  
  
  
    //paint snake onto canvas using the array storing the coordinates
    function paint(){
      
        //repaint the canvas on each loop:
	    ctx.fillStyle = "white";
	    ctx.fillRect(0, 0, w, h);
    	ctx.strokeStyle = "black";
    	ctx.strokeRect(0, 0, w, h);
      
      
            
        //snake moving:
        var nx = snake_array[0].x;// gives x value of head
        var ny = snake_array[0].y; //gives y value of head
        //increases the x value of previous head x value
      
      
        //direction of snake
        if(d == "right"){nx++;}
        else if(d == "left"){nx--;} 
        else if(d == "up"){ny--;}
        else if(d == "down"){ny++;}
     
     
        //game over clause
        if(nx == -1 || nx == 45 || ny == -1 || ny == 45 || check_collision(nx,ny,snake_array)){
           //restarts game!!!!!!!!
           init();
           return;
        }
      
      
        //IF Snake eats the food
        if(nx == food.x && ny == food.y){
            var tail = {x: nx, y: ny};
            score++;
            create_food();
        } 
        //OTHERWISE
        else {
            var tail = snake_array.pop();
            tail.x = nx; 
            tail.y = ny;
        }
        

        //unshift tail element to snake_array
        snake_array.unshift(tail);
      
        //paint snake and food
        for(var i = 0; i < snake_array.length; i++){
          var c = snake_array[i];
          //paint 10px wide
          paint_cell(c.x,c.y);
          
          //paint the food
          paint_cell(food.x, food.y);
          
          var score_text = "Score: " + score;
          ctx.fillStyle = "black";
          ctx.fillText(score_text,5,h-5);
        }
      
      
        //assist with paint food
        function paint_cell(x,y){
          ctx.fillStyle = "#484848";
          ctx.fillRect(x*cw,y*cw,cw,cw);
          //c.x will return that co-ordinates x value
          ctx.fillStyle= "white";
          ctx.strokeRect(x*cw,y*cw,cw,cw);
          
        }
        
      //check collision function
      function check_collision(x,y,array){
        for(var i = 0; i < array.length; i++){
          if(array[i].x === x && array[i].y == y){
            return true;
          }
        }
        return false;
      }
      
      
      $(document).keydown(function(e){
        var key = e.which;
        
        if(key == "37" && d !== "right"){d = "left";}
        else if(key == "38" && d !== "down"){d = "up";}
        else if(key == "39" && d !== "left"){d = "right";}
        else if(key == "40" && d !== "up"){d = "down";}
       
        
      });
    }
  

  
});






