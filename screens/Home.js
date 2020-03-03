import React, { useEffect, useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';

import Header from './components/Home/Header';
import Recipes from './components/Home/Recipes';

const recipes = [
    {
        title: "Pancakes",
        calories: 1234,
        img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        price: 23
    },
    {
        title: "Something other",
        calories: 1234,
        img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        price: 23
    },
    {
        title: "Other thing",
        calories: 1234,
        img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        price: 23
    }
]

const Container = styled.View`
    flex: 1;
    background-color: #ffffff;
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

    return(
        <Container>
            <StatusBar barStyle="dark-content" />
            <Header screenTitle="My Recipes" />
            <Recipes recipes={recipes} />
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