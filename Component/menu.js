import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import FirstRoutes from './Firstroute.js';
import SecondRoutes from './Secondroute.js';

 
const FirstRoute = () => 
    <FirstRoutes />;



const SecondRoute = () => 
    <SecondRoutes />;
 
export default class FirstPage extends PureComponent {
  state = {
    index: 0,
    data: false,
    newData: '',
    routes: [
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
    ],
  };

  scannedDataGQR = data =>{
    this.setState({newData: data})
  }
 
  _handleIndexChange = index => this.setState({ index });
 
  _renderHeader = props => <TabBar {...props} />;
 
  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });
 
  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});