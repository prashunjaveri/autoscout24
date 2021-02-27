
import  * as cors  from 'cors';
import * as bodyParser  from 'body-parser';
import * as  morgan from 'morgan';
import * as routes from './api/routes';
import * as  exphbs  from 'express-handlebars';
import { currencyConverter } from './transformers/CurrencyTransformer';
import * as redis  from './util/RedisClient';
import fileUpload  from 'express-fileupload'; 
import express from 'express';
const app = express();

const port = process.env.PORT || 8000;

app.use(fileUpload({
  createParentPath: true
}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
routes.upload(app);
routes.getIndexHTML(app);
routes.getAveragesBySellerType(app);  

exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
    dealerAverage: function () { return 'avg'; },
    privateAverage: function () { return 'avg'; },
    othersAverage: function () { return 'avg'; }
  }
});

app.get('/reports/average/price/by_seller_type', async (_req,res) => {
  // retrun html here!
  try{
    const averages = await redis.get('averages');
    const avg = JSON.parse(averages.toString());
    currencyConverter(avg);
    res.render('home', {
      showTitle: true,
      helpers: {
        dealerAverage: function () { return avg.dealer; },
        privateAverage: function () { return avg.private; },
        othersAverage: function () { return avg.others; }
      }
    });
  } catch (err){
    res.status(500).json({ err: err });
  }
});

// start the Express server
app.listen( port, () => {
  console.log( `server started at http://localhost:${ port }` );
});

// 3. todo : write unit tests 
// 4. todo : add integration test
// 5. todo: code review 
// 6. todo: documentation 