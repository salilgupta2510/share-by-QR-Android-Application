import React from 'react';
import { TouchableHighlight, Share,Text, TextInput, Button, View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

class SecondRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '',
            text_height:50,
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

      changeHeight(old,newHeight)
      {
        if(newHeight>old)
            return newHeight;
        else
            return old;
      }

    render() {
        return (
            <View style={{flex:1,marginTop:20}}>
                <View style={{margin:10}}>
                    <TextInput
                        underlineColorAndroid={'rgba(0,0,0,0)'}
                        placeholder="Type here to encode!"
                        onContentSizeChange={(e) => this.setState({text_height:this.changeHeight(50,e.nativeEvent.contentSize.height)})}
                        style={{height:this.state.text_height,marginTop:10,fontSize:25}}
                        multiline={true}
                        onChangeText={this.setResult}
                        value={this.state.result}
                    />
                </View>

                {this.state.result ? 
                    <View style={{alignItems:"center",justifyContent:"center",flex:1}}> 
                        <QRCode value={this.state.result} size={250}/> 
                    </View> 
                : false}       

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
      marginBottom:20,
      borderRadius: 5
    }
});
export default SecondRoutes;