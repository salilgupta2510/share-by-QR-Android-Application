import React, { PureComponent } from 'react';
import { View, StyleSheet} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import FirstRoutes from './Firstroute.js';
import SecondRoutes from './Secondroute.js';

const FirstRoute = () => <FirstRoutes />

const SecondRoute = () => <SecondRoutes />
 
export default class FirstPage extends PureComponent {
  state = {
    index: 0,
    data: false,
    newData: '',
    routes: [
      { key: '1', title: 'Decode' },
      { key: '2', title: 'Encode' },
    ],
  };

  scannedDataGQR = data =>{
    this.setState({newData: data})
  }
 
  _handleIndexChange = index => this.setState({ index });
 
  _renderFooter = props => 
  <TabBar
    {...props} 
   indicatorStyle={styles.indicator}
   style={styles.tabbar} />;
 
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
        renderFooter={this._renderFooter}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
  },
  indicator: {
    backgroundColor: '#ffffff',
  },
});