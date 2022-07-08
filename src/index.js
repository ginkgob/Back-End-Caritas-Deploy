import app from '../app';
import './database';

const PORT = process.env.PORT || 5050



const server = app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`) 
}) 

export default server;