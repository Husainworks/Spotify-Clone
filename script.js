//make it responsive
//when we resume from the songlist the song should resume from the place it has stopped

//Initialize the variables
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
    { songName: "6", filePath: ".song/6.mp3", coverPath: "./covers/6.jpg" },
    { songName: "7", filePath: ".song/7.mp3", coverPath: "./covers/7.jpg" },
    { songName: "8", filePath: ".song/8.mp3", coverPath: "./covers/8.jpg" },
    { songName: "9", filePath: ".song/9.mp3", coverPath: "./covers/9.jpg" },
    { songName: "10", filePath: ".song/10.mp3", coverPath: "./covers/10.jpg" }
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
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

//SeekBar
audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration) / 100);
})

//using chatgpt
//change the pause icon to play icon when the songs finishes
audioElement.addEventListener("ended", () => {
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
});

//update duration in songlist
songItems.forEach((element, i) => {
    // Set cover and song name as before
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-name")[0].innerHTML = songs[i].songName;

    // Create an audio element to load the song file and get duration
    let tempAudio = new Audio(songs[i].filePath);
    tempAudio.addEventListener("loadedmetadata", () => {
        // Convert duration to minutes and seconds
        let minutes = Math.floor(tempAudio.duration / 60);
        let seconds = Math.floor(tempAudio.duration % 60).toString().padStart(2, '0');
        element.getElementsByClassName("timestamp")[0].innerHTML = `${minutes}:${seconds} <i id="${i + 1}" class="far song-item-play fa-circle-play"></i>`;
    });
});

//we can be able to pause the song in the songlist
Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
    element.addEventListener("click", (e) => {
        const selectedSongIndex = parseInt(e.target.id);
        
        if (currentSongIndex === selectedSongIndex && !audioElement.paused) {
            // If the clicked song is already playing, pause it
            audioElement.pause();
            e.target.classList.add("fa-circle-play");
            e.target.classList.remove("fa-circle-pause");
            gif.style.opacity = 0;
            masterPlay.classList.add("fa-circle-play");
            masterPlay.classList.remove("fa-circle-pause");
            currentSongIndex = null;  // Reset current song index since it's paused
        } else {
            // If a different song is selected or current song is paused, play the new song
            makeAllPlays();  // Reset all play icons to play state
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = `songs/${selectedSongIndex}.mp3`;
            masterSongName.innerText = songs[selectedSongIndex - 1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            currentSongIndex = selectedSongIndex;  // Update current song index
        }
    });
});

//Autoplay Feature in which next songs starts playing after 3s
audioElement.addEventListener("ended", () => {
    setTimeout(() => {
        // Check if there are more songs; loop back to the start if at the end
        if (songIndex >= songs.length) {
            songIndex = 1;  // Start from the first song
        } else {
            songIndex += 1;
        }

        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex - 1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;

        // Update icons to show the new song is playing
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");

        // Reset all song-item-play icons, then update the current song's icon
        makeAllPlays();
        document.getElementById(songIndex).classList.remove("fa-circle-play");
        document.getElementById(songIndex).classList.add("fa-circle-pause");

        currentSongIndex = songIndex;  // Update the current song index
    }, 3000);  // 3-second delay
});


//code with harry
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
        element.classList.add("fa-circle-play");
        element.classList.remove("fa-circle-pause");
    })
}

// Array.from(document.getElementsByClassName("song-item-play")).forEach((element) => {
//     element.addEventListener("click", (e) => {
//         makeAllPlays();
//         songIndex = parseInt(e.target.id)
//         e.target.classList.remove("fa-circle-play");
//         e.target.classList.add("fa-circle-pause");
//         audioElement.src = `songs/${songIndex}.mp3`;
//         masterSongName.innerText = songs[songIndex - 1].songName;
//         audioElement.currentTime = 0;
//         audioElement.play();
//         gif.style.opacity = 1;
//         masterPlay.classList.remove("fa-circle-play");
//         masterPlay.classList.add("fa-circle-pause");
//     })
// })

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