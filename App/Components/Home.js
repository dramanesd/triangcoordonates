import React, {Component} from 'react';

import donnees from '../../db/data.json';

import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({data: donnees});
  }

  ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  renderRow({item}) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/img/itemIcon.png')}
          style={styles.itemIcon}
        />
        <View style={styles.mainContent}>
          <View style={styles.body}>
            <Text style={styles.itemTitle}>{item.noeud}</Text>
            <Text style={styles.mainText}>
              Long: {item.long}, Lat: {item.long}
            </Text>
            <Text style={styles.date}>{item.createdAt}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data.donnees}
          renderItem={this.renderRow}
          ItemSeparatorComponent={this.ItemSeparator}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#301545',
    flexDirection: 'row',
    padding: 10,
  },
  mainContent: {
    marginLeft: 20,
  },
  itemTitle: {
    color: '#FFFFFF',
  },
  body: {
    flex: 1,
  },
  mainText: {
    color: '#8B8B8B',
  },
  date: {
    color: '#8B8B8B',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#9C27B0',
  },
});

export default Home;
