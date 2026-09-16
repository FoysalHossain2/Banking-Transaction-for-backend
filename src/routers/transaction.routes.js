const { Router } = require( 'express');
const authMidleware = require('../middleware/auth.middleware');


const transactionRoutes = Router();

/**
* - POST /api/transactions/
* - Create a new transaction
*/

transactionRoutes. post("/")

module.exports = transactionRoutes;