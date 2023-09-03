import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, AddConnection} from '../screens';
import {RootStackParamList, ScreenId} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenId.Home} component={HomeScreen} options={{title: 'Home'}} />
      <Stack.Screen name={ScreenId.AddConnection} component={AddConnection} options={{title: 'Add Connection'}}/>
    </Stack.Navigator>
  );
}
