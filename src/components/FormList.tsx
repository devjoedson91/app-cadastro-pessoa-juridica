import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Text, Pressable, Dimensions } from "react-native";
import { FormData } from "./LegalPersonForm";
import { X, Paperclip } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface FormListProps {
    data: FormData | undefined;
    handleCloseModal: () => void;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export function FormList({ data, handleCloseModal }: FormListProps) {

    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Pressable onPress={handleCloseModal} style={styles.closeBtn}>
                    <X size={35} />
                </Pressable>
                <View style={styles.formGroup}>
                    <Text style={styles.title}>Inscrição Estadual</Text>
                    <Text style={styles.inputText}>{data?.registration}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.title}>CNPJ</Text>
                    <Text style={styles.inputText}>{data?.cnpj}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.title}>Razão Social</Text>
                    <Text style={styles.inputText}>{data?.businessName}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.title}>Nome Fantasia</Text>
                    <Text style={styles.inputText}>{data?.fantasyName}</Text>
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.title}>Natureza Jurídica</Text>
                    <Text style={styles.inputText}>{data?.legalNature}</Text>
                </View>
                <View style={styles.formGroupRow}>
                            <View>
                                <Text style={styles.title}>Abertura</Text>
                                <Text style={styles.inputText}>{data?.openDate}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Porte</Text>
                                <Text style={styles.inputText}>{data?.category}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>Capital Social</Text>
                                <Text style={styles.inputText}>{data?.capital}</Text>
                            </View>
                        </View>
                        <View style={styles.formGroupRow}>
                            <View style={{position: 'relative'}}>
                                <Text style={styles.title}>Situação Cadastral</Text>
                                <Text style={styles.inputText}>{data?.situation}</Text>
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.title}>Email</Text>
                            <Text style={styles.inputText}>{data?.email}</Text>
                        </View>
                        <View style={styles.formGroupRow}>
                            <View style={{width: '50%'}}>
                                <Text style={styles.title}>Telefone</Text>
                                <Text style={styles.inputText}>{data?.phone}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>CEP</Text>
                                <Text style={styles.inputText}>{data?.cep}</Text>
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.title}>Endereço</Text>
                            <Text style={styles.inputText}>{data?.address}</Text>
                        </View>
                        <View style={styles.formGroupRow}>
                            <View style={{width: '50%'}}>
                                <Text style={styles.title}>Cidade</Text>
                                <Text style={styles.inputText}>{data?.city}</Text>
                            </View>
                            <View style={{position: 'relative'}}>
                                <Text style={styles.title}>Estado UF</Text>
                                <Text style={styles.inputText}>{data?.state}</Text>
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.title}>Representante Legal</Text>
                            <Text style={styles.inputText}>{data?.agent}</Text>
                        </View>
                        <View style={styles.formGroupRow}>
                            <View>
                                <Text style={styles.title}>Cargo</Text>
                                <Text style={styles.inputText}>{data?.position}</Text>
                            </View>
                            <View>
                                <Text style={styles.title}>CPF</Text>
                                <Text style={styles.inputText}>{data?.cpf}</Text>
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Pressable 
                                style={styles.btnUpload}
                                onPress={() => {
                                    handleCloseModal();
                                    navigation.navigate('FilesUpload');
                                }}
                            >
                                <Text style={styles.textBtnUpload}>Anexar documentos</Text>
                                <Paperclip size={25} color="#fff" />
                            </Pressable>
                        </View>
                    </ScrollView>  
            </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: {
        borderWidth: .5,
        borderColor: '#C4C4CC',
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        backgroundColor: '#fff',
        top: 104
    },
    content: {
        paddingHorizontal: '8%',
        marginBottom: 30,
        width: WIDTH - 40,
        height: HEIGHT / 1.4,
        position: 'relative'
    },
    title: {
        fontFamily: 'Montserrat_500Medium',
        color: '#a1a1a1',       
    },
    formGroup: {
        marginTop: 20,
        position: 'relative'
    },
    formGroupRow: {
        marginTop: 20,
        marginBottom: 12,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    inputText: {
        minWidth: '30%',
        height: 40,
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium'
    }, 
    closeBtn: {
        position: 'absolute',
        right: 0,
        top: 20,
        zIndex: 1
    },
    btnUpload: {
        minWidth: '30%',
        height: 40,
        backgroundColor: '#00B37E',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textBtnUpload: {
        fontFamily: 'Montserrat_500Medium',
        color: '#fff',
        marginRight: 6
    }
});