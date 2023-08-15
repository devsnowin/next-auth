import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL!);
        const conn = mongoose.connection;

        conn.on('connected', () =>
            console.log('MongoDB connected successfully'),
        );
        conn.on('error', (err) => {
            console.log('MongoDB connection error: ', err);
            process.exit(1);
        });
    } catch (error) {
        console.error('Error in connecting to database: ', error);
    }
};
