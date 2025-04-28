import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/weather" style={{ marginTop: 20 }}>Weather Page</Link>
      <Link href="/alarms" style={{ marginTop: 10 }}>Alarms Page</Link>
    </View>
  );
}
