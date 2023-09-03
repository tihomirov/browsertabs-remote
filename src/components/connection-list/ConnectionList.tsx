import {FC} from 'react';
import {View, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';

import {listRenderConnectionItem} from '../../components/connection-item';
import {AddConnectionButton} from '../../components/add-connection-button';
import {useStores} from '../../hooks';

export type RootStackParamList = {
  Home: undefined;
  AddConnection: undefined;
};

export const ConnectionList: FC = observer(() => {
  const {connectionsStore} = useStores();

  return (
    <View>
      <FlatList
        data={connectionsStore.connections}         
        renderItem={listRenderConnectionItem}
        keyExtractor={item => item[0]} 
      />
      <AddConnectionButton />
    </View>
  );
});
