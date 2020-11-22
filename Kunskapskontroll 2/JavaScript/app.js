// Skapa variabel och välj containerB för att sätta en huvudbakgrundsbild till webbplatsen
let containerB = document.querySelector('#container-b');
containerB.style.backgroundImage = 'url(Img/main-background.jpg)';
containerB.style.backgroundSize = 'cover';
containerB.style.backgroundRepeat = 'no-repeat';
containerB.style.height = '89vh'

// Skapa variabel till min apiKey
const apiKey = 'a58f83c4989c4227461d5a79c362a60b';

// Skapa variabel och välj form id
let weatherForm = document.querySelector('#weather-form');

// Lägg till event listener till Submit-knappen, så när användaren klickar på knappen händer något
weatherForm.addEventListener('submit',
    function(event){
        event.preventDefault();

        // Skapa en variabel och välj Input type ID och välj sedan värdet på den
        let stadensNamnInput = document.querySelector('#stadensNamn');
        let stadensNamn = stadensNamnInput.value;

        // Skapa en variabel url och sätt in väderlänken inuti den, och inuti väderlänken lägger vi våra två variabler (stadensNamn och apiKey) plus vi lägger ( &units=metric ) till länken. så när användaren anger ett stadsnamn, kommer vädret i denna stad att visas i celsius
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${stadensNamn}&units=metric&appid=${apiKey}`;

        // Använder vi Fetch for att fetcha url länken och sedan hämta de data som vi vill att visa till användaren
        fetch(url).then(
            function(response){
                return response.json();
            }
        ).then(
            function(data){

                let pWeatherDescription = document.querySelector('#pWeatherDescription');

                pWeatherDescription.innerHTML = `Description: ${data.weather[0].description}`;

                let pTemp = document.querySelector('#pTemp');
                pTemp.innerHTML = `Temperature Is: ${data.main.temp} °C.`;

                let pWind = document.querySelector('#pWind');
                pWind.innerHTML = `Wind Speed Is: ${data.wind.speed} Km/h`;

                let pHumidity = document.querySelector('#pHumidity')
                pHumidity.innerHTML = `Humidity Is: ${data.main.humidity}%`;

                let img = document.querySelector('#wIcon')
                let wIcon = data.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/w/${wIcon}.png`;
                console.log(iconUrl)
                img.src = iconUrl;

                // Skapa en funktion som vi använder inuti det if-else statement för att sätta en kort fras och bakgrundsbild som kommer att förändras beror på temperaturdata vi får från API
                function tempChange(){
                    if(data.main.temp <= -1){
                        let containerB = document.querySelector('#container-b');
                        containerB.style.backgroundImage = 'url(Img/snow.jpg)';
                        containerB.style.backgroundPosition = 'center center';
                        containerB.style.backgroundSize = 'cover';

                        let tempCh = document.querySelector('#tempCh')
                        tempCh.innerHTML = `It's a very cold day`;
                        
                        let uI = document.querySelector('.user-interface');
                        uI.style.border = '3px solid blue';

                        let uX = document.querySelector('.user-experience');
                        uX.style.border = '3px solid blue';

                    }else if(data.main.temp == 0 || data.main.temp <= 17){
                        let containerB = document.querySelector('#container-b');
                        containerB.style.backgroundImage = 'url(Img/rain.jpg)';
                        containerB.style.backgroundPosition = 'center center';
                        containerB.style.backgroundSize = 'cover';

                        let tempCh = document.querySelector('#tempCh')
                        tempCh.innerHTML = `It's a cold day`;
                        
                        let uI = document.querySelector('.user-interface');
                        uI.style.border = '3px solid #02b3e4';

                        let uX = document.querySelector('.user-experience');
                        uX.style.border = '3px solid #02b3e4';
                        
                    }else if(data.main.temp >= 18 && data.main.temp <= 27){
                        let containerB = document.querySelector('#container-b');
                        containerB.style.backgroundImage = 'url(Img/summer.jpg)';
                        containerB.style.backgroundPosition = 'center center';
                        containerB.style.backgroundSize = 'cover';

                        let tempCh = document.querySelector('#tempCh')
                        tempCh.innerHTML = `It's a beautiful day`;
                        
                        let uI = document.querySelector('.user-interface');
                        uI.style.border = '3px solid green';

                        let uX = document.querySelector('.user-experience');
                        uX.style.border = '3px solid green';

                    }else if(data.main.temp >= 28){
                        let containerB = document.querySelector('#container-b');
                        containerB.style.backgroundImage = 'url(Img/hot-summer.jpg)';
                        containerB.style.backgroundPosition = 'center center';
                        containerB.style.backgroundSize = 'cover';
                        containerB.style.backgroundRepeat = 'no-repeat';

                        let tempCh = document.querySelector('#tempCh')
                        tempCh.innerHTML = `It's a very hot day`;

                        let uI = document.querySelector('.user-interface');
                        uI.style.border = '3px solid red';

                        let uX = document.querySelector('.user-experience');
                        uX.style.border = '3px solid red';
                    }
                }
                tempChange()

                // Skapa en design function
                function design(){
                    let uX = document.querySelector('.user-experience');
                    uX.style.width = '295px';
                    uX.style.height = '17rem';
                    uX.style.backgroundColor = ' rgb(199, 235, 255)';
                    uX.style.borderRadius = '5px';
                    uX.style.boxShadow = '2px 0px 8px rgb(204, 204, 204)';
                    uX.style.padding = '25px 5px';
                }
                design()
            }

            // Använda catch metoden för att visa ett felmeddelande till användaren om de inte angav något i textformuläret eller om de anger fel stadsnamn
        ).catch(
            function (error){
                let containerB = document.querySelector('form');
                containerB.insertAdjacentHTML('afterend', `<p>Oops something went wrong! ${error}</p>`)
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