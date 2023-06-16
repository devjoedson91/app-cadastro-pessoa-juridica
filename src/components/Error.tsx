import { Text, StyleSheet } from "react-native";

type Props = {
    text: string | undefined;
}

export function Error({ text }: Props) {

    return (
        <Text style={styles.text}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: 4,
        fontFamily: 'Montserrat_500Medium',
        color: '#DC1637'
    }
});