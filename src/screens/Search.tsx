import { 
    StyleSheet, 
    View, 
    TextInput, 
    Pressable,
    ToastAndroid,
    SafeAreaView, 
    Modal,
    Text
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MagnifyingGlass } from "phosphor-react-native";
import { useState } from "react";
import { normalizeCnpjNumber } from "../utils/inputMasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormData } from "../components/LegalPersonForm";
import { FormList } from "../components/FormList";

export function Search() {

    const [cnpj, setCnpj] = useState('');

    const [ dataCompany, setDataCompany ] = useState<FormData>();

    const [modalVisible, setModalVisible] = useState(false);

    function handleTypingCnpj(value: string) {

        setCnpj(normalizeCnpjNumber(value));
    }

    async function handleSearchCompany() {

        if (cnpj === '' || cnpj.length < 18) {

            ToastAndroid.show('Digite um CNPJ válido!', ToastAndroid.SHORT);
            return;
        };

        try {

            const response = await AsyncStorage.getItem('@app-test');

            if (response) {

                let list: FormData[] = JSON.parse(response);

                let cnpjExists = list.find(data => data.cnpj === cnpj);

                if (cnpjExists) {

                    setDataCompany(cnpjExists);

                    setModalVisible(true);
                } else {

                    ToastAndroid.show('Não encontramos esse CNPJ na base de dados!', ToastAndroid.SHORT);
                }

            };

        } catch(err) {
            console.log('erro ao pesquisar empresa: ', err);
            ToastAndroid.show('Erro ao pesquisar empresa', ToastAndroid.SHORT);

        }

    }

    return (
        <SafeAreaView style={styles.container}>
             <Animatable.View animation="fadeInDown" style={styles.containerHeader}>
                <TextInput 
                    style={styles.searchInput}
                    keyboardType="numeric"
                    placeholder="CNPJ"
                    placeholderTextColor="#a1a1a1"
                    value={cnpj}
                    onChangeText={(value) => handleTypingCnpj(value)}
                    maxLength={18}
                />
                <Pressable onPress={handleSearchCompany}>
                    <MagnifyingGlass size={32} color="#fff" />
                </Pressable>
            </Animatable.View>
            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <Text style={styles.textContainer}>Informe seu CNPJ para emitir a Situação Cadastral de Pessoa Jurídica</Text>
                <View style={styles.containerLogo}>
                    <Animatable.Image 
                        animation="flipInY"
                        source={require('../assets/planner.png')} 
                        style={{width: '70%'}} 
                        resizeMode="contain"
                    />
                </View>
            </Animatable.View>

            <Modal transparent={true} visible={modalVisible} animationType="slide">
                <FormList 
                    handleCloseModal={() => setModalVisible(false)}
                    data={dataCompany}
                />
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#6f2df3',
        flex: 1,
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'relative',
        paddingHorizontal: '10%',
    },
    containerHeader: {
        backgroundColor: '#6f2df3',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '10%',
        marginTop: '10%',
        marginBottom: '8%'
    }, 
    containerLogo: {
        flex: 2,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchInput: {
        backgroundColor: '#5e27cc',
        width: '80%',
        height: 40,
        borderRadius: 6,
        paddingHorizontal: 10,
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
        color: '#fff'
    },
    textContainer: {
        color: '#202024',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
    },
});