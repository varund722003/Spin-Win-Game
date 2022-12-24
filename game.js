


let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% Off","Swagpack",
    "100% Off","Netflix","50% Off","Amazon Voucher",
    "2 Extra Spin","CB Tshirt","CB Book"]
}

let config = {
    type : Phaser.CANVAS,
    width : 800,
    height : 600,
    backgroundColor: 0xffcc00,

    scene : {
        preload : preload,
        create : create,
        update : update,

    }

};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    //using load object creating images
    this.load.image('background','../images/back.jpg');
    console.log(this);
    this.load.image('wheel','../images/wheel.png');
    this.load.image('pin','../images/pin.png');
    this.load.image('stand','../images/stand.png');

}
function create(){
    console.log("Create");
    //create background
    let W = game.config.width;
    let H = game.config.height;

    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);


     //create a stand
     let stand = this.add.sprite(W/2,H/2+250,"stand");
     stand.setScale(0.25);
    
     //create a wheel
     this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25);

    //create a pin
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25); 
    

    //event listener for mouse click
    this.input.on("pointerdown",spinwheel,this);

    //lets create text object

    font_style = {
        font : "bold 30px Ariel",
        align : "center",
        color : "red",

    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);

    
   


}

//game loop

function update()
{
    console.log("Inside Update");
   // this.wheel.angle +=2;
    


}
function spinwheel(){

    //console.log("You clicked the mouse");
    console.log("Start spinning");
    this.game_text.setText("You clicked the mouse");

    //generating random rounds
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30;
    

    let total_angle = rounds*360 + degrees;
    console.log(total_angle);

    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));

    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle, 
        ease: "Cubic.easeOut",//to make the stopping of the wheel slower
        duration: 6000,
        callbackScope:this,
        onComplete: function(){
            this.game_text.setText("You Won "+ prizes_config.prize_names[idx]);
        },
       
    });
}