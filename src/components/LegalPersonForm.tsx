import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Modal, Pressable, ToastAndroid } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ControlledInput } from "./ControlledInput";
import * as yup from "yup";
import { 
    normalizeCnpjNumber, 
    normalizeCepNumber, 
    normalizePhoneNumber, 
    normalizeDate, 
    normalizeCapitalValue,
    normalizeCpfNumber
} from "../utils/inputMasks";
import { ModalPicker } from "./ModalPicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "./CheckBox";
import { UploadSimple } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type FormData = {
    cnpj: string;
    businessName: string;
    fantasyName: string;
    legalNature: string;
    openDate: string;
    category: string;
    capital: string;
    situation: string;
    registration: string;
    email: string;
    phone: string;
    cep: string;
    agent: string;
    position: string;
    cpf: string;
    address: string;
    city: string;
    state: string;
}

const schema = yup.object({
    cnpj: yup.string().matches(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, 'CNPJ Inválido').min(18, 'CNPJ deve ter 14 caracteres').required('Informe o cnpj'),
    businessName: yup.string().required('Informe a razão social'),
    fantasyName: yup.string().required('Informe o nome fantasia'),
    legalNature: yup.string().required('Informe a natureza jurídica'),
    openDate: yup.string().matches(/^(?:(?:31([-\/.]?)(?:0[13578]|1[02]))\1|(?:(?:29|30)([-\/.]?)(?:0[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29([-\/.]?)02\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))))$|^(?:0[1-9]|1\d|2[0-8])([-\/.]?)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/, 'Data Inválida').required('Informe a data de abertura'), // ver o tipo date
    category: yup.string().required('Informe o porte da empresa'),
    capital:  yup.string().required('Informe o capital social'),
    situation: yup.string().required('Informe a situação'),
    registration: yup.string().required('Informe a inscrição estadual'),
    email: yup.string().email('Email inválido').required('Informe o email'),
    phone: yup.string().required('Informe o telefone'),
    cep: yup.string().required('Informe o CEP'),
    agent: yup.string().required('Informe o representante legal'),
    position: yup.string().required('Informe o cargo'),
    cpf: yup.string().matches(/(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/, 'CPF Inválido').required('Informe o CPF do representante'),
    address: yup.string().required('Informe o endereço'),
    city: yup.string().required('Informe a cidade'),
    state: yup.string().required('Informe o estado UF'),
});

const possiblesCompanies = [
    'MEI', 'ME', 'EPP', 'EMP', 'GE'
];

const possibleslegalNature = [
    'Empresa Individual', 
    'Microempreendedor Individual (MEI)', 
    'Sociedade Empresária Limitada (Ltda)', 
    'Sociedade Limitada Unipessoal', 
    'Sociedade Simples (SS)',
    'Sociedade Anônima (S/A)',
    'Empresa de pequeno porte (EPP)',
    'Empresas de médio e grande porte'
];

const possiblesSituation = ['Ativo', 'Inativo'];

const possiblesStates = [
    'RO',
    'AC',
    'AM',
    'RR',
    'PA',
    'AP',
    'TO',
    'MA',
    'PI',
    'CE',
    'RN',
    'PB',
    'PE',
    'AL',
    'SE',
    'BA',
    'MG',
    'ES',
    'RJ',
    'SP',
    'PR',
    'SC',
    'RS',
    'MS',
    'MT',
    'GO',
    'DF'
];

export function LegalPersonForm() {

    const navigation = useNavigation<NativeStackNavigationProp<StackParams>>();

    const [modalCompaniesVisible, setModalCompaniesVisible] = useState(false);
    const [modalLegalNatureVisible, setModalLegalNatureVisible] = useState(false);
    const [modalSituationVisible, setModalSituationVisible] = useState(false);
    const [modalStateVisible, setModalStateVisible] = useState(false);
    const [freeRegistrationChecked, setFreeRegistrationChecked] = useState(true);
    const [buttonUplodFilesVisible, setButtonUplodFilesVisible] = useState(false);

    const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const cnpj = watch('cnpj');
    const cpf = watch('cpf');
    const phoneValue = watch("phone");
    const cepValue = watch("cep");
    const dateValue = watch("openDate");
    const capitalValue = watch('capital');

    useEffect(() => {

        setValue('cnpj', normalizeCnpjNumber(cnpj));

    }, [cnpj]);

    useEffect(() => {

        setValue('cpf', normalizeCpfNumber(cpf));

    }, [cpf]);

    useEffect(() => {

        setValue('phone', normalizePhoneNumber(phoneValue));

    }, [phoneValue]);

    useEffect(() => {
        setValue("cep", normalizeCepNumber(cepValue));
    },[cepValue]);

    useEffect(() => {
        setValue("openDate", normalizeDate(dateValue));
    },[dateValue]);

    useEffect(() => {
        setValue("capital", normalizeCapitalValue(capitalValue));
    },[capitalValue]);

    useEffect(() => {
        if (freeRegistrationChecked) {
            setValue('registration', 'ISENTO');
        } else {
            reset({registration: ''});
        }
    },[freeRegistrationChecked]);

    function handleChangeCompanies(company: string) {

        setValue('category', company);

    }

    function handleChangeLegalNature(value: string) {

        setValue('legalNature', value);

    }

    function handleChangeSituation(value: string) {

        setValue('situation', value);

    }

    function handleChangeState(value: string) {
        setValue('state', value);
    }

    async function handleSaveCompany(data: FormData) {

        try {

            let savedCompanies = [];

            const response = await AsyncStorage.getItem('@app-test');

            if (response) savedCompanies = JSON.parse(response);

            savedCompanies.push(data);

            await AsyncStorage.setItem('@app-test', JSON.stringify(savedCompanies));

            ToastAndroid.show('Empresa cadastrada com sucesso!', ToastAndroid.SHORT);

            setButtonUplodFilesVisible(true);

        } catch(err) {
            console.log('erro ao cadastrar empresa: ',err);
            ToastAndroid.show('Erro ao cadastrar empresa', ToastAndroid.SHORT);
        }

    }

    return (
        <>
            <View style={styles.formGroupRow}>
                <View>
                    <Text style={styles.title}>Inscrição Estadual</Text>
                    <ControlledInput 
                        name="registration" 
                        control={control} 
                        error={errors.registration} 
                        style={styles.input}
                        keyboardType="numeric"
                        editable={!freeRegistrationChecked}
                    />
                </View>
                <View style={{flexDirection: 'row', width: '50%', alignItems: 'center'}}>
                    <Text style={styles.title}>Isento?</Text>
                    <CheckBox 
                        checked={freeRegistrationChecked} 
                        onPress={() => setFreeRegistrationChecked(!freeRegistrationChecked)} 
                    />
                </View>    
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.title}>CNPJ</Text>
                <ControlledInput 
                    name="cnpj" 
                    control={control} 
                    error={errors.cnpj} 
                    style={styles.input} 
                    maxLength={18}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.title}>Razão Social</Text>
                <ControlledInput 
                    name="businessName" 
                    control={control} 
                    error={errors.businessName} 
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.title}>Nome Fantasia</Text>
                <ControlledInput 
                    name="fantasyName" 
                    control={control} 
                    error={errors.fantasyName} 
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.title}>Natureza Jurídica</Text>
                <ControlledInput 
                    name="legalNature" 
                    control={control} 
                    error={errors.legalNature} 
                    style={styles.input}
                />
                <Pressable 
                    style={{
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0,
                    }}
                    onPress={() => setModalLegalNatureVisible(true)}
                /> 
            </View>
            <View style={styles.formGroupRow}>
                <View style={{width: '33%'}}>
                    <Text style={styles.title}>Abertura</Text>
                    <ControlledInput 
                        name="openDate" 
                        control={control} 
                        error={errors.openDate} 
                        style={styles.input}
                        maxLength={10}
                        keyboardType="numeric"
                    />
                </View>
                <View style={{maxWidth: '33%', position: 'relative'}}>
                    <Text style={styles.title}>Porte</Text>
                    <ControlledInput 
                        name="category" 
                        control={control} 
                        error={errors.category} 
                        style={styles.input}
                    />
                     <Pressable 
                        style={{
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0,
                        }}
                        onPress={() => setModalCompaniesVisible(true)}
                    /> 
                </View>
                <View style={{width: '33%'}}>
                    <Text style={styles.title}>Capital Social</Text>
                    <ControlledInput 
                        name="capital" 
                        control={control} 
                        error={errors.capital} 
                        style={styles.input}
                        keyboardType="numeric"
                    />
                </View>
            </View>
            <View style={styles.formGroupRow}>
                <View style={{position: 'relative'}}>
                    <Text style={styles.title}>Situação Cadastral</Text>
                    <ControlledInput 
                        name="situation" 
                        control={control} 
                        error={errors.situation} 
                        style={styles.input}
                    />
                    <Pressable 
                        style={{
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0,
                        }}
                        onPress={() => setModalSituationVisible(true)}
                    /> 
                </View>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.title}>Email</Text>
                <ControlledInput 
                    name="email" 
                    control={control} 
                    error={errors.email} 
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroupRow}>
                <View style={{width: '50%'}}>
                    <Text style={styles.title}>Telefone</Text>
                    <ControlledInput 
                        name="phone" 
                        control={control} 
                        error={errors.phone} 
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={15}
                    />
                </View>
                <View>
                    <Text style={styles.title}>CEP</Text>
                    <ControlledInput 
                        name="cep" 
                        control={control} 
                        error={errors.cep} 
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={9}
                    />
                </View>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.title}>Endereço</Text>
                <ControlledInput 
                    name="address" 
                    control={control} 
                    error={errors.address}
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroupRow}>
                <View style={{width: '50%'}}>
                    <Text style={styles.title}>Cidade</Text>
                    <ControlledInput 
                        name="city" 
                        control={control} 
                        error={errors.city} 
                        style={styles.input}
                    />
                </View>
                <View style={{position: 'relative'}}>
                    <Text style={styles.title}>Estado UF</Text>
                    <ControlledInput 
                        name="state" 
                        control={control} 
                        error={errors.state} 
                        style={styles.input}
                        maxLength={2}
                    />
                    <Pressable 
                        style={{
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0,
                        }}
                        onPress={() => setModalStateVisible(true)}
                    /> 
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.title}>Representante Legal</Text>
                <ControlledInput 
                    name="agent" 
                    control={control} 
                    error={errors.agent} 
                    style={styles.input}
                />
            </View>
            <View style={styles.formGroupRow}>
                <View style={{width: '50%'}}>
                    <Text style={styles.title}>Cargo</Text>
                    <ControlledInput 
                        name="position" 
                        control={control} 
                        error={errors.position} 
                        style={styles.input}
                    />
                </View>
                <View style={{width: '40%'}}>
                    <Text style={styles.title}>CPF</Text>
                    <ControlledInput 
                        name="cpf" 
                        control={control} 
                        error={errors.cpf} 
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={14}
                    />
                </View>
            </View>
            {
                buttonUplodFilesVisible && (
                    <View style={styles.formGroup}>
                        <Pressable style={styles.btnUpload} onPress={() => navigation.navigate('FilesUpload')}>
                            <UploadSimple size={32} color="#fff" />
                        </Pressable>
                        <Text style={styles.textBtnUpload}>Anexar Documentos</Text>
                    </View>
                )
            }  
            <View style={styles.formGroup}>
                <TouchableOpacity 
                    style={styles.btnForm} 
                    activeOpacity={0.8} 
                    onPress={handleSubmit(handleSaveCompany)}
                >
                    <Text style={styles.btnText}>Enviar</Text>
                </TouchableOpacity>
            </View>

            <Modal transparent={true} visible={modalCompaniesVisible} animationType="fade">
                <ModalPicker 
                    handleCloseModal={() => setModalCompaniesVisible(false)}
                    options={possiblesCompanies}
                    selectedItem={handleChangeCompanies}
                />
            </Modal>

            <Modal transparent={true} visible={modalLegalNatureVisible} animationType="fade">
                <ModalPicker 
                    handleCloseModal={() => setModalLegalNatureVisible(false)}
                    options={possibleslegalNature}
                    selectedItem={handleChangeLegalNature}
                />
            </Modal>

            <Modal transparent={true} visible={modalSituationVisible} animationType="fade">
                <ModalPicker 
                    handleCloseModal={() => setModalSituationVisible(false)}
                    options={possiblesSituation}
                    selectedItem={handleChangeSituation}
                />
            </Modal>

            <Modal transparent={true} visible={modalStateVisible} animationType="fade">
                <ModalPicker 
                    handleCloseModal={() => setModalStateVisible(false)}
                    options={possiblesStates}
                    selectedItem={handleChangeState}
                />
            </Modal>

        </>
    );

}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Montserrat_500Medium',
        color: '#a1a1a1',       
    },
    formGroup: {
        marginTop: 20,
        marginBottom: 12,
        position: 'relative'
    },
    formGroupRow: {
        marginTop: 20,
        marginBottom: 12,
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#a1a1a1',
        minWidth: '30%',
        height: 40,
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium'
    }, 
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
    },
    btnUpload: {
        width: 40,
        height: 40,
        backgroundColor: '#6f2df3',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtnUpload: {
        fontFamily: 'Montserrat_400Regular',
        marginTop: 5
    }
});