
import {StackNavigationProp} from '@react-navigation/stack';

export const enum ScreenId {
  Home = 'Home',
  AddConnection = 'AddConnection',
}

export type RootStackParamList = Readonly<{
  [ScreenId.Home]: undefined;
  [ScreenId.AddConnection]: undefined;
}>;

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
