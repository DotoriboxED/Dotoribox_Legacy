import db from "../models";

export default {
    async mostCommonCustomer (sampleId: number) {
        const result = await db.Customer.aggregate([{
            $match: {
                sampleId
            }
        }, {
            $group: {
                _id: {
                    age: '$age',
                    isMale: '$isMale'
                },
                count: {
                    $sum: 1
                }
            }
        }, {
            $group: {
                _id: {
                    age: '$_id.age',
                    isMale: '$_id.isMale'
                },
                count: {
                    $first: '$count'
                }
            }
        }, {
            $sort: {
                count: -1
            }
        }]);

        return result;
    }
}