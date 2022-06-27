import app from './app';
import './database';



const server = app.listen(5000)
console.log ('Server listen', 5000)

export default server;