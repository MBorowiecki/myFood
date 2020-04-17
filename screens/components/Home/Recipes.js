import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Image,
    RefreshControl
} from 'react-native';
import styled from 'styled-components';

const Container = styled.ScrollView`
    width: 100%;
    height: 100%;
`

const RecipeItem = styled.View`
    margin-bottom: 32px;
    border-radius: 20px;
    background-color: #ffffff;
    margin-right: 30px;
    margin-left: 30px;
`

const RecipeTitle = styled.Text`
    color: #020102;
    font-size: 18px;
`

const RecipeCalories = styled.Text`
    color: #767676;
    font-size: 16px;
`

const RecipeLeftItem = styled.View`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    margin-top: 8px;
    margin-bottom: 8px;
    flex-grow: 1;
`

const RecipeImage = styled.Image`
    height: 190px;
    border-radius: 20px;
`

const RecipePrice = styled.Text`
    color: #20A70A;
    font-size: 24px;
    margin-right: 16px;
`

const RecipeBottomBar = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export default Header = (props) => {
    return(
        <Container
            refreshControl={<RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />}
        >
            {props.recipes.map((recipe, index) => {
                return(
                    <TouchableNativeFeedback
                        key={index}
                        onPress={() => {
                            props.navigation.navigate('Recipe', {recipe})
                        }}
                    >
                        <RecipeItem>
                            <RecipeImage source={{uri: recipe.image}} />
                            <RecipeBottomBar>
                                <RecipeLeftItem>
                                    <RecipeTitle>{recipe.title}</RecipeTitle>
                                    <RecipeCalories>{recipe.totalCalories} kcal</RecipeCalories>
                                </RecipeLeftItem>
                                <RecipePrice>$ {recipe.totalPrice}</RecipePrice>
                            </RecipeBottomBar>
                        </RecipeItem>
                    </TouchableNativeFeedback>
                )
            })}
        </Container>
    )
}