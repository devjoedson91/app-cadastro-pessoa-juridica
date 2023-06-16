import { useEffect, useLayoutEffect } from "react";
import { ScrollView, Text, StyleSheet, View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
import { CaretLeft } from "phosphor-react-native";
import { LegalPersonForm } from "../components/LegalPersonForm";

export function Register() {

    const navigation = useNavigation<BottomTabNavigationProp<TabParams>>();

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
                <Text style={styles.pageTitle}>Ficha Cadastral</Text>
            </Animatable.View>
            <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
                <ScrollView style={{paddingHorizontal: '8%', marginBottom: 30}} showsVerticalScrollIndicator={false}>
                    <LegalPersonForm />
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
    }
});