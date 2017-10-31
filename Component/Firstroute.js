import React from 'react';
import {TouchableHighlight, Share, Button, Text, View, StyleSheet } from 'react-native';
import ScannerApp from './scanner.js';
import CheckBox from 'react-native-check-box';
import ScannedResults from './scannedResults.js';

class FirstRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkboxFlag: true,
            buttonFlag: true,
            scannerData: '',
            textToSearch: '',
            textToRecieve: false,
        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.buttonPress = this.buttonPress.bind(this);
        this.scanned = this.scanned.bind(this);
        this._shareTextMessage=this._shareTextMessage.bind(this);
        this._showResult=this._showResult.bind(this);
        
        

    }
    onCheckboxChange() {
        this.setState({ checkboxFlag: !this.state.checkboxFlag });
    }
    buttonPress() {
        this.setState({ buttonFlag: !this.state.buttonFlag, textToRecieve: this.props.textTrue })

    }

    scanned(data) {
        this.buttonPress();
        this.setState({ scannerData: data });

    }
    searchGoogle(url){
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
              Linking.openURL(url);
            }
          });
    }

    _shareTextMessage () {
        Share.share({
          message: this.state.scannerData.data
        })
        .then(this._showResult)
        .catch(err => console.log(err))
      }
      _showResult (result) {
        console.log(result)
      }
    render() {
        return (
            <View style={[styles.container, { backgroundColor: '#fff' }]} >
                {this.state.buttonFlag ? <ScannerApp scanned={this.scanned} /> :
                    <ScannedResults ifText={this.ifText} scannedData={this.state.scannerData.data} browserFlag={this.state.checkboxFlag} />}
                {this.state.buttonFlag ? <CheckBox
                    style={{ flex: 1, padding: 10 }}
                    onClick={() => this.onCheckboxChange()}
                    isChecked={this.state.checkboxFlag}
                    leftText={"Open the link in the Default Browser"}
                /> : false}

                {!this.state.buttonFlag ? 
                    <View style={styles.container}>
                    <TouchableHighlight onPress={this.buttonPress}>
                    <View style={styles.button}>
                            <Text>Scan Again</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._shareTextMessage}>
                        <View style={styles.button}>
                            <Text>Click to share message</Text>
                        </View>
                    </TouchableHighlight>
                    </View>  : false}
                   
                </View>
                );
    }
}
const styles = StyleSheet.create({  
    container: {
      flex: 1,
      
    },
    button: {
      backgroundColor: '#76c9f8',
      padding: 10,
      margin: 10,
      borderRadius: 5
    }
});
export default FirstRoutes;