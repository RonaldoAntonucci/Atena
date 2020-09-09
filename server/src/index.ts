import App from 'shared/app';

const app = new App();

app.start().then(() => app.listen(3333));
