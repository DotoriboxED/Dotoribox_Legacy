import {CustomerDTO} from "../models/dto/customerDTO";
import db from "../models";
import {ReviewNotFoundError} from "../tool/errorException";

export default {
    async getCustomer (customerDto: CustomerDTO, query: Record<string, any>) {
        const sortType: {[index: string]: any} = { desc: -1, asc: 1}

        const sort: Record<string, unknown> = {};

        Object.keys(query).map(elem => {
            if (query[elem] === 'asc' || query[elem] === 'desc')
                sort[elem] = sortType[query[elem]]
        });

        sort.createdAt = -1;

        return db.Customer.aggregate([{
            $match: customerDto.getObject()
        }, {
            $lookup: {
                from: 'samples',
                localField: 'sampleId',
                foreignField: 'id',
                as: 'sample'
            }
        }, {
            $sort: sort
        }]);
    },

    async createCustomer (customerDto: CustomerDTO) {
        return await db.Customer.create(customerDto);
    },

    async evaluate (customerDto: CustomerDTO, customerId: number) {
        const result = db.Customer.findOneAndUpdate({
            id: customerId
        }, customerDto.getObject(), {
            new: true
        });

        if (!result)
            throw new ReviewNotFoundError();

        return result;
    }
}