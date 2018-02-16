import React from 'react';
import {Clipboard, TouchableOpacity, Button, TextInput, Linking,StyleSheet, Text, View } from 'react-native';

class ScannedResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bFlag: false,
      text: false,    
    };
    this.buttonFlag=this.buttonFlag.bind(this);
    // this.generateFunction=this.generateFunction.bind(this);
    this.generateText=this.generateText.bind(this);
    this.searchGoogle=this.searchGoogle.bind(this);
    this.onCopy=this.onCopy.bind(this);
  }
  
  openBrowser = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  buttonFlag(){
    // this.setState({bFlag: !this.state.bFlag})
    this.openBrowser(this.props.scannedData.trim());    
  }
 
  searchGoogle(){
    this.state.link="https://www.google.co.in/search?q="+ this.props.scannedData.trim().replace(/ /g, '+')
    console.log(this.state.link);
    this.openBrowser(this.state.link);
  }

  onCopy(){
    Clipboard.setString(this.props.scannedData.trim());
  }

  generateText(){
    return(
      this.props.browserFlag && this.validateURL(this.props.scannedData) 
      ? this.openBrowser(this.props.scannedData.trim().replace(/ /g, '+')) : <TextInput
      multiline={true}
      numberOfLines={4}
      onChangeText={() => {}}
      value={this.props.scannedData}
    />
    );
  }

  validateURL = (scannedData) => {
    var pattern = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
    return pattern.test(scannedData.trim());
  }



  render() {
    return (
      <View style={{flex:1}}>
        {/* { this.props.browserFlag && !this.validateURL(this.props.scannedData) ? this.generateText() : false} */}
        {this.props.browserFlag === false  ? <TouchableOpacity onPress={this.buttonFlag}>
      <View style={styles.button}>
              <Text>Open in Browser</Text>
          </View>
      </TouchableOpacity>: false}

      <View style={{flex:1,padding:10,alignItems:"center",justifyContent:"center",backgroundColor:"#222"}}>
        <Text style={{color:"#ffffff",fontSize:30}}>{this.props.scannedData}</Text>
      </View>

        {this.props.scannedData.trim().length > 15 ? <TouchableOpacity onPress={this.searchGoogle}>
            <View style={styles.button}>
                    <Text>Search in Google</Text>
                </View>
            </TouchableOpacity> : false}
            {this.props.scannedData.trim().length > 15 ? <TouchableOpacity onPress={this.onCopy}>
            <View style={styles.button}>
                    <Text>Copy to ClipBoard</Text>
                </View>
            </TouchableOpacity> : false}
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
    elevation:5,
    margin: 10,
    alignItems:"center",
    borderRadius: 5
  }
}); 
export default ScannedResults;