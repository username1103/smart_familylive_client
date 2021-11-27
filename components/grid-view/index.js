import React from 'react';
import { View } from 'react-native';

export function GridView({ data, renderItem, numColumns }) {
  let items = [];

  for (let i = 0; i < data.length; i += numColumns) {
    let rowItems = [];
    for (let j = i; j < data.length && j < i + numColumns; j++) {
      rowItems.push(data[j]);
    }
    items.push(rowItems);
  }

  return (
    <View>
      {items.map((rowItems, rowIndex) => {
        const rowStart = rowIndex * numColumns;

        return (
          <View
            key={rowIndex}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
          >
            {rowItems.map((item, colIndex) => {
              const index = rowStart + colIndex;

              return renderItem(item, index);
            })}
          </View>
        );
      })}
    </View>
  );
}
