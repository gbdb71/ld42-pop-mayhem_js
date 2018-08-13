!function(e){var t={};function s(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(i,a,function(t){return e[t]}.bind(null,a));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){e.exports=s(1)},function(e,t,s){"use strict";s.r(t);var i=class extends Phaser.Scene{constructor(){super({key:"boot"})}create(){this.scene.start("preloader")}};var a=class extends Phaser.Scene{constructor(){super({key:"preloader"})}preload(){this.load.setPath("assets");let e=this.add.graphics();this.load.on("progress",function(t){e.clear(),e.fillStyle(14678523,1),e.fillRect(0,80,256*t,60)}),this.load.on("complete",function(){e.destroy()}),this.load.image("title","title.png"),this.load.image("title-background","title-background.png"),this.load.image("life","life.png"),this.load.image("tiles","tiles.png"),this.load.image("ball","ball.png"),this.load.spritesheet("player","player.png",{frameWidth:24,frameHeight:24}),this.load.spritesheet("cat","cat.png",{frameWidth:24,frameHeight:16}),this.load.tilemapTiledJSON("level1","level1.json"),this.load.tilemapTiledJSON("level2","level2.json"),this.load.tilemapTiledJSON("level3","level3.json"),this.load.image("165","165.png"),this.load.image("165-black","165-black.png"),this.load.audio("pop1",["pop1.mp3","pop1.ogg"]),this.load.audio("pop2",["pop2.mp3","pop2.ogg"])}create(){var e={image:"165",width:8,height:7,chars:" !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`",charsPerRow:40,spacing:{x:0,y:1}};this.cache.bitmapFont.add("baseFont",Phaser.GameObjects.RetroFont.Parse(this,e)),e=Object.assign({},e,{image:"165-black"}),this.cache.bitmapFont.add("baseFontBlack",Phaser.GameObjects.RetroFont.Parse(this,e)),this.scene.start("title")}};var o=class extends Phaser.Scene{constructor(e){super({key:"title"})}create(){this.add.image(128,110,"title-background");var e=this.add.image(128,60,"title");this.tweens.add({targets:e,y:110,duration:3e3,ease:"Power2"});var t=this.add.bitmapText(85,165,"baseFontBlack","PRESS SPACE");this.tweens.add({targets:t,alpha:0,duration:500,ease:"Power2",yoyo:!0,loop:1e5,ease:function(e){return e>.5?1:0}}),this.input.keyboard.on("keydown_SPACE",function(e){this.scene.start("play",{lives:3,level:1})},this)}};class r extends Phaser.Physics.Arcade.Sprite{constructor(e,t,s){super(e,t,s,"player"),e.physics.add.existing(this),e.add.existing(this),this.setDrag(100,0).setMaxVelocity(150,500).setSize(12,17).setOffset(6,7).setCollideWorldBounds(!0),this.cursors=e.input.keyboard.createCursorKeys(),e.anims.create({key:"idle",frames:e.anims.generateFrameNumbers("player",{start:0,end:0}),frameRate:10,repeat:-1}),e.anims.create({key:"jump",frames:e.anims.generateFrameNumbers("player",{start:1,end:1}),frameRate:10,repeat:-1}),e.anims.create({key:"run",frames:e.anims.generateFrameNumbers("player",{start:3,end:8}),frameRate:10,repeat:-1}),this.hurtCount=0,this.jumpTimer=0}update(){const{cursors:e}=this,t=this.body.blocked.down,s=t?300:100;this.hurtCount>0?(this.visible=Math.floor(this.hurtCount/3)%2==0,this.hurtCount--):this.visible=!0,e.left.isDown?(this.setAccelerationX(-s),this.setFlipX(!0)):e.right.isDown?(this.setAccelerationX(s),this.setFlipX(!1)):this.setAccelerationX(0),(t||this.jumpTimer>0)&&e.up.isDown?(t&&(this.jumpTimer=10),this.setAccelerationY(-1100)):this.setAccelerationY(0),this.jumpTimer>0&&this.jumpTimer--,t?0!==this.body.velocity.x?this.anims.play("run",!0):this.anims.play("idle",!0):this.anims.play("jump",!0)}}class n extends Phaser.Physics.Arcade.Sprite{constructor(e,t,s){super(e,t,s,"ball"),e.physics.add.existing(this),e.add.existing(this),this.setBounce(1,1).setMaxVelocity(500,500).setSize(8,16).setOffset(4,0).setCollideWorldBounds(!0)}}class l extends Phaser.Physics.Arcade.Sprite{constructor(e,t,s){super(e,t,s,"cat"),e.physics.add.existing(this),e.add.existing(this),e.anims.create({key:"cat-idle",frames:e.anims.generateFrameNumbers("cat",{start:0,end:1}),frameRate:1,repeat:-1}),this.setMaxVelocity(500,500).setSize(24,16).setOffset(0,0).setCollideWorldBounds(!0),this.anims.play("cat-idle",!0)}}const h=16,d=h+15;var c=class extends Phaser.Scene{constructor(e){super({key:"play"})}create(e){this.level=e.level,this.lives=e.lives,console.log(e);const t=this.make.tilemap({key:"level"+this.level}),s=t.addTilesetImage("tiles","tiles");t.createStaticLayer("background",s,0,0),t.createStaticLayer("furniture",s,0,0);const i=t.createDynamicLayer("world",s,0,0);i.setCollisionByProperty({collides:!0}),this.physics.world.gravity.y=350,this.worldLayer=i;const a=t.findObject("objects",e=>"start"===e.name);this.player=new r(this,a.x,a.y),this.physics.add.collider(this.player,i);const o=t.findObject("objects",e=>"popcorn"===e.name);this.popcornQueue=[{x:Math.floor(o.x/8),y:Math.floor(o.y/8)}],this.goals=this.physics.add.group({classType:Phaser.GameObjects.Zone}),t.filterObjects("objects",function(e){return"goal"===e.type}).forEach(function(e){this.goals.create(e.x,e.y,e.width,e.height).body.allowGravity=!1},this),this.physics.add.overlap(this.player,this.goals,this.onGoal,null,this),this.baddies=this.physics.add.group(),t.filterObjects("objects",function(e){return"ball"===e.type||"cat"===e.type}).forEach(function(e){"ball"===e.type&&this.baddies.add(new n(this,e.x,e.y)),"cat"===e.type&&this.baddies.add(new l(this,e.x,e.y))},this),this.physics.add.collider(this.baddies,i),this.physics.add.overlap(this.player,this.baddies,this.playerHitBaddie,null,this);for(var h=0;h<this.lives;h++)this.add.image(16+16*h,16,"life").setScrollFactor(0);const d=this.cameras.main;d.startFollow(this.player),d.setBounds(0,0,t.widthInPixels,t.heightInPixels),d.setDeadzone(40,20),this.physics.world.setBounds(0,0,t.widthInPixels,t.heightInPixels),this.popSounds=[this.sound.add("pop1"),this.sound.add("pop2")],this.physics.pause(),this.time.delayedCall(1e3,function(){this.physics.resume()},[],this),this.playerIsSquashed=!1,this.level<3?this.popRate=1.2:this.popRate=.75,this.popCounter=0}update(e,t){if(!this.physics.world.isPaused)for(this.randomPopSound(),this.baddies.getChildren().forEach(e=>{this.isEntitySquashed(e)&&e.destroy()}),this.player.update(),this.isEntitySquashed(this.player)&&this.doPlayerSquashed(),this.popCounter+=.06*this.popRate*t;this.popCounter>1;)this.popCounter--,this.popSomeCorn()}popSomeCorn(){let e,t=null;do{(t=this.popcornQueue.shift())&&(e=this.worldLayer.getTileAt(t.x,t.y))}while(t&&e&&e.collides);if(t){const{x:e,y:s}=t;this.popcornLocation(e,s),this.queuePush(e,s+1),this.queuePush(e-1,s),this.queuePush(e+1,s),this.queuePush(e,s-1)}}randomPopSound(){Math.random()<.08?this.popSounds[0].play():Math.random()<.08&&this.popSounds[1].play()}isEntitySquashed(e){const t=e.body,s=t.top,i=t.left,a=t.right,o=t.bottom;return this.doesWorldXYCollide(i,s)&&this.doesWorldXYCollide(i,o)&&this.doesWorldXYCollide(a,s)&&this.doesWorldXYCollide(a,o)}doesWorldXYCollide(e,t){const s=this.worldLayer.getTileAtWorldXY(e,t);return s&&s.collides}queuePush(e,t){const s=this.worldLayer.getTileAt(e,t);s&&s.collides||this.popcornQueue.push({x:e,y:t})}updatePopcornTile(e,t){const s=function(e,t,s,i){return(e?1:0)+(t?2:0)+(s?4:0)+(i?8:0)}(this.isPopcorn(e,t-1),this.isPopcorn(e+1,t),this.isPopcorn(e,t+1),this.isPopcorn(e-1,t))+h;this.worldLayer.putTileAt(s,e,t).setCollision(!0)}isPopcorn(e,t){const s=this.worldLayer.getTileAt(e,t);if(s){const e=s.index;return e>=h&&e<=d}return!1}popcornLocation(e,t){this.updatePopcornTile(e,t),this.isPopcorn(e,t-1)&&this.updatePopcornTile(e,t-1),this.isPopcorn(e+1,t)&&this.updatePopcornTile(e+1,t),this.isPopcorn(e,t+1)&&this.updatePopcornTile(e,t+1),this.isPopcorn(e-1,t)&&this.updatePopcornTile(e-1,t)}doPlayerSquashed(){this.playerIsSquashed||(this.playerIsSquashed=!0,this.cameras.main.shake(500),this.time.delayedCall(250,function(){this.cameras.main.fade(250)},[],this),this.time.delayedCall(500,function(){this.lives>1?this.scene.restart({level:this.level,lives:this.lives-1}):this.scene.start("gameover")},[],this))}playerHitBaddie(){this.player.hurtCount>0||(this.player.hurtCount=60,this.player.setVelocityX(0))}onGoal(){this.physics.pause(),this.time.delayedCall(500,function(){this.level<3?this.scene.restart({level:this.level+1,lives:this.lives}):this.scene.start("completed")},[],this)}};var p=class extends Phaser.Scene{constructor(e){super({key:"gameover"})}create(){this.add.bitmapText(95,40,"baseFont","GAME OVER"),this.add.bitmapText(45,80,"baseFont","BUTTER LUCK NEXT TIME");var e=this.add.bitmapText(35,165,"baseFont","PRESS SPACE TO CONTINUE");this.tweens.add({targets:e,alpha:0,duration:500,ease:"Power2",yoyo:!0,loop:1e5,ease:function(e){return e>.5?1:0}}),this.input.keyboard.on("keydown_SPACE",function(e){this.scene.start("title")},this)}};var u=class extends Phaser.Scene{constructor(e){super({key:"completed"})}create(){this.add.bitmapText(85,40,"baseFont","COMPLETED!!"),this.add.bitmapText(25,80,"baseFont","IT DOESN'T GET ANY BUTTER");var e=this.add.bitmapText(40,165,"baseFont","PRESS SPACE TO REPLAY");this.tweens.add({targets:e,alpha:0,duration:500,ease:"Power2",yoyo:!0,loop:1e5,ease:function(e){return e>.5?1:0}}),this.input.keyboard.on("keydown_SPACE",function(e){this.scene.start("title")},this)}},y={type:Phaser.AUTO,backgroundColor:"#000000",width:256,height:224,physics:{default:"arcade",arcade:{}},scene:[i,a,o,c,p,u],antialias:!1,pixelArt:!0,fps:{min:10,target:60},callbacks:{postBoot:function(){f()}}},m=new Phaser.Game(y);function f(){const e=m.config.width,t=m.config.height,s=window.innerWidth/e,i=window.innerHeight/t,a=Math.floor(Math.min(s,i));m.canvas&&(m.canvas.style.width=a*e+"px",m.canvas.style.height=a*t+"px")}window.addEventListener("resize",function(){f()},!1)}]);
//# sourceMappingURL=app.js.map