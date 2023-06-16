import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProps {
    title: string;
    action?: () => void;
}

export function Button({ title, action }: ButtonProps) {

    return (
        <TouchableOpacity 
            style={styles.btnForm} 
            activeOpacity={0.8} 
            onPress={action}
        >
            <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    btnForm: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 6,
        paddingVertical: 12,
        backgroundColor: '#00B37E',
        width: '90%'
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold'
    }
});