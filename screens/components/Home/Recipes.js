import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Image
} from 'react-native';
import styled from 'styled-components';

const Container = styled.ScrollView`
    width: 100%;
    height: 100%;
`

const RecipeItem = styled.View`
    margin-bottom: 32px;
    border-radius: 10px;
    background-color: #ffffff;
    elevation: 3;
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
    height: 170px;
    border-radius: 10px;
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
        <Container>
            {props.recipes.map((recipe, index) => {
                return(
                    <TouchableNativeFeedback
                        key={index}
                    >
                        <RecipeItem>
                            <RecipeImage source={{uri: recipe.img}} />
                            <RecipeBottomBar>
                                <RecipeLeftItem>
                                    <RecipeTitle>{recipe.title}</RecipeTitle>
                                    <RecipeCalories>{recipe.calories} kcal</RecipeCalories>
                                </RecipeLeftItem>
                                <RecipePrice>${recipe.price}</RecipePrice>
                            </RecipeBottomBar>
                        </RecipeItem>
                    </TouchableNativeFeedback>
                )
            })}
        </Container>
    )
}