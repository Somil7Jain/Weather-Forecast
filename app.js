// Fetching the API
const key = "e51899749929dc5c4699ca6515ec9859";
const requestCity = async (city) => {
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}`;
    const response = await fetch(baseURL + query);
    const data = await response.json();
    return data;
}

// Updating the weather cards on button click
updateWeatherApp = (data) => {
    clearInterval(interval);
    let nd = new Date;
    let kk = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime();
    nd = new Date(kk + 1000 * data.timezone);
    let hrs = nd.getHours();
    let mins = nd.getMinutes();
    let secs = nd.getSeconds();
    let amorpm = "AM";
    let str = ``;
    if (hrs > 12) {
        amorpm = "PM";
        hrs %= 12;
    }
    if (hrs < 10) str += `0${hrs} : `;
    else str += `${hrs} : `;
    if (mins < 10) str += `0${mins} : `;
    else str += `${mins} : `;
    if (secs < 10) str += `0${secs} `;
    else str += `${secs} `;
    str += amorpm;
    document.querySelector('.day').innerHTML = `${weekday[nd.getDay()]}`;
    document.querySelector('.month_date').innerHTML = `${nd.getDate()} ${months[nd.getMonth()]} ${nd.getFullYear()} `; document.querySelector('.time').innerHTML = str;

    interval = setInterval(() => {
        kk = new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime();
        nd = new Date(kk + 1000 * data.timezone);
        hrs = nd.getHours();
        mins = nd.getMinutes();
        secs = nd.getSeconds();
        amorpm = "AM";
        str = ``;
        if (hrs > 12) {
            amorpm = "PM";
            hrs %= 12;
        }
        if (hrs < 10) str += `0${hrs} : `;
        else str += `${hrs} : `;
        if (mins < 10) str += `0${mins} : `;
        else str += `${mins} : `;
        if (secs < 10) str += `0${secs} `;
        else str += `${secs} `;
        str += amorpm;
        document.querySelector('.day').innerHTML = `${weekday[nd.getDay()]}`;
        document.querySelector('.month_date').innerHTML = `${nd.getDate()} ${months[nd.getMonth()]} ${nd.getFullYear()} `; document.querySelector('.time').innerHTML = str;
    }, 1000);

    document.querySelector('.city').innerHTML = data.name;
    const imageName = data.weather[data.weather.length - 1].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`
    document.querySelector('.weathericon').innerHTML = `<img src=${iconSrc} alt="" class="icon">`;
    document.querySelector('.temperature').innerHTML = `${(data.main.temp - 273.15).toFixed(2)}&degC`;
    document.querySelector('.weatherresult').innerHTML = `${data.weather[data.weather.length - 1].description}`;
    document.querySelector('.humidity').innerHTML = `Humidity : ${data.main.humidity} %`;
    let speed = data.wind.speed;
    speed *= 3.6;
    document.querySelector('.wind').innerHTML = `Wind : ${speed.toFixed(2)} kmph`;
    let pres = data.main.pressure * 0.000987;
    document.querySelector('.airpressure').innerHTML = `Air Pressure : ${pres.toFixed(4)} atm`;
    document.querySelector('.maxtemp').innerHTML = `Max Temperature : ${(data.main.temp_max - 273.15).toFixed(2)}&degC`;
    document.querySelector('.mintemp').innerHTML = `Min Temperature : ${(data.main.temp_min - 273.15).toFixed(2)}&degC`;
    document.querySelector('.mainapp').style.visibility = "visible";
}


var interval;
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let button = document.querySelector('.btn');
button.addEventListener('click', () => {
    const citySearched = inputcity.value.trim();
    if (citySearched.length == 0) return;
    console.log(citySearched);
    requestCity(citySearched)
        .then((data) => {
            console.log(data);
            document.querySelector('.searchbox').placeholder = "Enter the Location";
            updateWeatherApp(data);
        })
        .catch((error) => {
            document.querySelector('.mainapp').style.visibility = "hidden";
            inputcity.value = "";
            document.querySelector('.searchbox').placeholder = "Location Not Found";
        })
});
