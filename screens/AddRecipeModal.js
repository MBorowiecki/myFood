import React, {useState} from 'react'
import {
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    Modal,
    TouchableNativeFeedback
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import * as ImagePicker from 'expo-image-picker';
import {
    produce
} from 'immer'

const MainContainer = styled.View`
    flex: 1;
    background-color: #ffffff;
    padding-bottom: 0px;
    height: 100%;
`

const AddRecipeModal = styled.Modal`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const AddRecipeImage = styled.Image`
    flex: 1;
`

const ImagePlaceholder = styled.View`
    flex: 1;
    background-color: #dfdfdf;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`

const ImagePlaceholderText = styled.Text`
    color: #737373;
    font-size: 20px;
`

const Content = styled.View`
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    flex: 2;
`

const Actions = styled.View`
    display: flex;
    flex-direction: row;
    margin: 16px;
`

const CancelButton = styled.View`
    flex: 1;
    background: transparent;
    justify-content: center;
    align-items: center;
    padding: 16px;
`

const CancelText = styled.Text`
    color: #ba1414;
    font-size: 18px;
`

const SubmitButton = styled.View`
    flex: 1;
    background-color: #5D5BB5;
    justify-content: center;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
`

const SubmitText = styled.Text`
    color: #ffffff;
    font-size: 20px;
`

const Forms = styled.ScrollView`
    margin-right: 16px;
    margin-left: 16px;
    margin-top: 16px;
    flex-grow: 1;
`

const AddRecipeTitle = styled.TextInput`
    font-size: 26px;
    color: #000000;
    margin: 16px;
`

const IngredientsLabelContainer = styled.View`
    display: flex;
    flex-direction: row;
    margin: 16px;
    justify-content: center;
    align-items: center;
`

const IngredientsLabel = styled.Text`
    flex-grow: 1;
    color: #000000;
    font-size: 20px;
`

const IngredientsIcon = styled(MaterialIcons)`
    color: #000000;
`

const IngredientsList = styled.View`
    margin-left: 16px;
    margin-right: 16px;
`

const IngredientItem = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 8px;
    margin-left: 8px;
    margin-right: 8px;
`

const IngredientIndex = styled.Text`
    color: #000000;
    font-size: 18px;
    margin-right: 8px;
`

const IngredientName = styled.TextInput`
    color: #000000;
    font-size: 18px;
    flex-grow: 1;
`

const RemoveIngredientIcon = styled(MaterialIcons)`
    color: #000000;
`

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 3],
        quality: 1
    })

    if(result.uri){
        return result
    }else{
        return null
    }
}

export default AddRecipeModalComp = ({open, setModalOpen}) => {
    const [pickedImage, setPickedImage] = useState(null);
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState([]);

    return(
        <MainContainer>
            <TouchableNativeFeedback
                    onPress={async () => {
                        let image = await pickImage();
                        setPickedImage(image);
                    }}
                >
                {pickedImage ?
                    <Image
                        source={{isStatic: true, uri: pickedImage.uri}}
                    />
                    :
                    <ImagePlaceholder>
                        <ImagePlaceholderText>
                            Click to choose image from gallery
                        </ImagePlaceholderText>
                    </ImagePlaceholder>
                }
                </TouchableNativeFeedback>
            <Content>
                <Forms>
                    <AddRecipeTitle
                        placeholder="Title..."
                        placeholderTextColor="#7f7f7f"
                        onChangeText={text => setTitle(text)}
                        value={title}
                        />
                    <IngredientsLabelContainer>
                        <IngredientsLabel>
                            Ingredients
                        </IngredientsLabel>
                        <TouchableNativeFeedback
                            onPress={() => {
                                setIngredients(ingredients => {
                                    return [
                                        ...ingredients,
                                        ""
                                    ]
                                })
                            }}
                        >
                            <IngredientsIcon name="add" size={28} />
                        </TouchableNativeFeedback>
                    </IngredientsLabelContainer>
                    <IngredientsList>
                        {ingredients.map((ingredient, index) => {
                            return(
                                <IngredientItem key={index}>
                                    <IngredientIndex>
                                        {index + 1}.
                                    </IngredientIndex>
                                    <IngredientName
                                        onChangeText={text => {
                                            setIngredients(_ing => {
                                                produce(_ing, v => {
                                                    v[index] = text;
                                                })
                                            })
                                        }}
                                        placeholder="Ingredient..."
                                        placeholderTextColor="#7f7f7f"
                                        value={ingredients[index]}
                                    />
                                    <TouchableNativeFeedback
                                        onPress={() => {
                                            let ingredients = ingredients;
                                            ingredients = ingredients.filter((val, ind, arr) => {
                                                return val !== ingredient
                                            })
                                            console.log(ingredients)
                                            setIngredients(ingredients);
                                        }}
                                        >
                                        <RemoveIngredientIcon size={24} name="delete" />
                                    </TouchableNativeFeedback>
                                </IngredientItem>
                            )
                        })}
                    </IngredientsList>
                </Forms>
                <Actions>
                    <TouchableNativeFeedback
                        onPress={()=> {

                        }}
                    >
                    <SubmitButton>
                        <SubmitText>Add recipe</SubmitText>
                    </SubmitButton>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => {
                            setPickedImage(null);
                            setModalOpen(false);
                            setTitle("")
                        }}
                    >
                    <CancelButton>
                        <CancelText>Cancel</CancelText>
                    </CancelButton>
                    </TouchableNativeFeedback>
                </Actions>
            </Content>
        </MainContainer>
    )
}