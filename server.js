/*
 * @Author: Suraj Roy
 * @Date:   10 September 2019
 * @Source : https://jsonworld.com/
 * @Topic : integrate cardConnect with Node.js
 */        


const axios = require('axios');
 
const paymentCredential = new Buffer('testing:testing123').toString('base64');
 
const getPaymentAuthToken = async (data) => {
 
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${paymentCredential}`
			}
		};
		const URL = 'https://fts.cardconnect.com:6443/cardconnect/rest/auth';
		return await axios.put(URL, data, config);

	} catch (error) {
		throw (error);
	}
}
 
const makeCharge = async (data) => {
 
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${paymentCredential}`
			}
		};
 
		const URL = 'https://fts.cardconnect.com:6443/cardconnect/rest/capture';
 		return await axios.put(URL, data, config);
 
	} catch (error) {
		throw (error);
	}
}
 
(async() => {
	const paymentRequest = await getPaymentAuthToken({
		account: '4444333322221111',
		merchid: '496160873888',
		amount: '1000', // for charging $1.00
		expiry: '1260',
		currency: 'USD'
	});
 
	const charge = await makeCharge({
		merchid: paymentRequest.data.merchid, 
		retref: paymentRequest.data.retref
	});
 	console.log(charge);
 
})();
