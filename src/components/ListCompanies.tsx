import { View, Text, FlatList, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { Trash } from "phosphor-react-native";
import { FormData } from "./LegalPersonForm";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ListProps {
    list: FormData[];
    handleOpenModal: (data: FormData) => void;
    refreshData: () => void;
}

export function ListCompanies({ list, handleOpenModal, refreshData }: ListProps) {

    async function handlePutAsDeleted(cnpj: string) {

        let listCompanies: FormData[] = [];

        const response = await AsyncStorage.getItem('@app-test');

        if (response) {

            listCompanies = JSON.parse(response);

            const companyExists = listCompanies.find(company => company.cnpj === cnpj);

            const dataFiltered = listCompanies.filter(company => company.cnpj !== companyExists?.cnpj);

            await AsyncStorage.setItem('@app-test', JSON.stringify(dataFiltered));

            refreshData();

        }

    }

    function sendDataToOpenModal(company: FormData) {

        handleOpenModal(company);

    }

    return (
        <FlatList 
            data={list}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {

                return (
                    <TouchableOpacity
                        style={styles.itemCompany}
                        activeOpacity={.8}
                        onPress={() => sendDataToOpenModal(item)}
                    >
                        <View>
                            <View>
                                <Text style={styles.title}>CNPJ</Text>
                                <Text style={styles.inputText}>{item.cnpj}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Nome Fantasia</Text>
                                <Text style={styles.inputText}>{item.fantasyName}</Text>
                            </View>
                        </View>
                        <Pressable onPress={() => handlePutAsDeleted(item.cnpj)}>
                            <Trash size={35} color="#DC1637" />
                        </Pressable>
                    </TouchableOpacity>
                );

            }}
        />
    );

}

const styles = StyleSheet.create({
    itemCompany: {
        width: '100%',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#ece9e9'
    },
    title: {
        fontFamily: 'Montserrat_500Medium',
        color: '#a1a1a1',       
    },
    inputText: {
        minWidth: '30%',
        height: 40,
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium'
    }, 
});