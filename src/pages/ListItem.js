import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const ListItem = ({item, selected, onPress}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress} style={styles.listItem}>
      <View style={styles.selectBox}>
        {selected ? (
          <Text style={styles.itemName}>{item.name}</Text>
        ) : (
          <Text style={styles.itemNameAble}>{item.name}</Text>
        )}
      </View>
      {selected && <View style={styles.overlay} />}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  selectBox: {
    padding: 8,
  },
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginRight: 5,
    borderRadius: 18,
    borderColor: '#999',
    borderWidth: 0.5,
    overflow: 'hidden',
    width: '100%',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 12,
    color: 'white',
  },
  itemNameAble: {
    fontSize: 12,
    color: '#999',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(130,176,244,1)',
    zIndex: -1,
  },
});

export default ListItem;
