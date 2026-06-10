async function majMeteo() {
    try {
        const response = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=43.5677&longitude=6.1797&daily=temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max&timezone=auto"
        );

        const data = await response.json();

        localStorage.setItem("meteo", JSON.stringify(data));
        localStorage.setItem("meteo_date", Date.now());

        afficherMeteo(data);

    } catch (erreur) {
        console.error(erreur);
        chargerMeteoLocale();
    }
}

function chargerMeteoLocale() {
    const donnees = localStorage.getItem("meteo");

    if (donnees) {
        afficherMeteo(JSON.parse(donnees));
    }
}

function traduireMeteo(code) {
    switch (code) {
        case 0: return `<i class="fa-solid fa-sun"></i>`;
        case 1:
        case 2:
        case 3: return `<i class="fa-solid fa-cloud"></i>`;
        case 45:
        case 48: return `<i class="fa-solid fa-smog"></i>`;
        case 51:
        case 53:
        case 55: return `<i class="fa-solid fa-droplet"></i>`;
        case 61:
        case 63:
        case 65: return `<i class="fa-solid fa-cloud-rain"></i>`;
        case 71:
        case 73:
        case 75: return `<i class="fa-solid fa-snowflake"></i>`;
        case 80:
        case 81:
        case 82: return `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
        case 95: return `<i class="fa-solid fa-cloud-bolt"></i>`;
        default: return "???";
    }
}

function afficherMeteo(data) {

    const tempMax = data.daily.temperature_2m_max[0];
    const tempMin = data.daily.temperature_2m_min[0];
    const meteo = traduireMeteo(data.daily.weather_code[0]);
    const vent = data.daily.wind_speed_10m_max[0];

    document.getElementById("meteo").innerHTML = `
        <p id="iconMeteo">${meteo}</p>
        <div id="t">
            <p>Max : ${tempMax}°C</p>
            <p>Min : ${tempMin}°C</p>
        </div>
        <p><i class="fa-solid fa-wind"></i> ${vent} km/h</p>
    `;
}

window.addEventListener("DOMContentLoaded", majMeteo);