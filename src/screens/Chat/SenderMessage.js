import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import moment from 'moment';

export default function SenderMessage({ message }) {
  return (
    <View>
      <View
        style={[
          tailwind(
            'bg-blue-300 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2'
          ),
          { alignSelf: 'flex-start', marginLeft: 'auto' },
        ]}
      >
        <Text style={tailwind('text-white')}>{message.message}</Text>
      </View>
      <View
        style={[
          tailwind('px-5 py-3'),
          { alignSelf: 'flex-start', marginLeft: 'auto' },
        ]}
      >
        <Text>{moment(message.timestamp?.toDate()).fromNow()}</Text>
      </View>
    </View>
  );
}
