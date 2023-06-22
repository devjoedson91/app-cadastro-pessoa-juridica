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
import { CaretDown, MagnifyingGlass } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { normalizeCnpjNumber } from "../utils/inputMasks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormData } from "../components/LegalPersonForm";
import { FormList } from "../components/FormList";
import { ListCompanies } from "../components/ListCompanies";
import { ModalPicker } from "../components/ModalPicker";

export function Search() {

    const [searchInputValue, setSearchInputValue] = useState('');

    const [ dataCompany, setDataCompany ] = useState<FormData>();

    const [dataCompanies, setDataCompanies] = useState<FormData[]>([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [ openSearchTypeModal, setOpenSearchTypeModal ] = useState(false);
    const [searchType, setSearchType] = useState('CNPJ');

    const possiblesSearchTypes = ['CNPJ', 'Nome Fantasia'];

    function typingInputValue(value: string) {

        if (searchType === 'CNPJ') {

            setSearchInputValue(normalizeCnpjNumber(value));

        } else {

            setSearchInputValue(value);
        }

    }

    useEffect(() => {

        listCompanies();

    }, []);

    async function listCompanies() {

        const response = await AsyncStorage.getItem('@app-test')

        if (response) setDataCompanies(JSON.parse(response));

    }

    async function handleSearchCompany() {

        if (searchType === 'CNPJ') {

            if (searchInputValue === '') {

                listCompanies();
                return;
    
            }
    
            try {
    
                let temporayData = [];
    
                let cnpjExists = dataCompanies.find(data => data.cnpj === searchInputValue);
    
                if (cnpjExists) {
    
                    temporayData.push(cnpjExists);
    
                    setDataCompanies(temporayData);
                } else {
    
                    ToastAndroid.show('Não encontramos esse CNPJ na base de dados!', ToastAndroid.SHORT);
                }
    
            } catch(err) {
                console.log('erro ao pesquisar empresa: ', err);
                ToastAndroid.show('Erro ao pesquisar empresa', ToastAndroid.SHORT);
    
            }

        }

    }

    function openModal(item: FormData) {

        setDataCompany(item);
        setModalVisible(true);

    }

    function handleSearchType(value: string) {
        setSearchType(value);
    }

    return (
        <SafeAreaView style={styles.container}>
             <Animatable.View animation="fadeInDown" style={styles.containerHeader}>
                <View style={styles.headerForm}>
                    <View style={styles.containerSearchBy}>
                        <Text style={styles.titleHeaderForm}>Pesquisar por: </Text>
                        <Pressable 
                            style={styles.btnSearchBy}
                            onPress={() => setOpenSearchTypeModal(true)}
                        >
                            <Text style={styles.textBtnSearch}>{searchType}</Text>
                            <CaretDown size={20} color="#fff" />
                        </Pressable>
                    </View>
                    <TextInput 
                        style={styles.searchInput}
                        keyboardType={searchType === 'CNPJ' ? 'numeric' : 'default'}
                        placeholder={searchType}
                        placeholderTextColor="#a1a1a1"
                        value={searchInputValue}
                        onChangeText={(value) => typingInputValue(value)}
                        maxLength={18}
                    />
                </View>
                <Pressable onPress={handleSearchCompany}>
                    <MagnifyingGlass size={32} color="#fff" />
                </Pressable>
            </Animatable.View>
            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <ListCompanies 
                    list={dataCompanies} 
                    handleOpenModal={openModal}
                    refreshData={listCompanies}             
                />
            </Animatable.View>

            <Modal transparent={true} visible={modalVisible} animationType="slide">
                <FormList 
                    handleCloseModal={() => setModalVisible(false)}
                    data={dataCompany}
                />
            </Modal>

            <Modal transparent={true} visible={openSearchTypeModal} animationType="fade">
                <ModalPicker 
                    handleCloseModal={() => setOpenSearchTypeModal(false)}
                    options={possiblesSearchTypes}
                    selectedItem={handleSearchType}
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
        paddingHorizontal: '8%',
        paddingTop: '8%'
    },
    containerHeader: {
        backgroundColor: '#6f2df3',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: '10%',
        paddingVertical: 12
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
    containerSearchBy: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    btnSearchBy: {
        height: 35,
        borderWidth: 1,
        borderColor: '#5e27cc',
        borderRadius: 6,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleHeaderForm: {
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
        color: '#fff',
        marginRight: 8
    },
    textBtnSearch: {
        fontFamily: 'Montserrat_500Medium',
        marginRight: 8,
        color: '#fff'
    },
    textContainer: {
        color: '#202024',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 40
    },
    headerForm: {
        width: '100%'
    }
});