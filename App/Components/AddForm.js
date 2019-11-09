import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {
  View,
  Text,
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

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noeud: '',
      longittitude: '',
      latitude: '',
    };
  }

  handleChange() {
    console.log('Hi');
  }

  handleSubmit() {
    console.log('Hi');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>Ajouter les Coodonnées</Text>
        </View>
        <View style={styles.formStyle}>
          <Text style={styles.label}>Noeud</Text>
          <TextInput
            style={styles.inputStyle}
            value={this.state.longittitude}
            onChange={this.handleChange.bind(this)}
          />
          <Text style={styles.label}>Longititude</Text>
          <TextInput
            style={styles.inputStyle}
            value={this.state.longittitude}
            onChange={this.handleChange.bind(this)}
          />
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.inputStyle}
            value={this.state.longittitude}
            onChange={this.handleChange.bind(this)}
          />
          <TouchableHighlight
            style={styles.btnStyle}
            onPress={this.handleSubmit.bind(this)}>
            <GradientBtn name="Enregistrer" />
          </TouchableHighlight>
        </View>
      </View>
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
