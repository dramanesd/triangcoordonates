import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Entypo';

import {View, Text, ScrollView, Image, StyleSheet, Platform} from 'react-native';

const Badge = () => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 1, y: 0}}
    colors={['#4527A0', '#7B1FA2']}
    style={styles.gradient}>
    <Image source={require('../../assets/img/dra.png')} style={styles.avatar} />
    <Text style={styles.headerTitle}>Dramane DOUMBIA</Text>
    <Text style={styles.headerSubTitle}>Bamako, Mali</Text>
  </LinearGradient>
);

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Badge />
      </View>
      <View style={styles.profileSeparator}>
        <Text style={styles.profileSeparatorText}>PROFILE</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.roleText}>Dévelppeur Web et Mobile, Freelance</Text>
        <View style={styles.separator} />
        <View style={styles.iconStyle}>
          <Icon type={'Entypo'} name={'globe'} size={20} color={'#fff'} />
          <Text style={styles.contentText}>www.dramane-doumbia.ml</Text>
        </View>
        <View style={styles.iconStyle}>
          <Icon type={'Entypo'} name={'github'} size={20} color={'#fff'} />
          <Text style={styles.contentText}>Github/dramanesd</Text>
        </View>
        <View style={styles.iconStyle}>
          <Icon type={'Entypo'} name={'email'} size={20} color={'#fff'} />
          <Text style={styles.contentText}>ddramane63@gmail.com</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#261136',
  },
  content: {
    height: '100%',
    padding: 20,
    backgroundColor: '#261136',
  },
  headerTitle: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: 13,
  },
  gradient: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  profileSeparator: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#431C60',
  },
  profileSeparatorText: {
    color: '#A648EB',
  },
  separator: {
    height: 1,
    backgroundColor: '#8B8B8B',
    marginTop: 5,
    marginBottom: 15,
  },
  roleText: {
    color: '#AAB5E0',
    marginBottom: 10,
  },
  contentText: {
    color: '#fff',
    margin: 10,
  },
  iconStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
});

export default About;
