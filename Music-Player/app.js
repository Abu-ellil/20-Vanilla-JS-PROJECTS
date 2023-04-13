const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

/////////////tiles of songs

const songs = ["hey", "summer", "ukulele"];

////////trackes

let songIndex = 1;

//////////songs goOn

loadSong(songs[songIndex])

/////////update Songs Details

function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}
//////Play && Pause

function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}
function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}
///////////Next && Prev

// function prevSong() {
//   songIndex--
//   if (songIndex < 0) {
//     songIndex = songs.length -1
//   }
//   playSong()
// }
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}
function nextSong() {
 songIndex++
  if (songIndex > songs.length-1) {
    
    songIndex = 0
  }
  loadSong(songs[songIndex]);

  playSong();
}


///////////////Progress

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  progress.style.width = `${(currentTime/duration)*100}%`
  if (currentTime === duration) {
    nextSong()
  }
}
//////////set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
console.log(width);
  audio.currentTime = (clickX / width) * duration;
  
}

//////////all Event listeners

playBtn.addEventListener('click', () => {
  console.log(audio.duration/60);
  const isPlaying = musicContainer.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  }else{
    playSong()
  }
})
////////////change

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress)

