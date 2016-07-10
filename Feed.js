'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  ListView
} from 'react-native';

class Feed extends Component {
	constructor(props){
		super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
		this.state = {
      dataSource: ds.cloneWithRows(['row 1 ', 'row 2'])
		};
	}
	render(){
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text style={{color: '#333', backgroundColor:'#fff', alignSelf:'center'}}>{rowData}</Text>}
        />
      </View>
    );

  }
}

module.exports = Feed;
