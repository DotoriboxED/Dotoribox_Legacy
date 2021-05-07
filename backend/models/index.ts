import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment'
import dotenv from 'dotenv';
import path from 'path';
import isWsl from 'is-wsl';
import dns from 'dns';

import Customers from './schema/customer';

dotenv.config({ path: path.join(process.cwd(), '.env') });

mongoose.Promise = global.Promise;

if (isWsl) {
    mongoose.connect('mongodb://' + dns.getServers()[0] +':27017/' + process.env.MONGO_DBNAME, 
    {
        auth: {
            user: process.env.MONGO_USERNAME as string,
            password: process.env.MONGO_PASSWORD as string
        }, 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    })
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));
} else { 
    mongoose.connect(process.env.MONGO_URI as string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
}

mongoose.set('useCreateIndex', true);
autoIncrement.initialize(mongoose.connection);

const db = {...Customers(autoIncrement)} // Input Database Object Here

export default db;