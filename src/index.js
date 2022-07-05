import app from './app';
import './database';



const server = app.listen(5050)
console.log ('Server listen', 5050)

export default server;