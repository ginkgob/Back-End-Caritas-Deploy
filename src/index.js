import app from './app'
import './database';

const PORT = process.env.PORT || 5050



const server = app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`) 
}) 

export default server;