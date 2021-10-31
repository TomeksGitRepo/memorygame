"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongooseSchema_1 = require("./mongooseSchema");
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
const port = 8080; // default port to listen
const dbUri = 'mongodb://localhost:27017/memoryGameKot';
mongoose_1.default.connect(dbUri, (err) => {
    if (err)
        console.log(err);
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
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.get('/top_10_records', (req, res) => {
    mongooseSchema_1.Record.find()
        .sort({ time: 'asc' })
        .limit(10)
        .exec()
        .then(result => res.send(result));
});
app.post('/new_record', (req, res) => {
    let nick = req.body.nick;
    let time = req.body.time;
    let newRecord = new mongooseSchema_1.Record({
        nick,
        time
    });
    newRecord.save({}, (err, product) => {
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
//# sourceMappingURL=index.js.map