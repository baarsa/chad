import App from './App'

const app = new App();
const port = +process.env.PORT || 8000;
app.listen(port);