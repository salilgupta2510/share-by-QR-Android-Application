import React from 'react';
import { TouchableHighlight, Share,Text, TextInput, Button, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

class SecondRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
        };
        this._shareTextMessage=this._shareTextMessage.bind(this);
        this._showResult=this._showResult.bind(this);
    }

    setResult = value => this.setState({ result: value });

    _shareTextMessage () {
        Share.share({
          message: this.state.result
        })
        .then(this._showResult)
        .catch(err => console.log(err))
      }
      _showResult (result) {
        console.log(result)
      }
    render() {
        return (
            <View >
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={this.setResult}
                    value={this.state.result}
                />
                {this.state.result ? <QRCode value={this.state.result} size={250} /> : false}
                
                    <TouchableHighlight onPress={this._shareTextMessage}>
                        <View style={styles.button}>
                            <Text>Click to share message</Text>
                        </View>
                    </TouchableHighlight>
              

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
export default SecondRoutes;