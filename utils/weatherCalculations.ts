export interface WeatherData {
    // Define your weather API data structure here
    // For example: temperature, snowfall, timestamp, etc.
    temperature?: number;
    snowfall?: number;
}

export function shouldWarnSnow(weatherData: WeatherData): boolean {
    // Placeholder logic: warn if snowfall >= 5mm in the last 24h
    if (weatherData.snowfall && weatherData.snowfall >= 5) {
        return true;
    }
    return false;
}

export function shouldWarnSand(prevTemp: number, currentTemp: number): boolean {
    // Placeholder logic: warn if temperature goes above 0 and then drops to <= 0
    if (prevTemp > 0 && currentTemp <= 0) {
        return true;
    }
    return false;
}
