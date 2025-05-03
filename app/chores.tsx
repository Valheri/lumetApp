import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const choresByMonth: Record<string, string[]> = {
    January: ["Snow removal and salting walkways", "Inspect heating systems", "Check for drafts or leaks", "Organize storage areas"],
    February: ["Continue snow and ice management", "Inspect roofs for ice dams", "Deep clean carpets", "Refill de-icing supplies"],
    March: ["Spring cleaning: dusting, window washing", "Inspect outdoor areas for winter damage", "Prepare outdoor equipment", "Clean gutters"],
    April: ["Outdoor cleanup: remove debris", "Pressure wash sidewalks", "Inspect outdoor lighting", "Begin landscaping tasks"],
    May: ["Maintain landscaping", "Inspect and clean air conditioning units", "Wash windows", "Check for pest infestations"],
    June: ["Deep clean high-traffic areas", "Inspect outdoor furniture", "Maintain irrigation systems", "Organize summer supplies"],
    July: ["Continue landscaping", "Inspect ventilation systems", "Perform mid-year inventory", "Deep clean restrooms and kitchens"],
    August: ["Prepare for back-to-school cleaning", "Inspect playgrounds", "Check fire extinguishers", "Polish floors"],
    September: ["Fall cleanup: rake leaves", "Inspect and clean gutters", "Prepare heating systems", "Deep clean carpets"],
    October: ["Continue fall cleanup", "Inspect roofs", "Test smoke detectors", "Stock up on winter supplies"],
    November: ["Winterize outdoor equipment", "Thorough indoor cleaning", "Inspect entryways", "Repair weather stripping"],
    December: ["Decorate for holidays", "Monitor heating systems", "Perform end-of-year inventory", "Deep clean kitchens"],
};

export default function Chores() {
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
    const chores = choresByMonth[currentMonth];

    if (!chores) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No chores found for {currentMonth}</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Chores for {currentMonth}</Text>
            {chores.map((chore, index) => (
                <View key={index} style={styles.choreContainer}>
                    <Text style={styles.choreText}>• {chore}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f4f8",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#007BFF",
        textAlign: "center",
    },
    choreContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    choreText: {
        fontSize: 16,
        color: "#333",
    },
});