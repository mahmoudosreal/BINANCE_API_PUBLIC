const crypto = require('crypto');
require('dotenv').config();

/**
 * get symbol price
 * @param {*} symbol 
 */
async function getTickerPrice(symbol) {
    try {
        const priceFetch = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        const priceBody = await priceFetch.json();
        return parseFloat(priceBody.price);
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
}

async function makeTrade(symbol, price, action, quantity, tim) {
    try {

        const apiKey = process.env.BINANCE_API_KEY;
        const apiSecret = process.env.BINANCE_API_SECRET;
        console.log(apiKey, apiSecret)
        const endpoint = 'https://api.binance.com/api/v3/order';
        const timestamp = Date.now();
        const params = {
            symbol,
            side : action,
            type:'LIMIT',
            quantity,
            price,
            timestamp,
            timeInForce: tim
        };
        console.log(params);
        
        let queryString = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');
        console.log(queryString);

        const signature = crypto.createHmac('sha256', apiSecret)
        .update(queryString)
        .digest('hex');
        
        queryString+='&signature='+signature;
        const url = endpoint+'?'+queryString;
        console.log(url);

        const request = await fetch(url, {
            method: 'POST',
            headers: {
                'X-MBX-APIKEY': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const response = await request.json();
        return response;
    } catch (error) {
        console.error('Error: ', error);
    }
}

(async()=> {
    const symbol = 'BTCFDUSD';
    const price = await getTickerPrice(symbol);
    console.log(price);
    const action = 'SELL'; //SELL or BUY
    const quantity = 0.00028; //10/price;
    console.log(quantity);
    const transaction = await makeTrade(symbol, price, action, quantity, 'FOK');
    console.log(transaction);
}) ()