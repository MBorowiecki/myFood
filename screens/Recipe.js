import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
    View,
    Text,
    Image,
    ScrollView,
    ImageBackground,
    TouchableWithoutFeedback,
    TouchableNativeFeedback
} from 'react-native'


const Container = styled.View`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
`

const Title = styled.Text`
    color: #020102;
    font-size: 26px;
    margin-right: 16px;
`

const TotalCalories = styled.Text`
    color: #767676;
    font-size: 16px;
`

const TitleBarLeft = styled.View`
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    margin-top: 8px;
    margin-bottom: 8px;
    flex-grow: 1;
`

const RecipeImage = styled.Image`
    flex-grow: 1;
    min-height: 250px;
`

const Price = styled.Text`
    color: #20A70A;
    font-size: 32px;
    margin-right: 16px;
`

const TitleBar = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px;
    background-color: #e5e5e5;
    border-radius: 10px;
`

const ContentContainer = styled.ScrollView`
    padding: 16px;
`

const Label = styled.Text`
    margin-top: 16px;
    color: #888888;
    font-size: 26px;
` 

const MetaInfo = styled.Text` /* Ingredients, steps to reproduce and description */
    margin-top: 8px;
    color: #444444;
    font-size: 20px;
`

const MakeItButton = styled.View`
    background-color: #b24c63;
    margin-top: 16px;
    padding: 24px;
    margin-bottom: 32px;
    justify-content: center;
    align-items: center;
`

const MakeItButtonText = styled.Text`
    color: #ffffff;
    font-size: 24px;
`

const Recipe = (props) => {
    const recipe = props.route.params.recipe;

    return(
        <Container>
            <RecipeImage source={{uri: recipe.image}} />
            <ContentContainer>
                <TitleBar>
                    <TitleBarLeft>
                        <Title multiline>{recipe.title}</Title>
                        <TotalCalories>{recipe.totalCalories} kcal</TotalCalories>
                    </TitleBarLeft>
                    <Price>$ {recipe.totalPrice}</Price>
                </TitleBar>
                <Label>Ingredients</Label>
                <MetaInfo multiline>{recipe.ingredients}</MetaInfo>
                <Label>Steps to produce</Label>
                <MetaInfo multiline>{recipe.stepsToProduce}</MetaInfo>
                <Label>Description</Label>
                <MetaInfo multiline>{recipe.shortDescription}</MetaInfo>
                {/*<TouchableNativeFeedback
                >
                    <MakeItButton>
                        <MakeItButtonText>Let's make it!</MakeItButtonText>
                    </MakeItButton>
                </TouchableNativeFeedback>*/}
            </ContentContainer>
        </Container>
    )
}

export default Recipe;