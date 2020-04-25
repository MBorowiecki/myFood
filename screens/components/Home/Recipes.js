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

const CategoryContainer = styled.View`
    background-color: ${props => props.bgColor};
    width: 100%;
    padding-top: 16px;
`

const CategoryTitle = styled.Text`
    color: #ffffff;
    font-size: 32px;
    margin-left: 16px;
    margin-right: 16px;
    padding: 8px;
    padding-left: 16px;
    padding-right: 16px;
    border-radius: 15px;
    margin-bottom: 32px;
    background-color: ${props => props.bgColor};
`

const BottomSpacing = styled.View`
    height: 80px;
    width: 100%;
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
            {props.recipes.filter(recipe => recipe['category'] === 0).length > 0 && 
                <CategoryContainer
                    bgColor="#e0632400"
                >
                    <CategoryTitle bgColor="#e06324">Breakfast</CategoryTitle>
                {props.recipes.map((recipe, index) => {
                    if(recipe.category === 0){
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
                    }
                })}
                </CategoryContainer>
            }
            {props.recipes.filter(recipe => recipe['category'] === 1).length > 0 && 
                <CategoryContainer
                    bgColor="#24a4e000"
                >
                    <CategoryTitle bgColor="#24a4e0">Dinner</CategoryTitle>
                {props.recipes.map((recipe, index) => {
                    if(recipe.category === 1){
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
                    }
                })}
                </CategoryContainer>
                }
                {props.recipes.filter(recipe => recipe['category'] === 2).length > 0 && 
                    <CategoryContainer
                        bgColor="#e0248500"
                    >
                        <CategoryTitle bgColor="#e02485">Supper</CategoryTitle>
                    {props.recipes.map((recipe, index) => {
                        if(recipe.category === 2){
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
                        }
                    })}
                    </CategoryContainer>
                }
            <BottomSpacing />
        </Container>
    )
}