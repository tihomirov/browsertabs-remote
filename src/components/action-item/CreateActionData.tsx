import {ActionType, CreateAction} from 'browsertabs-remote-common/src/common';
import {FC, useEffect, useState} from 'react';
import {StyleSheet,TextInput, View} from 'react-native';

export type CreateActionDataProps = Readonly<{
  onDataChange: (data: CreateAction) => void;
}>;

export const CreateActionData: FC<CreateActionDataProps> = ({onDataChange}) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    onDataChange({
      url,
      type: ActionType.Create
    });
  }, [url]);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setUrl}
        value={url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

