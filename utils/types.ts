export interface Alarm {
    title: string; // The title of the alarm (e.g., "Snow Work")
    description: string; // A detailed description of the alarm
    date: string; // The date the alarm is associated with (formatted as a string)
}

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

// Typing for daily weather data
export interface DailyWeather {
    city: {
        id: number;
        name: string;
        coord: { lon: number; lat: number };
        country: string;
        population: number;
        timezone: number;
    };
    list: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: {
            day: number;
            min: number;
            max: number;
            night: number;
            eve: number;
            morn: number;
        };
        feels_like: {
            day: number;
            night: number;
            eve: number;
            morn: number;
        };
        pressure: number;
        humidity: number;
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
        speed: number;
        deg: number;
        gust: number;
        clouds: number;
        pop: number;
        rain?: number;
    }[];
}