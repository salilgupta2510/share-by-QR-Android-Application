import React from 'react';
import {TouchableOpacity, Share, Button, Text, View, StyleSheet } from 'react-native';
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

    componentWillMount()
    {

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
            <View style={[styles.container, { backgroundColor: '#fff',flex:1}]}>
                {this.state.buttonFlag ? <ScannerApp scanned={this.scanned} /> :
                    <View style={{marginTop:20,flex:1}}>
                        <ScannedResults ifText={this.ifText} scannedData={this.state.scannerData.data} browserFlag={this.state.checkboxFlag} />
                     </View>
                 }
                   
                {this.state.buttonFlag ? <CheckBox
                    style={{ flex: 1, padding: 10 }}
                    onClick={() => this.onCheckboxChange()}
                    isChecked={this.state.checkboxFlag}
                    leftText={"Open the link in the Default Browser"}
                /> : false}

                {!this.state.buttonFlag ? 
                    <View style={styles.container}>
                    <TouchableOpacity onPress={this.buttonPress}>
                    <View style={styles.button}>
                            <Text>Re-Scan</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._shareTextMessage}>
                        <View style={styles.button}>
                            <Text>Share as a message</Text>
                        </View>
                    </TouchableOpacity>
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
      backgroundColor: '#ffffff',
      padding: 10,
      margin: 10,
      elevation:5,
      borderRadius: 5,
      alignItems:"center",
    }
});
export default FirstRoutes;