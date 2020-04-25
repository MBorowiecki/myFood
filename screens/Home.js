import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    StatusBar,
    TouchableNativeFeedback,
    Modal,
    Image,
    TextInput
} from 'react-native';
import styled from 'styled-components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    useSelector
} from 'react-redux'
import * as firebase from 'firebase';
import firebaseConfig from '../config/firebase'; 

import Header from './components/Home/Header';
import Recipes from './components/Home/Recipes';

const Container = styled.View`
    flex: 1;
    background-color: #d5e6e4;
    padding-bottom: 0px;
`

const FAB = styled.View`
    position: absolute;
    right: 20px;
    bottom: 20px;
    padding: 15px;
    border-radius: 100px;
    background-color: #5D5BB5;
    elevation: 5;
`

const FABIcon = styled(MaterialIcons)`
    color: #ffffff;
`

export default Home = ({navigation}) => {
    const profile = useSelector(store => store);
    const [modalOpen, setModalOpen] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [refreshing, setRefreshing] = useState(true);

    if(!firebase.apps.length > 0){
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        db.collection('recipes').where('owner', '==', profile.id)
        .get().then(async snap => {
            let snaps = []
            snap.forEach(doc => {
                snaps.push(doc.data());
            })

            setRecipes(_recipes => snaps);
        })
        .then(() => {
            setRefreshing(false);
        })
        .catch(err => {
            console.log(err)
            setRefreshing(false);
        })
    }, [refreshing])

    useEffect(() => {
        db.collection('recipes').where('owner', '==', profile.id)
        .get().then(snap => {
            snap.forEach(doc => {
                setRecipes(_recipes => [..._recipes, doc.data()])
            })
        })
        .then(() => {
            setRefreshing(false);
        })
        .catch(err => {
            console.log(err)
            setRefreshing(false);
        })
    }, [])

    return(
        <Container>
            <StatusBar barStyle="light-content" />
            <Recipes recipes={recipes} onRefresh={onRefresh} refreshing={refreshing} navigation={navigation} />
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('white', false)}
                onPress={() => {
                    navigation.navigate("AddRecipe")
                }}
            >
                <FAB>
                    <FABIcon name="add" size={30} />
                </FAB>
            </TouchableNativeFeedback>
        </Container>
    )
}