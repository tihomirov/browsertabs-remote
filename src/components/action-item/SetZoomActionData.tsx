import {ActionType, SetZoomAction} from 'browsertabs-remote-common/src/common';
import {FC, useEffect, useState} from 'react';
import {StyleSheet,TextInput, View} from 'react-native';

export type SetZoomActionDataProps = Readonly<{
  onDataChange: (data: SetZoomAction) => void;
}>;

export const SetZoomActionData: FC<SetZoomActionDataProps> = ({onDataChange}) => {
  const [zoomFactor, setZoomFactor] = useState('');

  useEffect(() => {
    onDataChange({
      zoomFactor: parseInt(zoomFactor),
      type: ActionType.SetZoom
    });
  }, [zoomFactor]);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setZoomFactor}
        keyboardType='number-pad'
        value={zoomFactor}
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

