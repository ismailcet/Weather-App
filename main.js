// https://api.openweathermap.org/data/2.5/weather?q=adana&units=metric&APPID=b2c108adfd33c611af304b06a187e8bd
// api.openweathermap.org/data/2.5/forecast?q=adana&appid=b2c108adfd33c611af304b06a187e8bd


//https://api.openweathermap.org/data/2.5/weather?q=adana&appid=b2c108adfd33c611af304b06a187e8bd
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const api={
    key:"b2c108adfd33c611af304b06a187e8bd",
    baseurl:"https://api.openweathermap.org/data/2.5/weather?q="
};

const searchbox=document.querySelector('#searchBox');
searchbox.addEventListener('keypress',getValue);

function getValue(event){
    if(event.keyCode==13){
        getResult(searchbox.value);
    }
}

function getResult(elemet){
    fetch(`${api.baseurl}${elemet}&appid=${api.key}`).then(weather=>{
        return weather.json();
    }).then(displayResult);
}

function displayResult(weather){

    let city=document.querySelector('#city-name').innerText=weather.name;

    let now=new Date();
    let date=document.querySelector('#date');
    date.innerText=dateBuilder(now);

    let temp=document.querySelector('#temp');
    const celsius = (weather.main.temp-(273.15));
    temp.innerHTML=`${Math.round(celsius)}<span class="c">°C</span>`;

    let weat=document.querySelector('#weat');
    weat.innerText=weather.weather[0].main;

    let minValue=weather.main.temp_min-(273.15);
    let min=document.querySelector('.min');
    min.innerText=`${Math.round(minValue)}°C`;

    let maxValue=weather.main.temp_max-(273.15);
    let max=document.querySelector('.max');
    max.innerText=`${Math.round(maxValue)}°C`;

    changeImg(weather.weather[0].main);
}

function dateBuilder(d){
    let months=['January','February','March','April','May','June','July','August','September','October','November','December'];
    let days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    
    return `${day} ${date} ${month} ${year}`;
}

function changeImg(element){
    let img=document.querySelector('#animation');
    if(element=='Clear'){
        img.setAttribute('src','img/sun.svg');
    }else if(element=='Rain'){
        img.setAttribute('src','img/rain.svg');
    }else if(element=='Mist' || element=='Clouds'){
        img.setAttribute('src','img/bulutlu.svg');

    }
}