import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from "react-native";
import { useForm } from "react-hook-form";
import { ControlledInput } from "./ControlledInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { normalizeCpfNumber, normalizeCepNumber, normalizePhoneNumber, normalizeDate } from "../utils/inputMasks";
import { ModalPicker } from "./ModalPicker";

type FormData = {
    nome: string;
    cpf: string;
    birth: string;
    state: string;
    address: string;
    city: string;
    gender: string;
    email: string;
    phone: string;
    cep: string;
}

const schema = yup.object({
    nome: yup.string().required('Informe o nome'),
    cpf: yup.string().min(14, 'CPF deve ter 11 caracteres').required('Informe o cpf'),
    birth: yup.string().matches(/^(?:(?:31([-\/.]?)(?:0[13578]|1[02]))\1|(?:(?:29|30)([-\/.]?)(?:0[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)\d{2})$|^(?:29([-\/.]?)02\3(?:(?:(?:1[6-9]|[2-9]\d)(?:0[48]|[2468][048]|[13579][26]))))$|^(?:0[1-9]|1\d|2[0-8])([-\/.]?)(?:(?:0[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)\d{2})$/, 'Data inválida').required('Informe a data de nascimento'),
    state: yup.string().required('Informe o estado'),
    address: yup.string().required('Informe o endereço'), // ver o tipo date
    city: yup.string().required('Informe cidade'),
    gender:  yup.string().required('Informe o sexo'),
    email: yup.string().email('Email inválido').required('Informe o email'),
    phone: yup.string().required('Informe o telefone'),
    cep: yup.string().required('Informe o CEP')
});

export function PhysicalPersonForm() {

    const [modalVisible, setModalVisible] = useState(false);

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const cpf = watch('cpf');
    const phoneValue = watch("phone");
    const cepValue = watch("cep");
    const birth = watch("birth");
    const possibleGender = ['Masculino', 'Feminino'];

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
        setValue("birth", normalizeDate(birth));
    },[birth]);


    function handleChangeGender(gender: string) {

        setValue("gender", gender);
        
    }

    function handleSignUp(data: FormData) {

        console.log(data);
    }

    return (
        <>
            <View style={styles.formGroup}>
                <Text style={styles.title}>Nome</Text>
                <ControlledInput 
                    name="nome" 
                    control={control} 
                    error={errors.nome} 
                    style={styles.input} 
                />
            </View>
            <View style={styles.formGroup}>
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
            <View style={styles.formGroupRow}>
                <View>
                    <Text style={styles.title}>Data de Nascimento</Text>
                    <ControlledInput 
                        name="birth" 
                        control={control} 
                        error={errors.birth} 
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={10}
                    />
                </View>
                <View style={{position: 'relative'}}>
                    <Text style={styles.title}>Sexo</Text>
                    <ControlledInput 
                        name="gender" 
                        control={control} 
                        error={errors.gender}
                        style={styles.input}
                        placeholder="-- Selecione"
                        placeholderTextColor="#a1a1a1"
                    />
                    <Pressable 
                        style={{
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0,
                        }}
                        onPress={() => setModalVisible(true)}
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
                <View>
                    <Text style={styles.title}>Cidade</Text>
                    <ControlledInput 
                        name="city" 
                        control={control} 
                        error={errors.city}
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.title}>Estado</Text>
                    <ControlledInput 
                        name="state" 
                        control={control} 
                        error={errors.state}
                        style={styles.input}
                        maxLength={2}
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
                <View>
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
                <TouchableOpacity 
                    style={styles.btnForm} 
                    activeOpacity={0.8} 
                    onPress={handleSubmit(handleSignUp)}
                >
                    <Text style={styles.btnText}>Enviar</Text>
                </TouchableOpacity>
            </View> 

            <Modal transparent={true} visible={modalVisible} animationType="fade">
                <ModalPicker 
                    handleCloseModal={() => setModalVisible(false)}
                    options={possibleGender}
                    selectedItem={handleChangeGender}
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
        marginBottom: 12
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
    }
});