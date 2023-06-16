import { TouchableOpacity, TouchableOpacityProps, View, StyleSheet } from "react-native";
import { Check } from "phosphor-react-native";

interface Props extends TouchableOpacityProps {
    checked: boolean;
}

export function CheckBox({ checked = false, ...rest }: Props) {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            style={styles.checkContainer}
            {...rest}
        >
            {
                checked ? (
                    <View style={styles.boxChecked}>
                        <Check size={25} color="#fff" />
                    </View>
                ) : (
                    <View style={styles.boxUnChecked} />
                )
            }
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    checkContainer: {
        display: 'flex',
        marginLeft: 8,
        alignItems: 'center'
    },
    boxChecked: {
        width: 25,
        height: 25,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00B37E'
    },
    boxUnChecked: {
        width: 25,
        height: 25,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#a1a1a1'
    }
});