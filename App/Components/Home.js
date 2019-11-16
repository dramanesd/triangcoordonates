import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Database from '../utils';

const db = new Database();

class Home extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Coordonnees',
      headerRight: () => (
        <Icon.Button
          type={'MaterialIcons'}
          name={'add-circle'}
          size={30}
          underlayColor={'transparent'}
          backgroundColor={'transparent'}
          onPress={() => navigation.navigate('Add')}
        />
      ),
      headerStyle: {
        backgroundColor: '#7B1FA2',
      },
      headerTintColor: '#FFFFFF',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      coordonnees: [],
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getCoordonnees();
    });
  }

  getCoordonnees() {
    let coordonnees = [];
    db.getGeoData().then((data) => {
      coordonnees = data;
      this.setState({
        coordonnees,
      });
    }).catch((err) => {
      console.log('Results not found ', err);
    });
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
              Long: {item.longitude}, Lat: {item.latitude}
            </Text>
            <Text style={styles.date}>{item.createdAt}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={{backgroundColor: '#301545'}}>
        <FlatList
          data={this.state.coordonnees}
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
