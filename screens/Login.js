import React, { useEffect } from 'react'
import {
    View, 
    Text,
    TouchableNativeFeedback,
    Alert
} from 'react-native'
import styled from 'styled-components';
import * as fb from 'expo-facebook';
import {
    useSelector,
    useDispatch
} from 'react-redux'

const Container = styled.View`
    background-color: #ffffff;
    flex: 1;
    justify-content: center;
    align-items: center;
`

const FBButton = styled.View`
    padding: 24px;
    background-color: #617FE8;
    elevation: 5;
    border-radius: 10px;
`

const FBButtonText = styled.Text`
    font-size: 24px;
    color: #ffffff;
`

const logInWithFB = async (navigation, dispatch) => {
    await fb.initializeAsync('613931802792790');

    const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
    } = await fb.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
    });
    if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`);
        let res = await response.json();
        dispatch({type: "SET_PROFILE", profile: res});
        navigation.navigate("Home");
    } else {
        // type === 'cancel'
    }
}

const Login = ({navigation}) => {
    const profile = useSelector(state => state);
    const dispatch = useDispatch();

    return(
        <Container>
            <TouchableNativeFeedback
                onPress={() => {
                    logInWithFB(navigation, dispatch);
                }}
            >
                <FBButton>
                    <FBButtonText>
                        Continue with Facebook
                    </FBButtonText>
                </FBButton>
            </TouchableNativeFeedback>
        </Container>
    )
}

export default Login;