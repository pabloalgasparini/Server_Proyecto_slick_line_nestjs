export default () => ({
    port : parseInt(process.env.PORT, 10) || 3000,
    mongodb_uri : process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/refsa',
    secret: process.env.JWT_SECRET || "fernet"
})
