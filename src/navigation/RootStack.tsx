import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';

import {AddConnectionScreen, ConnectionScreen,HomeScreen} from '../screens';
import {RootStackParamList, ScreenId} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenId.Home} component={HomeScreen} options={{title: 'Home'}} />
      <Stack.Screen
        name={ScreenId.AddConnection}
        component={AddConnectionScreen}
        options={{title: 'Add Connection'}}
      />
      <Stack.Screen
        name={ScreenId.Connection}
        component={ConnectionScreen}
        options={{title: 'Connection'}}
      />
    </Stack.Navigator>
  );
};
