'use strict';

import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput, AppRegistry, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

let STORAGE_PREFIX = '@QarSyncManagerFiles:configs:'; // const value = await AsyncStorage.getItem('@QarSyncManagerFiles:configs:');

const settingsPageIconIcon = (<Icon name="cogs" size={60} color="#708090" />)
const configArr = [
    {label: 'Qar Ip', option: 'qarIp', valueText:'1234.4321.1.12'},
    {label: 'Qar login http auth', option: 'qarLoginHttpAuthorizationd', valueText:'myLoginHttpAuth'},
    {label: 'qarPassHttpAuth', option: 'qarPassHttpAuth', valueText:'myPassHttp***'},
    {label: 'syncServerIp', option: 'syncServerIp', valueText:'7890.987.3.21'},
    {label: 'syncServerLogin', option: 'syncServerLogin', valueText:'myLoginServer'},
    {label: 'syncServerPass', option: 'syncServerPass', valueText:'myPassServer****'},
];

class Settings extends React.Component {
  constructor(props) {
      super(props);

      let stateValues = {};

      configArr.forEach((currentValue) => {
           stateValues[currentValue.option] = currentValue.valueText;
      });

      this.state = stateValues;
  }
  buildOptions(){
    let configInputs = [];
    let that = this;

      configArr.forEach((currentValue) => {
             configInputs.push(that.putTextInput(currentValue.label, currentValue.option, currentValue.valueText));
      });

    return(configInputs);
  };

  onButtonPress(){

    async getterAndTakingInList ()
    {
        for (var i = 0; i < this.props.configArr; i++) {
            try {
                var value = await AsyncStorage.getItem(STORAGE_PREFIX + i);
                if (value !== null) {
                    this.state.push(JSON.parse(value));
                }
            } catch (error)  {
                Alert.alert('Gettinf files list error');
            }
        }

      // Error saving data
    }

    //Alert.alert(this.state.qarIp + ' ' + this.state.qarLoginHttpAuthorizationd  );
  }
  handleChange(event, option)
  {
    this.setState({
        [option]: event.target.value
    });
  }

  putTextInput(label, option, valueText) {
    return(
      <View>
        <Text style={styles.inscription} key={option+'text'} > { label }:</Text>
           <TextInput
              key={option} value={this.state[option]} onChange={ (e) => this.handleChange(e, option) } //onChangeText={(text) => this.saveData(text)}
           />
      </View>
    );
  }

    render() {
      let options = this.buildOptions();
        var Actions = this.props.routes;
        return (
          <View style={ styles.container }>
            <View style={ styles.settingsPage }>
              <Text>{settingsPageIconIcon}</Text>
              <Text>Settings page</Text>
                <View style={ styles.buttons } >
                  <Button onPress={ Actions.home } title={ this.props.btnText }>Go home</Button>
                  <Button onPress={this.onButtonPress.bind(this)} title="Save" />
                </View>
            </View>
               <View >
                 { options }
               </View>
          </View>
       );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#efef55',
    },
  buttons:{
    flex:1,
    flexDirection: 'column',
    },
  settingsPage:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    },
    text: {
   color: 'black',
 },
  });


module.exports = Settings;
