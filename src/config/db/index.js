const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://vinhtrung:htvtrung@cluster0.fxjiokz.mongodb.net/?retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Fail to connect to MongoDB', error);
    }
}

module.exports = { connect };
