let loc = document.getElementById("location");
let temp_icon = document.getElementById("temp-icon");
let temp_value = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let icon_file;

const search_input = document.getElementById("search-input");
const search_button = document.getElementById("search-button");

search_button.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(search_input.value);
    search_input.value = '';
});
const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=031cf11d81fe65b8d272952229758697`, { mode: 'cors' });
        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        temp_value.textContent = Math.round(feels_like - 273);

        if (id < 300 && id > 200) {
            temp_icon.src = "./icons/thunderstorms.png";
        } else if (id < 400 && id > 300) {
            temp_icon.src = "./icons/drizzle.png";
        } else if (id < 600 && id > 500) {
            temp_icon.src = "./icons/rain.png";
        } else if (id < 700 && id > 600) {
            temp_icon.src = "./icons/snowy.png";
        } else if (id < 800 && id > 700) {
            temp_icon.src = "./icons/mistORfog.png";
        } else if (id == 800) {
            temp_icon.src = "./icons/clear.png";
        }else if (id > 804) {
            temp_icon.src = "./icons/clouds.png";
        }
    }
    catch (error) {
        alert('city not found');
    }
}

window.addEventListener("load", function () {
    let long;
    let latt;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            latt = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&appid=031cf11d81fe65b8d272952229758697`;
            fetch(api).then((response) => {
                return response.json();
            })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    temp_value.textContent = Math.round(feels_like - 273);

                    if (id < 300 && id > 200) {
                        temp_icon.src = "./icons/thunderstorms.png";
                    } else if (id < 400 && id > 300) {
                        temp_icon.src = "./icons/drizzle.png";
                    } else if (id < 600 && id > 500) {
                        temp_icon.src = "./icons/rain.png";
                    } else if (id < 700 && id > 600) {
                        temp_icon.src = "./icons/snowy.png";
                    } else if (id < 800 && id > 700) {
                        temp_icon.src = "./icons/mistORfog.png";
                    } else if (id == 800) {
                        temp_icon.src = "./icons/clear.png";
                    }else if (id > 804) {
                        temp_icon.src = "./icons/clouds.png";
                    }
                    
                });
        }
        );
    }
})



