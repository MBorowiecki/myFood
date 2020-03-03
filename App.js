import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import reducers from './reducers';

import Home from './screens/Home';
import Login from './screens/Login';
import AddRecipe from './screens/AddRecipeModal';

const MainStack = createStackNavigator();

const store = createStore(reducers);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false
          }}
        >
          <MainStack.Screen name="Home" component={Home} />
          <MainStack.Screen name="Login" component={Login} />
          <MainStack.Screen name="AddRecipe" component={AddRecipe} />
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
