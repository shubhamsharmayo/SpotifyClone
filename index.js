let mp3 = new Audio();
let i = 1;

async function mainn() {
  async function song(q) {
    let a = await fetch("http://127.0.0.1:3000/songs");
    let resp = await a.text();
    let div = document.createElement("div");
    div.innerHTML = resp;
    let musiclist = div.getElementsByTagName("a");

    // console.log(td)
    // console.log(td[q].href);
    return [musiclist[q].href, musiclist[q]];
  }

  async function songlinking(f) {
    let x = await song(f);
    // console.log(x[1])
    return [x[0], x[1]];
  }
  async function songnameing(number) {
    let ans = await songlinking(number);
    document.querySelector(".songname").innerHTML = ans[1].innerHTML;
    console.log(ans[1].innerHTML);
  }

  async function main(l) {
    let t = await songlinking(l);
    // console.log(t)

    mp3.src = t[0];
    // console.log(mp3);
    mp3.play();
    // console.log(t);
  }

  // play and pause event
  document.querySelector(".play").addEventListener("click", () => {
    if (mp3.paused) {
      mp3.play();
      document.querySelector(".play").setAttribute("src", "./svg/pause.svg");
    } else {
      mp3.pause();
      document.querySelector(".play").setAttribute("src", "./svg/play.svg");
    }
  });

  let b = await fetch("http://127.0.0.1:3000/songs");
  let respo = await b.text();
  let divn = document.createElement("div");
  divn.innerHTML = respo;
  let tdm = divn.getElementsByTagName("a");
  let i = tdm.length;

  // List of songs on playlist
  let listofsongs = [];
  for (num = 1; num < tdm.length; num++) {
    listofsongs.push(tdm[num].innerHTML);
  }
  let songlinks = [];
  for (link = 1; link < tdm.length; link++) {
    songlinks.push(tdm[link].href);
  }
  // console.log(songlinks)
  let playmusic = (track) => {
    mp3.src = "./songs/" + track;

    if (mp3.paused) {
      mp3.play();

      document.querySelector(".play").setAttribute("src", "./svg/pause.svg");
    } else {
      mp3.pause();
      document.querySelector(".play").setAttribute("src", "./svg/play.svg");
    }
    console.log(mp3.src);
    let index = listofsongs.indexOf(track);
    // console.log(index)
    return [index, mp3.src];
  };

  //  let mop = playmusic()
  //  console.log(kit)

  // console.log(listofsongs);
  //songtitle assigning in array
  let ganna = document.querySelector(".down").getElementsByTagName("ul")[0];

  ganna.innerHTML = "";
  for (const iterator of listofsongs) {
    ganna.innerHTML =
      ganna.innerHTML +
      `<li class="leftsonglist"><img src="./svg/listsvg.svg" alt="" class=" seeksvgs seeksvg ">${iterator}</li>`;
    console.log(iterator);
  }
  Array.from(
    document.querySelector(".songlists").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener(
      "click",
      (clickplay = () => {
        console.log(
          e.innerHTML.split(
            '<img src="./svg/listsvg.svg" alt="" class=" seeksvgs seeksvg ">'
          )[1]
        );
        listofsongs.indexOf(e.innerHTML);
        document.querySelector(".songname").innerHTML = e.innerHTML.split(
          '<img src="./svg/listsvg.svg" alt="" class=" seeksvgs seeksvg ">'
        )[1];
        playmusic(
          e.innerHTML.split(
            '<img src="./svg/listsvg.svg" alt="" class=" seeksvgs seeksvg ">'
          )[1]
        );
      })
    );
  });
  // loading song durations
  mp3.onloadedmetadata = function () {
    const minutesduration = Math.floor(mp3.duration / 60);
    const secondsduration = Math.floor(mp3.duration % 60);
    const format = `${minutesduration
      .toString()
      .padStart(2, "0")}:${secondsduration.toString().padStart(2, "0")}`;
    // console.log(mp3.duration);
    document.querySelector(".time").innerHTML = format;
  };
//current time of song display
  mp3.addEventListener("timeupdate", () => {
    const minutes = Math.floor(mp3.currentTime / 60);
    const seconds = Math.floor(mp3.currentTime % 60);
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.querySelector(".currenttime").innerHTML = formattedTime;
  });
// seekbar functionality
  mp3.addEventListener("timeupdate", () => {
    let j = (mp3.currentTime / mp3.duration) * 100;

    document.querySelector(".slider").value = j;
    var seekbar = document.querySelector("#seekbar");

    seekbar.addEventListener("change", () => {
      var seekto = mp3.duration * (seekbar.value / 100);
      mp3.currentTime = seekto;
      console.log(seekto);
    });
  });

  // add eventlistener to previous button
  let previous = () => {
    i -= 1;
    if (i <= 1) {
      main(1);
      i = 1;
      document.querySelector(".play").setAttribute("src", "./svg/pause.svg");
      songnameing(i);
    } else {
      main(i);

      document.querySelector(".play").setAttribute("src", "./svg/pause.svg");
      songnameing(i);
    }
  };
  document.querySelector(".previous").addEventListener("click", previous);

  // add eventlistener to next button
  document.querySelector(".forward").addEventListener("click", () => {
    i += 1;
    if (i > tdm.length - 1) {
      main(tdm.length - 1);
      i = tdm.length - 1;
      document.querySelector(".play").setAttribute("src", "./svg/pause.svg");
      songnameing(i);
    } else {
      main(i);
      document.querySelector(".play").setAttribute("src", "./svg/pause.svg");
      songnameing(i);
    }
  });
}
mainn();
