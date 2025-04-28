import { Text, View } from "react-native";
// import AlarmCard from "../components/AlarmCard"; // suggested reusable component

export default function Alarms() {
    // Placeholder for weather alarm calculations
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Alarms</Text>
            {/* Render calculated alarms here (e.g., using AlarmCard component) */}
            <Text>Alarms and warnings will be displayed here.</Text>
        </View>
    );
}
