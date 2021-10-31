import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Record, IRecord } from './mongooseSchema';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = 3011; // default port to listen

const dbUri = 'mongodb://localhost:27017/memoryGamePortfolio';
mongoose.connect(dbUri, (err: mongoose.Error) => {
  if (err) console.log(err);
  console.log(`Successfuly connected to ${dbUri}`);
  return;
});

/* Working saving example */
// let newRecord = new Record({
//   nick: 'Tom',
//   time: 10
// });

// newRecord.save({}, (err: any, product: IRecord) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(product);
//   return;
// });

// define a route handler for the default home page
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello world!');
});

app.get('/top_10_records', (req: express.Request, res: express.Response) => {
  Record.find()
    .sort({ time: 'asc' })
    .limit(10)
    .exec()
    .then(result => res.send(result));
});

app.post('/new_record', (req: express.Request, res: express.Response) => {
  let nick = req.body.nick;
  let time = req.body.time;

  let newRecord = new Record({
    nick,
    time
  });

  newRecord.save({}, (err: any, product: IRecord) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(product);
    res.send(product);
    return;
  });

  //send response to client
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
