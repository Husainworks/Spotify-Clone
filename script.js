let songIndex = 0;
let currentSongIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("master-song-name");
let songItems = Array.from(document.getElementsByClassName("song-item"));

let songs = [
    { songName: "Warriyo - Mortals [NCS Release]", filePath: ".song/1.mp3", coverPath: "./covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: ".song/2.mp3", coverPath: "./covers/2.jpg" },
    { songName: "DEAF KEV - Invincible [NCS Release]", filePath: ".song/3.mp3", coverPath: "./covers/3.jpg" },
    { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: ".song/4.mp3", coverPath: "./covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight-feat-Johnning [NCS Release]", filePath: ".song/5.mp3", coverPath: "./covers/5.jpg" },
    { songName: "Johnning, Janji - Nostalgia [NCS Release]", filePath: ".song/6.mp3", coverPath: "./covers/6.jpg" },
    { songName: "More Plastic - Obsession [NCS Release]", filePath: ".song/7.mp3", coverPath: "./covers/7.jpg" },
    { songName: "Sayfro, BAYZY - On and On [NCS Release]", filePath: ".song/8.mp3", coverPath: "./covers/8.jpg" },
    { songName: "SGNLS, Guy Arthur, Aiobahn - All or Nothing [NCS Release]", filePath: ".song/9.mp3", coverPath: "./covers/9.jpg" },
    { songName: "Spicyverse - Vibe [NCS Release]", filePath: ".song/10.mp3", coverPath: "./covers/10.jpg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerHTML = songs[i].songName;
})

// handle play/pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
});

//SeekBar
audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})

//change the pause icon to play icon when the songs finishes
audioElement.addEventListener("ended", () => {
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
});

//we can be able to pause the song in the songlist
Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
    element.addEventListener("click", (e) => {
        const selectedSongIndex = parseInt(e.target.id);

        if (currentSongIndex === selectedSongIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.add("fa-circle-play");
            e.target.classList.remove("fa-circle-pause");
            gif.style.opacity = 0;
            masterPlay.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");
            currentSongIndex = null;
        } else {
            makeAllPlays();
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = `songs/${selectedSongIndex}.mp3`;
            masterSongName.innerText = songs[selectedSongIndex - 1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            currentSongIndex = selectedSongIndex;
        }
    });
});

//Autoplay Feature in which next songs starts playing after 3s
audioElement.addEventListener("ended", () => {
    setTimeout(() => {
        if (songIndex >= songs.length) {
            songIndex = 1;
        } else {
            songIndex += 1;
        }

        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;

        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

        makeAllPlays();
        document.getElementById(songIndex).classList.remove("fa-circle-play");
        document.getElementById(songIndex).classList.add("fa-circle-pause");

        currentSongIndex = songIndex;
    }, 3000);
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
    })
}

document.getElementById("next").addEventListener("click", () => {
    if (songIndex > 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex - 1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
});