const { Router } = require( 'express');
const authMidleware = require('../middleware/auth.middleware');
const transactionController = require("../controllers/transaction.controller");


const transactionRoutes = Router();

/**
* - POST /api/transactions/
* - Create a new transaction
*/

transactionRoutes. post("/", authMidleware.authMiddleware, transactionController.createTransaction)

module.exports = transactionRoutes;