const tradeHis = require('../model/TradeHistoryModel');
const tradeChart = require('../model/TradeChartModel');
const CBHis = require('../model/CoinbaseHistoryModel');
const CBChart = require('../model/CoinbaseChartModel');


const Router = require('koa-router');
const router = new Router();

const restAPI = '/api/';

router.get(restAPI + 'trade_his/:date', tradeHis.get);

router.get(restAPI + 'trade_chart/:dataRange', tradeChart.get);

//Coinbase
router.get(restAPI + 'trade_his2/:date', CBHis.get);

router.get(restAPI + 'trade_chart2/:dataRange', CBChart.get);

module.exports = router;