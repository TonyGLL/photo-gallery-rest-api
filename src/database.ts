import mongoose, { connect } from 'mongoose';

export async function connection() {

    await connect('mongodb://localhost/photo-gallery-api', {

        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log('Database is connected');
};