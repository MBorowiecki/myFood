import React from 'react';
import {
    View,
    Text
} from 'react-native';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Container = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 30px;
    padding-top: 40px;
    padding-bottom: 15px;
`

const MenuIcon = styled(MaterialIcon)`
    color: #020102;
`

const ScreenTitle = styled.Text`
    color: #020102;
    font-size: 16px;
    flex-grow: 1;
    text-align: center;
`

const SearchIcon = styled(MaterialIcon)`
    color: #020102;
`

export default Header = (props) => {
    return(
        <Container>
            <MenuIcon name="menu" size={25} />
            <ScreenTitle>
                {props.screenTitle}
            </ScreenTitle>
            <SearchIcon name="search" size={25} />
        </Container>
    )
}