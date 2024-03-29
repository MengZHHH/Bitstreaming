const db = require('./model');
const trade_collection = db.get('BitCoinPrice');
const APIError = require('../rest').APIError;

class tradeChartModel {
    async get(ctx){
        let range = ctx.params.dataRange;
        let arrayResult = [];

        if (range == 'all') {
            let queryResult = await trade_collection.aggregate([
                {$project:{'_id': 0,
                        'Vol_date': {$dateToString: {format: '%Y-%m-%d', date: '$date'}},
                        'open': '$open_price', 'high':'$high_price', 'low': '$low_price',
                        'close': '$close_price',
                        'volume': '$Volume(BTC)'}},{$sort:{'Vol_date': 1}}]);

            for (let item in queryResult){
                let singleRecord =[];
                // console.log(queryResult[item])
                for (let key in queryResult[item]){
                    // console.log(queryResult[item][key]);
                    singleRecord.push(queryResult[item][key]);
                }
                arrayResult.push(singleRecord);
            }
        } else {
            throw new APIError('test error', 'test error');
        }

        ctx.rest(arrayResult);
    }
}

module.exports = new tradeChartModel();