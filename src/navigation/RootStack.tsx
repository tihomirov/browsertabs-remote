import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, AddConnection} from '../screens';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} />
      <Stack.Screen name="AddConnection" component={AddConnection} options={{title: 'Add Connection'}}/>
    </Stack.Navigator>
  );
}
