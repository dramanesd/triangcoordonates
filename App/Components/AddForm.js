import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';

import Database from '../utils';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const GradientBtn = ({name}) => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#4527A0', '#7B1FA2']}
    style={styles.gradient}>
    <Text style={styles.btn}>{name}</Text>
  </LinearGradient>
);

const db = new Database();

class AddForm extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Ajouter',
      headerStyle: {
        backgroundColor: '#7B1FA2',
      },
      headerTintColor: '#FFFFFF',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      noeud: '',
      longitude: '',
      latitude: '',
      createdAt: Moment(Date.now()).format(),
    };
  }

  handleSubmit() {
    console.log('handleSubmit was clicked');

    let data = {
      noeud: this.state.noeud,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      createdAt: this.state.createdAt,
    };

    db.addGeoData(data)
      .then(results => {
        this.setState({
          noeud: '',
          longitude: '',
          latitude: '',
          createdAt: Moment(Date.now()).format(),
        });
        this.props.navigation.goBack();
      })
      .catch(err => {
        console.log('Not inserted ', err);
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>Ajouter les Coordonnées</Text>
        </View>
        <View style={styles.formStyle}>
          <Text style={styles.label}>Noeud</Text>
          <TextInput
            style={styles.inputStyle}
            value={this.state.noeud}
            onChangeText={text => this.setState({noeud: text})}
          />
          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={styles.inputStyle}
            value={this.state.longitude}
            onChangeText={text => this.setState({longitude: text})}
            keyboardType={'numeric'}
          />
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.inputStyle}
            value={this.state.latitude}
            onChangeText={text => this.setState({latitude: text})}
            keyboardType={'numeric'}
          />
          <TouchableHighlight
            style={styles.btnStyle}
            onPress={this.handleSubmit.bind(this)}>
            <GradientBtn name="Enregistrer" />
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#301545',
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 90,
  },
  headerText: {
    color: '#fff',
  },
  formStyle: {
    margin: 30,
  },
  inputStyle: {
    height: 40,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    backgroundColor: '#261136',
    borderColor: '#4527A0',
    borderRadius: 3,
    color: 'white',
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  btnStyle: {
    width: '100%',
    height: 35,
    marginTop: 50,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  },
  btn: {
    color: '#fff',
  },
});

export default AddForm;
