import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Text, StyleSheet, Platform, Pressable, ScrollView, View, ToastAndroid, Alert, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { CaretLeft, Paperclip } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as ImagePicker from 'expo-image-picker';
import mime from "mime";
import { Button } from "../components/Button";

export function FilesUpload() {

    const navigation = useNavigation<BottomTabNavigationProp<TabParams>>();

    const [cpfUrlFile, setCpfUrlFile] = useState('');
    const [addressUrlFile, setAddressUrlFile] = useState('');
    const [incomeUrlFile, setIncomeUrlFile] = useState('');
    const [btnSendVisible, setBtnSendVisible] = useState(false);

    useEffect(() => {

        if (cpfUrlFile.length > 140 && addressUrlFile.length > 140 && incomeUrlFile.length > 140) {

            setBtnSendVisible(true);
        }

    }, [cpfUrlFile, addressUrlFile, incomeUrlFile]);

    async function selectCpf() {

        try {

            // const res = await DocumentPicker.getDocumentAsync({
            //   type: "*/*",
            //   copyToCacheDirectory: true,
            //   multiple: false,
            // });
           
            // const lastThree = res.name.substr(res.name.length - 3);

            // if(lastThree == 'pdf') {
      
            //   if(res.type == 'success') {

            //     console.log(res.uri);
                
            //     setCpfUrlFile(res.uri);
            //     ToastAndroid.show('Arquivo carregado com sucesso!', ToastAndroid.SHORT);
            //   }           
      
            // } else {
            //     ToastAndroid.show('Por favor, selecione um arquivo PDF', ToastAndroid.SHORT);
            // }

            const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {

            Alert.alert('Permissão necessária', 'Permita que sua aplicação acesse as imagens');

        } else {

            const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                base64: false,
                aspect: [6, 10],
                quality: 1
            });

            if (canceled) {

                ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
            } else {

                // const newImageUri =  "file:///" + assets[0].uri.split("file:/").join("");

                const fileName = assets[0].uri.substring(assets[0].uri.lastIndexOf('/') + 1, assets[0].uri.length);

                const file = {
                    name: fileName,
                    type: mime.getType(assets[0].uri),
                    uri: Platform.OS === 'ios' ? assets[0].uri.replace('file:///', '') : assets[0].uri,
                };

                setCpfUrlFile(file.uri);
                
            }
        }

        } catch (error) {
            console.log(error);
            ToastAndroid.show('Erro ao carregar arquivo', ToastAndroid.SHORT);
        }
        

    }

    async function selectAddress() {

        try {
            const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!granted) {

                Alert.alert('Permissão necessária', 'Permita que sua aplicação acesse as imagens');

            } else {

                const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    base64: false,
                    aspect: [6, 10],
                    quality: 1
                });

                if (canceled) {

                    ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
                } else {

                    // const newImageUri =  "file:///" + assets[0].uri.split("file:/").join("");

                    const fileName = assets[0].uri.substring(assets[0].uri.lastIndexOf('/') + 1, assets[0].uri.length);

                    const file = {
                        name: fileName,
                        type: mime.getType(assets[0].uri),
                        uri: Platform.OS === 'ios' ? assets[0].uri.replace('file:///', '') : assets[0].uri,
                    };

                    setAddressUrlFile(file.uri);
                    
                }
            }

        } catch (error) {
            console.log(error);
            ToastAndroid.show('Erro ao carregar arquivo', ToastAndroid.SHORT);
        }
        

    }

    async function selectIncomeFile() {

        try {
            const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!granted) {

                Alert.alert('Permissão necessária', 'Permita que sua aplicação acesse as imagens');

            } else {

                const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    base64: false,
                    aspect: [6, 10],
                    quality: 1
                });

                if (canceled) {

                    ToastAndroid.show('Operação cancelada', ToastAndroid.SHORT);
                } else {

                    // const newImageUri =  "file:///" + assets[0].uri.split("file:/").join("");

                    const fileName = assets[0].uri.substring(assets[0].uri.lastIndexOf('/') + 1, assets[0].uri.length);

                    const file = {
                        name: fileName,
                        type: mime.getType(assets[0].uri),
                        uri: Platform.OS === 'ios' ? assets[0].uri.replace('file:///', '') : assets[0].uri,
                    };

                    setIncomeUrlFile(file.uri);
                    
                }
            }

        } catch (error) {
            console.log(error);
            ToastAndroid.show('Erro ao carregar arquivo', ToastAndroid.SHORT);
        }
        

    }

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={}
        >
            <Animatable.View animation="fadeInDown" style={styles.containerHeader}>
                <Pressable onPress={() => navigation.goBack()}>
                    <CaretLeft size={35} color="#fff" />
                </Pressable>
                <Text style={styles.pageTitle}>Documentação</Text>
            </Animatable.View>
            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <ScrollView style={{paddingHorizontal: '8%', marginBottom: 30}} showsVerticalScrollIndicator={false}>
                    <View style={styles.formGroup}>
                        <Text style={styles.textForm}>Anexe os documentos do Representante Legal exigidos abaixo, use arquivos escaneados em jpg ou png.</Text>
                    </View>
                    <View style={styles.formGroup}>
                        <Pressable 
                            style={styles.btnUpload}
                            onPress={selectCpf}
                        >
                            <Text style={styles.title}>CPF, RG ou CNH</Text>
                            <Paperclip size={32} color="#fff" />
                        </Pressable>
                        <View style={styles.documentPreview}>
                            {
                                cpfUrlFile.length > 0 && (
                                    <Image 
                                        source={{uri: cpfUrlFile}}
                                        style={{width: 300, height: 200}}
                                        resizeMode="cover"
                                    />
                                )
                            }
                        </View>
                    </View>
                    <View style={styles.formGroup}>
                        <Pressable 
                            style={styles.btnUpload}
                            onPress={selectAddress}
                        >
                            <Text style={styles.title}>Comprovante de Endereço</Text>
                            <Paperclip size={32} color="#fff" />
                        </Pressable>
                        <View style={styles.documentPreview}>
                            {
                                addressUrlFile.length > 0 && (
                                    <Image 
                                        source={{uri: addressUrlFile}}
                                        style={{width: 300, height: 200}}
                                        resizeMode="cover"
                                    />
                                )
                            }
                        </View>
                    </View>
                    <View style={styles.formGroup}>
                        <Pressable 
                            style={styles.btnUpload}
                            onPress={selectIncomeFile}
                        >
                            <Text style={styles.title}>Comprovante de Renda</Text>
                            <Paperclip size={32} color="#fff" />
                        </Pressable>
                        <View style={styles.documentPreview}>
                            {
                                incomeUrlFile.length > 0 && (
                                    <Image 
                                        source={{uri: incomeUrlFile}}
                                        style={{width: 300, height: 200}}
                                        resizeMode="cover"
                                    />
                                )
                            }
                        </View>
                    </View>

                    {
                        btnSendVisible && (
                            <View style={styles.formGroup}>
                                <Button title="Enviar" />
                            </View>
                        )
                    }

                </ScrollView>
                   
            </Animatable.View>
        </KeyboardAvoidingView>
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
        paddingVertical: 10
    },
    containerHeader: {
        backgroundColor: '#6f2df3',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: '10%',
        marginTop: '10%',
        marginBottom: '8%',
        flexDirection: 'row'
    },
    pageTitle: {
        color: '#fff',   
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18
    },
    formGroup: {
        marginTop: 20,
        position: 'relative'
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
    title: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#fff',
        marginRight: 6    
    },
    textForm: {
        fontFamily: 'Montserrat_500Medium',
        textAlign: 'center'
    },
    documentPreview: {
        alignSelf: 'center',
        borderColor: '#a1a1a1',
        padding: 20
    }
});