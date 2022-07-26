import app from './app'
import './database';

const PORT = 5050



const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}`) 
}) 

export default server;