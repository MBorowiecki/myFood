import React, {useState, useEffect} from 'react'
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
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from '../config/firebase'; 
import {
    useSelector
} from 'react-redux'
import axios from 'axios'

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
    margin-top: 16px;
    flex-grow: 1;
`

const Title = styled.TextInput`
    color: #020102;
    font-size: 26px;
    margin-right: 16px;
`

const TotalCalories = styled.TextInput`
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

const Price = styled.TextInput`
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
    margin-left: 16px;
    margin-right: 16px;
`

const ContentContainer = styled.ScrollView`
    padding: 16px;
`

const Label = styled.TextInput`
    margin-top: 16px;
    color: #888888;
    font-size: 26px;
` 

const MetaInfo = styled.TextInput` /* Ingredients, steps to reproduce and description */
    margin-top: 8px;
    color: #444444;
    font-size: 20px;
`

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [6, 4],
        quality: 0.4
    })

    if(result.uri){
        return result
    }else{
        return null
    }
}

const AddToFirebase = async (db, profile, title, pickedImage, ingredients, stepsToProduce, shortDescription, navigation, storage, image, totalCalories, totalPrice) => {
    if(db && profile && title && pickedImage && ingredients && stepsToProduce && shortDescription && navigation && storage && image && totalCalories && totalPrice){
        const res = await fetch(image.uri);
        const blob = await res.blob();
        let date = Date.now();
        
        let uploadFile = storage.ref().child(profile.id + "/" + title + '-' + date + ".jpg").put(blob)
        .then(snap => {
            snap.ref.getDownloadURL().then(url => {
                db.collection('recipes').add({
                    title,
                    ingredients,
                    stepsToProduce,
                    shortDescription,
                    owner: profile.id,
                    image: url,
                    totalCalories,
                    totalPrice
                }).then(docRef => {
                    navigation.goBack();
                }).catch(err => {
                    console.log(err);
                    navigation.goBack();
                })
            })
        })
    }
}

export default AddRecipeModalComp = ({open, setModalOpen, navigation}) => {
    const [pickedImage, setPickedImage] = useState(null);
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [stepsToProduce, setStepsToProduce] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [totalCalories, setTotalCalories] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const profile = useSelector(state => state);

    const db = firebase.firestore();
    const storage = firebase.storage()

    useEffect(() => {
        if(!firebase.apps.length > 0){
            firebase.initializeApp(firebaseConfig);
        }
    }, [])

    return(
        <MainContainer>
            <TouchableNativeFeedback
                    onPress={async () => {
                        let image = await pickImage();
                        setPickedImage(image);
                    }}
                >
                {pickedImage ?
                    <AddRecipeImage
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
                    <TitleBar>
                        <TitleBarLeft>
                            <Title
                                placeholder="Title..."
                                placeholderTextColor="#7f7f7f"
                                onChangeText={text => setTitle(text)}
                                value={title}
                            />
                            <TotalCalories
                                placeholder="Total calories..."
                                onChangeText={(text) => {
                                    setTotalCalories(text)
                                }}
                                value={totalCalories}
                            />
                        </TitleBarLeft>
                        <Price
                            placeholder="0 $"
                            onChangeText={text => {
                                setTotalPrice(text)
                            }}
                            value={totalPrice}
                        />
                    </TitleBar>
                    <ContentContainer>
                        <Label>Ingredients</Label>
                        <MetaInfo
                            onChangeText={text => {
                                setIngredients(text)
                            }}
                            placeholder="Ingredients..."
                            value={ingredients}
                            multiline
                            numberOfLines={1}
                        />
                        <Label>Steps to produce</Label>
                        <MetaInfo
                            multiline
                            numberOfLines={1}
                            placeholder="Steps to produce..."
                            onChangeText={(text) => {
                                setStepsToProduce(text)
                            }}
                            value={stepsToProduce}
                        />
                        <Label>Description</Label>
                        <MetaInfo
                            placeholder="Short description..."
                            multiline
                            onChangeText={(text) => {
                                setShortDescription(text);
                            }}
                            value={shortDescription}
                        />
                    </ContentContainer>
                </Forms>
                <Actions>
                    <TouchableNativeFeedback
                        onPress={()=> {
                            AddToFirebase(db, profile, title, pickedImage, ingredients, stepsToProduce, shortDescription, navigation, storage, pickedImage, totalCalories, totalPrice);
                        }}
                    >
                    <SubmitButton>
                        <SubmitText>Add recipe</SubmitText>
                    </SubmitButton>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => {
                            setPickedImage(null);
                            setTitle("")
                            navigation.goBack();
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