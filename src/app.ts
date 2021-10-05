require('dotenv').config();
import express from 'express';
import { db } from './models';
import { router } from './routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);
app.listen(PORT, async () => {
  await db.sequelize.sync();
  console.log(`Server is up on ${PORT} http://localhost:${PORT}`);
});
