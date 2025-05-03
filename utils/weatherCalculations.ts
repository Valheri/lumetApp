import { Alarm, DailyWeather } from "./types";

// Thresholds for alarms
const SNOW_THRESHOLD = 10; // Snowfall in mm
const HUMIDITY_THRESHOLD = 65; // Humidity percentage
const WIND_SPEED_THRESHOLD = 15; // Wind speed in m/s

export function generateAlarms(dailyWeather: DailyWeather): Alarm[] {
    const alarms: Alarm[] = [];

    dailyWeather.list.forEach((day) => {
        // Snow warning
        if ((day.snow || 0) > SNOW_THRESHOLD) {
            alarms.push({
                title: "Snow Work",
                description: `Snowfall exceeded ${SNOW_THRESHOLD}mm.`,
                date: new Date(day.dt * 1000).toLocaleDateString(),
            });
        }

        // Sand warning
        const temps = [day.temp.morn, day.temp.day, day.temp.eve, day.temp.night];
        let wasAboveZero = false;
        let isWet = day.humidity > HUMIDITY_THRESHOLD || (day.rain || 0) > 0; // Wet conditions
        for (const temp of temps) {
            if (temp > 0) wasAboveZero = true;
            if (wasAboveZero && temp <= 0 && isWet) {
                alarms.push({
                    title: "Sand the Streets",
                    description: `Temperature fluctuated above and below 0°C.`,
                    date: new Date(day.dt * 1000).toLocaleDateString(),
                });
                break;
            }
        }

        // Wind warning
        if (day.speed > WIND_SPEED_THRESHOLD) {
            alarms.push({
                title: "High Winds",
                description: `Wind speed exceeded ${WIND_SPEED_THRESHOLD} m/s.`,
                date: new Date(day.dt * 1000).toLocaleDateString(),
            });
        }
    });

    return alarms;
}