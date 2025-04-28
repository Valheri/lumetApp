import React, { useContext } from "react";
import { ScrollView, Text } from "react-native";
import AlarmCard from "../components/AlarmCard";
import { Alarm } from "../utils/types";
import { WeatherContext } from "./_layout";

export default function Alarms() {
    const { dailyWeather } = useContext(WeatherContext);

    const alarms: Alarm[] = [];

    if (dailyWeather) {
        dailyWeather.list.forEach((day) => {
            if ((day.rain || 0) > 10) {
                alarms.push({
                    title: "Snow Work",
                    description: `Snowfall exceeded 10mm.`,
                    date: new Date(day.dt * 1000).toLocaleDateString(),
                });
            }

            const temps = [day.temp.morn, day.temp.day, day.temp.eve, day.temp.night];
            let wasAboveZero = false;
            for (const temp of temps) {
                if (temp > 0) wasAboveZero = true;
                if (wasAboveZero && temp <= 0) {
                    alarms.push({
                        title: "Sand the Streets",
                        description: `Temperature fluctuated above and below 0°C.`,
                        date: new Date(day.dt * 1000).toLocaleDateString(),
                    });
                    break;
                }
            }

            if (day.speed > 15) {
                alarms.push({
                    title: "High Winds",
                    description: `Wind speed exceeded 15 m/s.`,
                    date: new Date(day.dt * 1000).toLocaleDateString(),
                });
            }
        });
    }

    return (
        <ScrollView style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Alarms</Text>
            {alarms.length > 0 ? (
                alarms.map((alarm, index) => (
                    <AlarmCard
                        key={index}
                        title={`${alarm.title} (${alarm.date})`}
                        description={alarm.description}
                    />
                ))
            ) : (
                <Text>No alarms or warnings for the forecasted days.</Text>
            )}
        </ScrollView>
    );
}
