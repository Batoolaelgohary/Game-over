// ? =============> Global ===============>
let gamesData = [];
const navLink = document.querySelectorAll('.nav-link');
const loading = document.querySelector('.loading')
const mode = document.getElementById('mode');


// ! =============> When Start ===============>
getGames('mmorpg')

if (localStorage.getItem('theme')!=null) {
    const theme = localStorage.getItem('theme');
    if( theme == 'light') {
        document.querySelector('#mode').classList.replace('fa-sun', 'fa-moon')
        document.documentElement.setAttribute('data-theme', 'light')
    }
    if (theme == 'dark') {
        document.querySelector('#mode').classList.replace('fa-moon', 'fa-sun')
        document.documentElement.setAttribute('data-theme', 'dark')
    }
}



// * =============> Events ===============>

navLink.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.active').classList.remove('active');
        link.classList.add('active')
        const category = e.target.innerHTML;
        document.getElementById('cat-name').innerHTML = category;
        getGames(category)
    })
})

document.getElementById('logOut').addEventListener('click', () => {
    localStorage.removeItem('uToken');
    location.href = './index.html';
})
mode.addEventListener('click', (e) => {
    if (mode.classList.contains('fa-sun')) {
        document.querySelector('#mode').classList.replace('fa-sun', 'fa-moon')
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme','light')
    } else {
        document.querySelector('#mode').classList.replace('fa-moon', 'fa-sun')
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme','dark')
        
    }
   })

// ! =============> Functions ===============>

function playVideo(event) {
    let video =event.target.querySelector('.video');
    video.classList.remove('d-none');
    video.muted =true;
    video.play();
}
function stopVideo(event) {
    let video = event.target.querySelector('.video');
    video.classList.add('d-none');
    video.muted = true;
    video.pause();
      }
function gameDetails(id) {
    console.log(id);
    location.href =`../Details.html?id=${id}`
}
async function getGames(category) {
    loading.classList.remove('d-none')
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        gamesData = result;
        loading.classList.add('d-none')
        displayGames();
    } catch (error) {
        console.error(error);
    }
}
function displayGames() {
    let boxGame = ``;
    for (let i = 0; i < gamesData.length; i++){
        let video = gamesData[i].thumbnail.replace('thumbnail.jpg','videoplayback.webm')
        boxGame += `<div class="col-xl-3 col-lg-4 col-md-6 " onmouseleave='stopVideo(event)' onclick='gameDetails(${gamesData[i].id})' onmouseenter='playVideo(event)'>
                    
                        <div class="game">
                            <div class="game-img">
                                <img src=${gamesData[i].thumbnail} alt="">
                                    <video muted="true" loop class="d-none video" src=${video}></video>
                            
                            </div>
                            <div class="game-info">
                                <div class="title">
                                    <h4>${gamesData[i].title}</h4>
                                    <button>free</button>
                                </div>
                                <p> ${gamesData[i].short_description}</p>
                            </div>
                            <div class="game-footer">
                                <span>${gamesData[i].genre}</span>
                                <span>${gamesData[i].platform}</span>
                            </div>
                        </div>
                </div>`;
            }
            document.getElementById("game-box").innerHTML = boxGame;
}





//  =============> Validation ===============>