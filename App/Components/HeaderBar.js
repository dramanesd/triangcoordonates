import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class HeaderBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Coordonnées</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    backgroundColor: '#7B1FA2',
  },
  barStyles: {
    width: '100%',
    height: 50,
    backgroundColor: '#7B1FA2',
  },
  headerTitle: {
    color: '#fff',
    paddingTop: 12,
    marginLeft: 15,
    fontSize: 18,
  },
  ImgBtn: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginRight: 15,
  },
});

export default HeaderBar;
