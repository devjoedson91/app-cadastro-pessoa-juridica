import { View, ActivityIndicator, StyleSheet } from "react-native";

export function Loading() {

    return (
        <View style={styles.container}>
            <ActivityIndicator size={50} color="#00B373" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121214'
    }
});