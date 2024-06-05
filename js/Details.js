// ? =============> Global ===============>
const params = location.search;
const id = new URLSearchParams(params);
let gameDetails = {}
const loading = document.querySelector('.loading')
const mode = document.getElementById('mode');
// ! =============> When Start ===============>
getDetails()
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

// ! =============> Functions ===============>
async function getDetails() {
    loading.classList.remove("d-none");
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
    };
    try {
        const api = await fetch(url, options)
    const response = await api.json()
        gameDetails = response;
        loading.classList.add("d-none");
        
    displayDetails()
    } catch (error) {
        console.error(error);
    }
    
    }
function displayDetails() { 
    let gameBox = `
    <div class="link">
            <a href="./Home.html">Home</a>
            <span>/</span>
            <span>${gameDetails.title}</span>
        </div>
    <div class="row">
            <div class="col-xl-4">
                <div class="game-img">
                    <img src="${gameDetails.thumbnail}" alt=${gameDetails.title}>
                </div>
            </div>
            <div class="col-xl-8">
                <div class="game-info">
                    <h1>${gameDetails.title}</h1>
                    <p>${gameDetails.description}</p>
                    <div class="game-footer">
                    <span>${gameDetails.genre}</span>
                    <span>${gameDetails.platform}</span>
                    </div>
                    <a href=${gameDetails.game_url} target="_blank" class="game-link">Play Now</a>
                    </div>
            </div>
        </div>
    `;
    document.getElementById('gameDetails').innerHTML = gameBox;
       const backgroundImage = gameDetails.thumbnail.replace("thumbnail", "background");

   document.body.style.cssText = `
   background-image:url('${backgroundImage}') ;
   background-size:cover;
   background-position:center; `
}
 
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

//  =============> Validation ===============>

