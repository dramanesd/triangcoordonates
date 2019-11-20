import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
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
      isLoading: true,
      listEmpty: 'Aucun donnée trouvé, Veuillez Ajouter des données !',
      search: '',
    };

    this.arrayholder = [];

    deleteCoordonnees = id => {
      db.deleteGeoData(id)
        .then(result => {
          console.log(result);
          this.getCoordonnees();
          this.props.navigation.navigate('Home');
        })
        .catch(err => {
          console.log(err);
        });
    };

    editOptionAlertHandler = item => {
      Alert.alert(
        //title
        'Options de Modification',
        //body
        'Choisissez une option',
        [
          {
            text: 'Modifier',
            onPress: () => this.props.navigation.navigate('Edit', {id: item}),
          },
          {text: 'Supprimer', onPress: () => deleteCoordonnees(item)},
          {text: 'Annuler', onPress: () => console.log('Cancel Pressed')},
        ],
        {cancelable: false},
      );
    };
  }

  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getCoordonnees();
    });
  }

  getCoordonnees() {
    let coordonnees = [];
    db.getGeoData()
      .then(data => {
        coordonnees = data;
        this.setState(
          {
            coordonnees,
            isLoading: false,
          },
          function() {
            this.arrayholder = coordonnees;
          },
        );
      })
      .catch(err => {
        console.log('Results not found ', err);
        this.setState({
          isLoading: false,
        });
      });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.search.clear();
  };

  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.noeud ? item.noeud.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      coordonnees: newData,
      search: text,
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
            <Text style={styles.date}>
              {Moment(item.createdAt).format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>
        <Icon.Button
          style={styles.editIcon}
          type={'MaterialIcons'}
          name={'edit'}
          size={25}
          underlayColor={'transparent'}
          backgroundColor={'transparent'}
          onPress={() => this.editOptionAlertHandler(item.id)}
        />
      </View>
    );
  }

  searchBar = () => (
    <SearchBar
      containerStyle={{backgroundColor: 'transparent'}}
      inputContainerStyle={styles.inputContainerStyle}
      inputStyle={{backgroundColor: 'transparent'}}
      underlineColorAndroid='transparent'
      round
      searchIcon={{size: 24}}
      onChangeText={text => this.SearchFilterFunction(text)}
      onClear={text => this.SearchFilterFunction('')}
      placeholder="Searcher les Noeuds Ici..."
      value={this.state.search}
    />
  );

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#301545" />
        </View>
      );
    }

    if (this.state.coordonnees.length === 0) {
      return (
        <View style={styles.emptyView}>
          {this.searchBar()}
          <View style={styles.emptyContent}>
            {/* <Image
              style={styles.emptyContentImg}
              source={require('../../assets/img/backgroundLogo.png')}
              /> */}
            <Text style={styles.message}>{this.state.listEmpty}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{backgroundColor: '#301545'}}>
        {this.searchBar()}
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
    flexBasis: 1,
    backgroundColor: '#301545',
    flexDirection: 'row',
    padding: 10,
  },
  mainContent: {
    width: '70%',
    marginLeft: 20,
  },
  editIcon: {
    marginRight: 20,
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
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyView: {
    backgroundColor: '#EEC6FF',
  },
  emptyContent: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEC6FF',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
  },
  inputContainerStyle: {
    backgroundColor: 'transparent',
    borderColor: '#4527A0',
    borderWidth: 1,
    borderBottomColor: '#4527A0',
    borderBottomWidth: 1,
  },
});

export default Home;
