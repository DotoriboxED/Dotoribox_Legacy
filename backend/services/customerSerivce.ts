import {CustomerDTO} from "../models/dto/customerDTO";
import db from "../models";
import {ReviewNotFoundError} from "../tool/errorException";

export default {
    async getCustomer (customerDto: CustomerDTO, option: Record<string, unknown>) {
        return db.Customer.find(option).sort(option);
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