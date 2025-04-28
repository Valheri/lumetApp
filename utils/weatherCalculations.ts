import { DailyWeather } from "./types";

export interface WeatherData {
    temperature?: number;
    snowfall?: number;
    windSpeed?: number;
    timestamp?: string;
}




export function shouldWarnSnowDaily(dailyWeather: DailyWeather): boolean {
    // Check if any day's snowfall exceeds 10mm
    return dailyWeather.list.some((day) => (day.rain || 0) > 10);
}

export function shouldWarnSandDaily(dailyWeather: DailyWeather): boolean {
    // Check if temperature fluctuates above and below 0°C in any day
    return dailyWeather.list.some((day) => {
        const temps = [day.temp.morn, day.temp.day, day.temp.eve, day.temp.night];
        let wasAboveZero = false;
        for (const temp of temps) {
            if (temp > 0) wasAboveZero = true;
            if (wasAboveZero && temp <= 0) return true;
        }
        return false;
    });
}

export function shouldWarnWindDaily(dailyWeather: DailyWeather): boolean {
    // Check if wind speed exceeds 15 m/s in any day
    return dailyWeather.list.some((day) => day.speed > 15);
}
