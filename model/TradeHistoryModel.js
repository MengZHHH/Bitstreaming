const db = require('./model');
const trade_collection = db.get('BitCoinPrice');
const APIError = require('../rest').APIError;

class TradeCollection {
    async get(ctx) {

        let date = ctx.params.date.split('-');

        console.table(date)

        let trade_result;
        if (date != null){
            trade_result = await trade_collection.aggregate([
                {$match:{'date': {$lte: new Date(date[0], date[1]-1, date[2]-0+1)}}},
                {$project:
                        {
                            '_id':0,
                            'id':1,
                            'Vol_date': {$dateToString: {format: '%d/%m/%Y', date: '$date'}},
                            'Volume':'$Volume(BTC)', 'Weighted_price': 1}},
                {$sort:{'id': -1}},
                {$limit: 10}]);
        } else {
            throw new APIError('test error', 'test error');
        }
        ctx.rest(trade_result);
    }
}

module.exports = new TradeCollection();