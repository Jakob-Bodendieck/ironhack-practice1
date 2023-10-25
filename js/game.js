class Game {
    // code to be added
    constructor(){
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameImage = document.getElementById('game-container');
        this.gameEndScreen = document.getElementById('game-end');
        this.gameEndScreenJob = document.getElementById('game-end-job');
        this.stats = document.getElementById('stats')
        this.player = new Player (this.gameScreen, 200, 485, 100, 150, "./images/walking gif.gif")//change image
        this.height = 600;
        this.width = 1450; //look into how we can create percentage ratio. 
        this.obstacles = [];
        this.coffees = [];
        this.score = 0; 
        this.lives = 3;
        this.gameOver = false;
        this.loadingObstacle = false;
        this.loadingCoffee = false;
        this.myMusic =  new Audio('../Sounds/2019-12-11_-_Retro_Platforming_-_David_Fesliyan.mp3')
        this.winningMusic = new Audio ('../Sounds/winning music.mp3')
        this.sadMusic = new Audio ('../Sounds/sad-music.mp3')
        this.coffeeSound = new Audio ('../Sounds/coffeeSound.wav')
        this.bugSound = new Audio ('../Sounds/bugSound.wav')

    }

    

/*     player = document.createElement("img");
    player.setAttribute("id","player") */

    start(){
        this.gameScreen.style.height = `${this.height}px`; //we might want to change dimensions (maybe %) 
        this.gameScreen.style.width = `${this.width}px`;
        this.myMusic.play()


        //Hide Game Intro Screen
        this.startScreen.style.display = "none";


        //Show the Game  Screen
        this.gameScreen.style.display = "block";
        this.gameImage.style.height = '800px'
        this.stats.style.display = "flex";

        //Start Game
        this.gameLoop()
    }

    gameLoop (){
        if(this.gameOver){
            return; //what does this do? 
        }
        this.update()
        window.requestAnimationFrame(()=> this.gameLoop())
    }
/* 
    scoreIncrease(){
        setInterval(()=>{
            this.score+=10
        },1000/60) */
/*     } */
/* scoreIncrease(){
    setInterval(()=> {
        this.score += 1;
    },2000)
} */

    update (){
        /* let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        score.innerHTML = this.score //what does inner HTML do here? 
        lives.innerHTML = this.lives

 */
/*         let timer = 0;
 */
/*         this.scoreIncrease()
 */
        this.player.move();

        for (let i = 0; i<this.obstacles.length; i++){
            const obstacle = this.obstacles[i];
            obstacle.move();

            //Check for collision
            if (this.player.didCollide(obstacle)){
                obstacle.element.remove();
                this.bugSound.play()
                this.obstacles.splice(i,1); //what does the splice do here? 
                this.lives --;
            }

            else if (obstacle.right > this.width){ //not completely understnading this
                obstacle.element.remove();
                this.obstacles.splice(i,1);
            }
        }

        if (this.lives === 0){
            this.endGame();
            return;
        }

        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        score.innerHTML = Math.floor(this.score += 1/60) //what does inner HTML do here? 
        lives.innerHTML = this.lives

/*         let frequency = 2200;
 */

        if(!this.obstacles.length && !this.loadingObstacle){ //not sure about this. check once we create obstacles and animations. 
            this.loadingObstacle = true;
            setInterval(()=>{
                this.obstacles.push(new Obstacle(this.gameScreen))
                this.loadingObstacle = false
                /* frequency -=200 */
            }, 1300)

        }

        //COFFEE

        /*         let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        score.innerHTML = this.score //what does inner HTML do here? 
        lives.innerHTML = this.lives */
/* 
        this.player.move(); */

        for (let i = 0; i<this.coffees.length; i++){
            const coffee = this.coffees[i];
            coffee.move();

            //Check for collision
            if (this.player.didCollide(coffee)){
                console.log("test");
                this.coffeeSound.play()
                coffee.element.remove();
                this.coffees.splice(i,1); //what does the splice do here? 
                this.score +=5;
            }

/*             else if (coffee.right > this.width){ //not completely understnading this
                this.score++;
                coffee.element.remove();
                this.coffees.splice(i,1);
            } */
        }

/*         if (this.lives === 0){
            this.endGame();
        } */
        if(!this.coffees.length && !this.loadingCoffee){ //not sure about this. check once we create obstacles and animations. 
            this.loadingCoffee = true;
            let frequency = 2000;
            setInterval(()=>{
                this.coffees.push(new Coffee(this.gameScreen))
                this.loadingCoffee = false
                frequency -= 50
                console.log(frequency)
            },frequency)
        }

/*         this.scoreIncrease()
 */    }

    endGame(){
        this.gameOver = true;
        this.myMusic.pause()
        this.gameImage.style.height = 'auto'
        this.player.element.remove(); //why not just type player.remove(). Why add .element? 
        this.obstacles.forEach(obstacle =>{
            obstacle.element.remove();
        });


        if (this.score < 100){
            this.gameScreen.style.display = "none"
            this.gameEndScreen.style.display = "block"
            this.sadMusic.play()
        }

        else if (this.score >= 100){
            this.gameScreen.style.display = "none"
            this.gameEndScreenJob.style.display = "block"
            this.winningMusic.play()

        }
    }

}