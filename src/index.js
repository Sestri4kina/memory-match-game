/**
 * Created by Sestri4kina on 18.02.2017.
 */
//global variables go here:
var clickedArray = [];
var interval;
var started = false;
var time = 0;
var ready = true;
var numCompleted = 0;

setUp();

function randomAnswers(){
    var answers = [31,31,27,27,83,83,49,49,56];
    answers.sort(function(item){
        return .5 - Math.random();
    });
    return answers;
}

function setUp(){
    var grid = document.getElementsByTagName("td");
    var answers = randomAnswers();

    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        cell.addEventListener("mouseenter",function(){
            if(this.completed == false && this.clicked == false)
                this.style.background = "#e8b71a";
        });

        cell.addEventListener("mouseleave",function(){
            if(this.completed == false && this.clicked == false)
                this.style.background = "#28abe3";
        });

        cell.addEventListener('click',function(){
            if(ready == false) return;
            startTimer();
            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);
            }
            if(clickedArray.length == 2){

                if(clickedArray[0].value == clickedArray[1].value){
                    //if a matching pair is found
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);

                    clickedArray = [];

                    if(numCompleted == 8){
                        alert("Congratulations! You won in " + time + " seconds!");
                        clearInterval(interval);
                    }
                }
                else{
                    //if a matching pair is not found
                    ready = false;
                    document.getElementById("gridTable").style.border = "5px solid #db3340";

                    setTimeout(function(){
                        //after a 500ms delay
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);

                        clickedArray = [];

                        ready = true;
                        document.getElementById("gridTable").style.border = "5px solid #f7eac8";
                    },500);

                }

            }
        });
        document.addEventListener('keydown', function(event){
            if(event.key > 0 && event.key < 10 ){
                grid[event.key - 1].click();
            }

        });
        document.getElementById('restart').addEventListener('click', function(){
            location.reload();
        });
    }
}

function reveal(cell){
    cell.style.backgroundColor = "#db3340";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}

function startTimer(){
    if (started == false){
        interval = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML = time;
        },1000);
        started = true;
    }
}

function hide(cell){
    cell.style.backgroundColor = "#28abe3";
    cell.innerHTML = "";
    cell.clicked = false;
}

function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "#982395";
}