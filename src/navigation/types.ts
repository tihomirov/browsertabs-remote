
import {StackNavigationProp} from '@react-navigation/stack';

export const enum ScreenId {
  Home = 'Home',
  AddConnection = 'AddConnection',
  Connection = 'Connection',
}

export type RootStackParamList = Readonly<{
  [ScreenId.Home]: undefined;
  [ScreenId.AddConnection]: undefined;
  [ScreenId.Connection]: { peerId: string };
}>;

export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
