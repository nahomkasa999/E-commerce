//mongodb://nahomugr209817:a@ac-pbxtcvu-shard-00-00.452mvql.mongodb.net:27017,ac-pbxtcvu-shard-00-01.452mvql.mongodb.net:27017,ac-pbxtcvu-shard-00-02.452mvql.mongodb.net:27017/?replicaSet=atlas-6kgwr4-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=QuickCard

import mongoose from "mongoose";

if(!cached){
    cached = global.mongoose = {conn: null, promise: null}
}

async function  connectDB() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands:false

        }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then(mongoose => {return mongoose})
    }

    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB()