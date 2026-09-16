const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");


const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Account must be associated with a user"],
        index: true
    },
    status: {
        type: String,
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can be either ACTIVE, FROZEN or CLOSED",
        },
        default: "ACTIVE"
    },
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account" ],
        default: "INR"
    }
}, {
    timestamps: true
})

accountSchema.index({user: 1, status: 1})

accountSchema.method.getBalance = async function () {

    const balanceData = await ledgerModel.aggregate([
        {$match: {accout: this._id}},
        {
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                       $cond: [
                        { $eq: ["$type", "DEBIT"] },
                        "$amount",
                        0
                       ] 
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [
                        { $eq: ["$type", "CREDIT"] },
                        "$amount",
                        0
                        ] 
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                balnce: { $subtract: ["$totalCredit", "$totalD"] }
            }
        }
    ])

    if (balanceData.length === 0) {
        return 0
    }

    return balanceData[0].balnce
}

const accountModel = mongoose. model("account", accountSchema)

module. exports = accountModel