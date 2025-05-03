export interface Alarm {
    title: string; // The title of the alarm (e.g., "Snow Work")
    description: string; // A detailed description of the alarm
    date: string; // The date the alarm is associated with (formatted as a string)
}
//TODO: REWORK WEATHER TYPES
export interface HourlyWeather {
    list: {
        dt: number;
        dt_txt: string;
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
        };
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
        clouds: { all: number };
        wind: { speed: number; deg: number; gust: number };
        visibility: number;
        pop: number;
        rain?: { "1h": number };
    }[];
    city: {
        id: number;
        name: string;
        coord: { lat: number; lon: number };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}

// Typing for the OpenWeatherMap API Daily Forecast 16 Days
export interface DailyWeather {
    city: {
        id: number; // City ID
        name: string; // City name
        coord: {
            lat: number; // Latitude
            lon: number; // Longitude
        };
        country: string; // Country code (e.g., GB, JP)
        population: number; // Population (internal parameter)
        timezone: number; // Shift in seconds from UTC
    };
    cod: string; // Internal parameter
    message: number; // Internal parameter
    cnt: number; // Number of days returned in the API response
    list: {
        dt: number; // Time of data forecasted (UNIX timestamp)
        sunrise: number; // Sunrise time (UNIX timestamp)
        sunset: number; // Sunset time (UNIX timestamp)
        temp: {
            day: number; // Temperature at 12:00 local time
            min: number; // Min daily temperature
            max: number; // Max daily temperature
            night: number; // Temperature at 00:00 local time
            eve: number; // Temperature at 18:00 local time
            morn: number; // Temperature at 06:00 local time
        };
        feels_like: {
            day: number; // Feels-like temperature at 12:00 local time
            night: number; // Feels-like temperature at 00:00 local time
            eve: number; // Feels-like temperature at 18:00 local time
            morn: number; // Feels-like temperature at 06:00 local time
        };
        pressure: number; // Atmospheric pressure on the sea level, hPa
        humidity: number; // Humidity, %
        weather: {
            id: number; // Weather condition ID
            main: string; // Group of weather parameters (e.g., Rain, Snow, Clouds)
            description: string; // Weather condition description
            icon: string; // Weather icon ID
        }[];
        speed: number; // Maximum wind speed for the day
        deg: number; // Wind direction relevant to the maximum wind speed, degrees (meteorological)
        gust?: number; // Wind gust (optional)
        clouds: number; // Cloudiness, %
        rain?: number; // Precipitation volume, mm (optional)
        snow?: number; // Snow volume, mm (optional)
        pop: number; // Probability of precipitation (0 to 1, where 1 = 100%)
    }[];
}