var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

const authKey = 'auth';
const userKey = 'user';

class AuthService {
	getAuthInfo(cb){
		// Remove credentials
		// let keys = [authKey, userKey];
		// AsyncStorage.multiRemove(keys, (err) => {
		//
		// });
		AsyncStorage.multiGet([authKey, userKey], (err, val)=> {
			if (err){
				return cb(err);
			}
			if (!val){
				return cb();
			}

			// var zippedObj = _.zipObject(val);
			//
			// if (!zippedObj[authKey]){
			// 	return cb();
			// }
			if(val[0][1] == null || val[1][1] == null){
				return cb();
			}

			var authInfo = {
				header: {
					'Authorization' : 'Basic ' + val[0][1]
				},
				user: JSON.parse(val[1][1])
			}

			return cb(null, authInfo);
		});
	}
	login(creds, cb){
		var b = new buffer.Buffer(creds.username +
				':' + creds.password);
			var encodedAuth = b.toString('base64');
			//console.log(b.toString('base64'));

			fetch('https://api.github.com/user',{
				headers: {
					'Authorization' : 'Basic ' + encodedAuth
				}
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
			.then((results)=> {
				console.log(results);
				AsyncStorage.multiSet([
						[authKey, encodedAuth],
						[userKey, JSON.stringify(results)]
					], (err)=> {
						if(err){
							throw err;
						}
					});
				return cb({success: true});
			})
			.catch((err)=> {
				//console.log('logon failed:' + err);
				return cb(err);
			});
	}
}

module.exports = new AuthService();
