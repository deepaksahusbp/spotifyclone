function myFunction() {
  document.getElementById("myDIV").style.backgroundImage =
    "url(images/backb.png)";
}

myFunction();

//Initialization

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let love = document.getElementById("love");
let flag = true;

let songs = [
  {
    songName: "Jogi - Shadi Me Jarur Aana",
    filePath: "songs/1.mp3",
    coverPath: "images/1.jpg",
  },
  {
    songName: "Maana Ke Hum Yaar Nahin",
    filePath: "songs/2.mp3",
    coverPath: "images/2.jpg",
  },
  {
    songName: "Capital Letters",
    filePath: "songs/3.mp3",
    coverPath: "images/3.jpg",
  },
  {
    songName: "Jiya Tu Bihar ke Lala",
    filePath: "songs/4.mp3",
    coverPath: "images/4.jpg",
  },
  {
    songName: "Nazm Nazm - Bareilly Ki Barfi",
    filePath: "songs/5.mp3",
    coverPath: "images/5.jpg",
  },
  {
    songName: "Jo Bhi Main - Rockstar",
    filePath: "songs/6.mp3",
    coverPath: "images/6.jpg",
  },
  {
    songName: "Kun Faaya Kun - RockStar",
    filePath: "songs/7.mp3",
    coverPath: "images/7.jpg",
  },
  {
    songName: "Tu Banja Gali Benaras",
    filePath: "songs/8.mp3",
    coverPath: "images/8.jpg",
  },
  {
    songName: "Channa Mereya",
    filePath: "songs/9.mp3",
    coverPath: "images/9.jpg",
  },
  {
    songName: "Naah - Harrdy",
    filePath: "songs/10.mp3",
    coverPath: "images/10.jpg",
  },
];

let songList = [
  "Jogi - Shadi Me Jarur Aana - Yasser Desai and Aakanksha Sharma",
  "Maana Ke Hum Yaar Nahin - Meri Pyari Bindu - Parineeti Chopra, Sachin-Jigar and Kausar Munir",
  "Capital Letters - Fifty Shades Freed - Hailee Steinfeld",
  "Jiya Tu Bihar ke Lala - Gangs of Wasseypur -  Manoj Tiwari",
  "Nazm Nazm - Bareilly Ki Barfi - Ayushmann Khurrana",
  "Jo Bhi Main - Rockstar - Mohit Chauhan",
  "Kun Faaya Kun - RockStar -A. R. Rahman, Javed Ali, and Mohit Chauhan",
  "Tu Banja Gali Benaras Ki - Shadi Me jarur Aana - Asit Tripathy",
  "Channa Mereya - Ae Dil Hai Mushkil - Pritam and Arijit Singh",
  "Naah - Harrdy Sandhu and Nora Fatehi",
];

//Handle Like Unlike
love.addEventListener("click", () => {
  if (flag) {
    love.src = "images/love.png";
    flag = false;
  } else {
    love.src = "images/like.png";
    flag = true;
  }
});

//Handle Share
share.addEventListener("click", () => {
  let listeningTo = songList[songIndex];
  navigator.clipboard.writeText(
    "Hey Listen to this Song : " + listeningTo + "at https://open.spotify.com/"
  );
  alert(
    "Copied to Clipboard : " +
      "Hey Listen to this Song : " +
      listeningTo +
      "at https://open.spotify.com/"
  );
});

//Handle Shuffle
shuffle.addEventListener("click", () => {
  songIndex = Math.floor(Math.random() * 10);
  currentSong.innerHTML = songList[songIndex];
  document.getElementById("banner").src = `images/${songIndex + 1}.jpg`;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.src = "images/pause.png";
});

//Handle Play Pause Click

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.src = "images/pause.png";
  } else {
    audioElement.pause();
    masterPlay.src = "images/play.png";
  }
});

//Listen to Events

audioElement.addEventListener("timeupdate", () => {
  let Dsec = Math.floor(audioElement.duration);
  let Dmin = Math.floor(Dsec / 60);
  let Dminsec = Math.floor(Dsec - 60 * Dmin);

  let Csec = Math.floor(audioElement.currentTime);
  let Cmin = Math.floor(Csec / 60);
  let Cminsec = Math.floor(Csec - 60 * Cmin);

  var Dmins, Dminsecs, Cmins, Cminsecs;

  if (Dmin < 10) {
    Dmins = "0" + Dmin;
  } else {
    Dmins = Dmin;
  }

  if (Dminsec < 10) {
    Dminsecs = "0" + Dminsec;
  } else {
    Dminsecs = Dminsec;
  }

  if (Cmin < 10) {
    Cmins = "0" + Cmin;
  } else {
    Cmins = Cmin;
  }

  if (Cminsec < 10) {
    Cminsecs = "0" + Cminsec;
  } else {
    Cminsecs = Cminsec;
  }

  document.getElementById("durationTime").innerHTML = Dmins + " : " + Dminsecs;
  document.getElementById("currentTime").innerHTML = Cmins + " : " + Cminsecs;

  //updateseekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

audioElement.addEventListener("ended", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  currentSong.innerHTML = songList[songIndex];
  document.getElementById("banner").src = `images/${songIndex + 1}.jpg`;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.src = "images/pause.png";
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

document.getElementById("forward").addEventListener("click", () => {
  //console.log(Math.floor(Math.round(audioElement.duration) / 60));
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }

  currentSong.innerHTML = songList[songIndex];
  document.getElementById("banner").src = `images/${songIndex + 1}.jpg`;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.src = "images/pause.png";
});

document.getElementById("backward").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }

  currentSong.innerHTML = songList[songIndex];
  document.getElementById("banner").src = `images/${songIndex + 1}.jpg`;
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.src = "images/pause.png";
});

//Playing Any Song anytime by clicking

Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
  element.addEventListener("click", (e) => {
    // console.log(e.target);
    // console.log(e.target.id);
    Ind = parseInt(e.target.id);
    songIndex = Ind;

    currentSong.innerHTML = songList[Ind];
    document.getElementById("banner").src = `images/${Ind + 1}.jpg`;

    masterPlay.src = "images/pause.png";
    audioElement.src = `songs/${Ind + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
  });
});
