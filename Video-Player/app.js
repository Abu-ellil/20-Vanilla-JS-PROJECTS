const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");


const input = document.getElementById('link')
const btnAdd = document.getElementById('btn')

btnAdd.addEventListener('click',()=>{
  const link = input.value
  console.log(link);
  video.src = link
  video.play()
})

//play and pause///
function toggelVideoStatus() {
  if(video.paused){
    video.play()
  }else{
    video.pause()
  }
}
/////////ICON//////////
function updatePlayIcon() {
  if(video.paused){
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`
  }else{
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`
  }
}
/////////UPDATE-PROGRESS//////////
function updateProgress() {
  progress.value = (video.currentTime / video.duration * 100)
  ////set minutes///
  let mints = Math.floor(video.currentTime/60)
  if(mints<10){
    mints = '0'+String(mints)
  }
  ////set seconds///
  let secns = Math.floor(video.currentTime%60)
  if(secns<10){
    secns = '0'+String(secns)
  }
  ////set minutes///
  timestamp.innerHTML = `${mints}:${secns}`
}
/////////VID-PROGRESS//////////
function setVideoProgress() {
 video.currentTime = (+progress.value * video.duration)/100
}
/////////STOP//////////
function stopVideo() {
  video.currentTime = 0
  video.pause()
}

/////////ALL-EVENT-LISTENERS//////////
video.addEventListener("click", toggelVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggelVideoStatus);
stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
