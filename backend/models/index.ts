import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import isWsl from 'is-wsl';
import dns from 'dns';

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

const db = {} // Input Database Object Here

export default db;