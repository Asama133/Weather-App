
let resultDiv = document.querySelector(".result")
let api_key = "69ec57e3390b37aec40743109f7f5325"
let unit = "metric"
let input = document.querySelector("input")
let city = "Cairo"

window.addEventListener("load",getWeatherData)
document.querySelector("#search").addEventListener("click",(e)=>{
   
city = input.value
    input.value == "" ?  resultDiv.innerHTML = "please enter city"    :  getWeatherData()
 
    
})

function getDate(timestamp, timezone){
    const convertTimezone = timezone / 3600; // convert seconds to hours 
   const date = new Date(timestamp * 1000);
   const options = {
       weekday: "long",
       day: "numeric",
       month: "long",
       year: "numeric",
       hour: "numeric",
       minute: "numeric",
       timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
       hour12: true,
   }
   return date.toLocaleString("en-US", options)
  
}
// convert country code to name 
function convert(country){
    let regionName = new Intl.DisplayNames(["en"],{type:"region"})
    return regionName.of(country)
}

 async function getWeatherData(){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=${unit}`
    
try{
    let response = await fetch(url) 
    let data = await response.json()
    console.log(data);
resultDiv.innerHTML = `

        <h2 class="city">${data.name}</h2>
        <p class="date">${getDate(data.dt, data.timezone)}</p>
        <div class="country">
            <h3>${convert(data.sys.country)}</h3> 
            <img src="" width="70vw" width="50vh" alt="" class="flag">
        </div>
        <h3 class="weatherMain">${data.weather[0].main}</h3>
        <div><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" width="90vw" height= "90vw" class="icon"></div> 
            <h1 class="temp">${Math.floor(data.main.temp)}&#176C</h1>
                <div class="min-max">
                    <div class="min">
                        <h3>min </h3> 
                        <h4 class="minTemp">${Math.floor(data.main.temp_min)}&#176C</h4>
                    </div>
                    <span></span>
                    <div class="max">
                        <h3>max </h3> 
                        <h4 class="maxTemp">${Math.ceil(data.main.temp_min)}&#176C</h4>
                    </div>
                </div>

       <div class="other">
        <div class="card">
            <i class="fa-solid fa-temperature-full"></i>
            <div>
                <p>Real Feel</p>
                <p class="realfeel">${Math.floor(data.main.feels_like)}&#176</p>
            </div>
        </div>
        <div class="card">
            <i class="fa-solid fa-droplet"></i>
            <div>
                <p>Humidity</p>
                <p class="humidity">${Math.floor(data.main.humidity)}%</p>
            </div>
        </div>
        <div class="card">
            <i class="fa-solid fa-wind"></i>
            <div>
                <p>Wind</p>
                <p class="wind">${data.wind.speed}m/s</p>
            </div>
        </div>
        <div class="card">
            <i class="fa-solid fa-gauge-high"></i>
            <div>
                <p>Pressure</p>
                <p class="pressure">${data.main.pressure}hpa</p>
            </div>
        </div>
    </div>
   
`
changeBackground(data.weather[0].main)
    fetch(`https://restcountries.com/v3.1/name/${convert(data.sys.country)}`)
    .then(response => response.json())
    .then(data =>{
    console.log(data);
    console.log(data[0].flags.png);
document.querySelector(".flag").src = `${data[0].flags.png}`
})

} catch(err){
resultDiv.innerHTML = "city not found"
// document.querySelector(".container").style.height = "fit-content"
} finally{
    input.value = ""
}

 } 
 console.log(resultDiv.children);

function changeBackground(status){
   let movingImg = document.querySelector("section div")

    switch(status){
        case "Clear" : movingImg.style.background = "url(images/clear2.jpg)";
        break;
        case "Clouds" : movingImg.style.background = "url(images/cloud.jpg)";
        break;
        case "Rain" : movingImg.style.background = "url(images/rain.jpg)";
        break;
        case "Mist" : movingImg.style.background = "url(images/mist.jpg)";
        break;
        case  "Fog" : movingImg.style.background = "url(images/mist.jpg)";
        break;
        case "sunny": movingImg.style.background = "url(images/sun.jpg)"
         case "Drizzle": movingImg.style.background = "url(images/drizzle.jpg)"
         break;
         case "Dust": movingImg.style.background = "url(images/dust.jpg)"
         break;
         default : movingImg.style.background = "linear-gradient(rgba(0, 0, 255, 0.656),aqua)"
    }

}








































































































































