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
    //this.fetchFeed = this.fetchFeed.bind(this);

  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
      dataSource: ds.cloneWithRows([])
		};
    // this.fetchFeed();
	}

  componentDidMount(){
    this.fetchFeed();
    // this.setState({
    //   //dataSource: this.state.dataSource.cloneWithRows(feedItems)
    //   test: 'rishab'
    // });
  }

  fetchFeed = () => {
    this.setState({test:false});
      require('./AuthService').getAuthInfo((err, authInfo)=> {
        var url = 'https://api.github.com/users/'
            + authInfo.user.login
            + '/received_events';

            fetch(url, {
              headers: authInfo.header
            })
            .then((response)=> {
              if(response.status >= 200 && response.status < 300){
                return response;
              }

              throw {
                badCredentials: response.status == 401,
                unknownError: response.status != 401
              }
            })
            .then((response)=> {
              return response.json();
            })
            .then((responseData)=>{
               var feedItems = responseData.filter((ev)=> ev.type == 'PushEvent');
              this.setState({
                 dataSource: this.state.dataSource.cloneWithRows(feedItems)
              });
            })
            .catch((err)=> {
              console.log('Failed' + err);
            })
      })
  }

renderRow(rowData){
  return <Text style={{
      color: '#333',
      backgroundColor:'#fff',
      alignSelf:'center'
    }}>
    {rowData.actor.login}
  </Text>
}
	render(){
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}
        />
      </View>
    );

  }
}

module.exports = Feed;
