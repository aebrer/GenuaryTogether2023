/*

Genuary 2023
for #GenuaryTogether
January 3rd, 2023
theme: "Glitch Art"
collaborators:
- aebrer
- anaglyphic

*/


//thanks @Yazid for these two helper functions
function random_num(a, b) {
    return a+(b-a)*fxrand()
  }
function random_int(a, b) {
  return Math.floor(random_num(a, b+1))
}

function randomChoice(arr) {
  return arr[Math.floor(random_num(0,1) * arr.length)];
}


// will decide on mobile mode unless there is a pointer device with hover capability attached
let is_mobile = window.matchMedia("(any-hover: none)").matches

// hashes = "hriirieiririiiritiififiviviifj"
// if(hashes==="debug"){hashes=random_num(0,1000000)}
fxrand = sfc32(...hashes)

//PGrahics object
let pg;

let wth;
let hgt;
let hc;
let ww;
let wh;
let x;
let y;
let col;
let shred_count;
let shred_lim;
let splay_n;
let water_n;
let pd=2;
let dd;
let initial_run=true;
window.$fxhashFeatures = {}

let mycan;
let tx;
let tex;

//fxhash features
let recursive_shred;
let hori_tear;
let vert_tear;
let c;
let calt;
let prim_col_dir;
let sec_col_dir;
let fullscreen;
let xfac;
let noaa;
let nostroke;

function preload() {
  //tex = loadImage(window.sourcePotImage);
}

function setup() {
  
  x=-16;
  y=-16;
  need_preview=true;
  window.$fxhashFeatures = {}

  recursive_shred=false;
  hori_tear=false;
  vert_tear=false;
  prim_col_dir=false;
  sec_col_dir=false;
  fullscreen=false;
  xfac=8.5
  noaa=true

  fxrand = sfc32(...hashes)
  
  shred_count=0;
  shred_lim=100;
  splay_n=1;
  water_n=25;

  recursive_shred = true
  vert_tear = true

  
  if(isFxpreview){
    ww=1080
    wh=1080
    is_mobile=false
    pd=5
  } else {
    // todo THIS IS A DUMB HACK FOR DEALING WITH A STATIC IMAGE
    ww=2160
    wh=1080
  }

  mycan = createCanvas(ww, wh);

  wth = 512
  hgt = Math.ceil(wth * (wh/ww))
  hc=0
  pg = createGraphics(wth, hgt);
  pg.colorMode(HSL)

  dd=displayDensity()
  let df = Math.ceil(dd * pd * 0.5)
  if(is_mobile){df/=3}
  console.log([dd,pd,df,ww,wh,wth,hgt])
  pixelDensity(df);
  blendMode(BLEND);
  noSmooth();
  pg.background("white");
  
  if (nostroke) {
    pg.noStroke()
  } else {
    pg.stroke("white")
  }

  pg.strokeWeight(1)  

  console.table(window.$fxhashFeatures)
  loop();

  background("white")
  //image(tex, 0, 0, ww, wh, 0, 0, tex.width, tex.height);

}


function draw() {

    blendMode(DIFFERENCE)

    if(shred_count<shred_lim){

      let x;
      let y;

      // load the pixelart image every frame
      //image(pg, 0, 0, ww, wh, 0, 0, wth, hgt)

      // entropy locking
      if (random_int(1,1000)>997)fxrand=sfc32(...hashes)
      if (random_int(1,1000)>997)fxrand=sfc32(...hashes)


      if (recursive_shred){
        for (let i=0;i<splay_n;i++) {
          x=random_int(ww/2-200,ww/2+200)
          y=random_int(wh/6,wh/3)
          
          if (is_mobile) {
            // compatibility mode
            blend(Math.ceil(x+random_num(-ww/32,ww/32)),Math.ceil(y+random_num(-wh/32,wh/32)),Math.ceil(random_num(ww/32,ww/32)),Math.ceil(random_num(wh/32,wh/32)), Math.ceil(x+random_num(-ww/32,ww/32)),Math.ceil(y+random_num(-wh/32,wh/32)),Math.ceil(ww/32),Math.ceil(wh/32), DIFFERENCE)
          } else {
            // some sort of hack
            image(mycan, x+random_num(-ww/32,ww/32),y+random_num(-wh/32,wh/32),ww/32,wh/32, x+random_num(-ww/32,ww/32),y+random_num(-wh/32,wh/32),random_num(ww/32,ww/32),random_num(wh/32,wh/32))

          }
        }
      }

      if (vert_tear) {
        // // // water vfx
        for (let i=0;i<water_n;i++) {
          x=random_int(ww/2-50,ww/2+50)

          if (is_mobile) {
            blend(x, wh/2-390, Math.ceil(max(ww/1024,dd)), random_int(0,400), x, random_int(-5,5), Math.ceil(max(ww/1024,dd)), wh, DIFFERENCE)
          } else {
            image(mycan, x, wh/2-390, max(ww/1024,dd), random_int(0,400), x, random_int(-5,5), max(ww/1024,dd), wh)
          }
        }
      }

      shred_count+=1
      tx="Rendering Shredding: " + Math.round(shred_count/(shred_lim)*100) + " % done"
      document.getElementById('log').innerText = tx;

      return
    } else {
      // done rendering fully
      tx=""
      document.getElementById('log').innerText = tx;
      fxpreview()
      noLoop()
      return
   }
  }

