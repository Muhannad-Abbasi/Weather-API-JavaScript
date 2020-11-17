const apiKey = 'a58f83c4989c4227461d5a79c362a60b';

let weatherForm = document.querySelector('#weather-form');

weatherForm.addEventListener('submit',
    function(event){
        event.preventDefault();

        let stadensNamnInput = document.querySelector('#stadensNamn');
        let stadensNamn = stadensNamnInput.value;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${stadensNamn}&units=metric&appid=${apiKey}`;

        fetch(url).then(
            function(response){
                return response.json();
            }
        ).then(
            function(data){
                // console.log(data);
                let pWeatherDescription = document.querySelector('#pWeatherDescription');

                pWeatherDescription.innerHTML = `Description: ${data.weather[0].description}`;

                let pTemp = document.querySelector('#pTemp');
                pTemp.innerHTML = `Temperature är: ${data.main.temp} °C.`;

                let pWind = document.querySelector('#pWind');
                pWind.innerHTML = `Wind speed is: ${data.wind.speed} Km/h`;

                let pHumidity = document.querySelector('#pHumidity')
                pHumidity.innerHTML = `Humidity is: ${data.main.humidity}`;

                let img = document.querySelector('#hi')
                let wIcon = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/w/${wIcon}.png`;
                console.log(iconUrl)
                img.src = iconUrl;



                function tempChange(){
                    

                    if(data.main.temp <= 11){
                        let tempCh = document.querySelector('#tempCh')
                        tempCh.innerHTML = 'its a cold day'
                        tempCh.style.color = 'white';
                        tempCh.style.backgroundColor = 'blue';
                        // console.log('its a cold day')
                    }else if(data.main.temp >= 20){
                        let tempCh = document.querySelector('#tempCh')
                        tempCh.innerHTML = 'its a hot day'
                        tempCh.style.color = 'white';
                        tempCh.style.backgroundColor = 'red';
                    }
                }
                tempChange()
            }
        ).catch(
            function (error){
                let body = document.querySelector('form');
                body.insertAdjacentHTML('afterend', `<p>Oops something went wrong! ${error}</p>`)
                console.log(error)
            }
        )
    }
);












// let cityName = 'Helsingborg';

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

// fetch(url).then(
//     function(response){
//         return response.json();
//     }
// ).then(
//     function(data){
//         console.log(data.wind.speed)
//     }
// )