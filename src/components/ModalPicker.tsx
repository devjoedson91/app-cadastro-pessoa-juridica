import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";

interface ModalPickerProps {
    options: string[];
    handleCloseModal: () => void;
    selectedItem: (item: string) => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps) {

    function onPressItem(item: string) {

        selectedItem(item);
        handleCloseModal();
    }

    const option = options.map((categoryItem: any, index: any) => {
        return (
            <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(categoryItem)}>
                <Text style={styles.item}>{categoryItem}</Text>
            </TouchableOpacity>
        );
    });

    return (
        <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        width: WIDTH - 40,
        height: 150,
        backgroundColor: '#E5E5E5',
        borderRadius: 4
    },
    option: {
        alignItems: 'flex-start',
    },

    item: {
        margin: 18,
        fontSize: 14,
        color: '#202024',
        textTransform: 'uppercase',
        fontFamily: 'Montserrat_600SemiBold'
    },
});