import { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Modal} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ModalPicker } from "../components/ModalPicker";
import { CaretUp, CaretDown } from "phosphor-react-native";
import * as Animatable from "react-native-animatable";
import { Button } from "../components/Button";

export function Welcome() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    const [categorySelected, setCategorySelected] = useState('-- Selecione');

    const categories = ['Pessoa Física', 'Pessoa Jurídica'];

    const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image 
                    animation="flipInY"
                    source={require('../assets/planner.png')} 
                    style={{width: '80%'}} 
                    resizeMode="contain"
                />
            </View>

            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.textWelcome}>Bem vindo(a)!</Text>
                <Text style={styles.textForm}>Agora você pode ter o cadastro de empresa dos seus sonhos: A forma mais barata/rápida que você jamais imaginou!</Text>
                <Button title="Acessar" action={() => navigation.navigate('TabRoutes')} />
            </Animatable.View>
           
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6f2df3',
        flex: 1,
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#6f2df3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingHorizontal: '5%',
        gap: 28
    },
    textWelcome: {
        color: '#202024',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        textAlign: 'center',
        marginTop: 28
    },
    textForm: {
        color: '#202024',
        fontFamily: 'Montserrat_500Medium',
        fontSize: 16,
        textAlign: 'center',
    },
    categorySelectedText: {
        color: '#a1a1a1',
        fontFamily: 'Montserrat_500Medium',
        fontSize: 16,
    },
    inputCategory: {
        backgroundColor: '#E5E5E5',
        borderRadius: 4,
        width: '80%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingHorizontal: 15
    }
});