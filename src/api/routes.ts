import  path from 'path';
import { parse } from '../services/FileHandler.service';
import { AverageSellingPriceBySellerTypeCalulator } from '../domain/AverageSellingPriceBySellerTypeCalulator';
import { UploadedFile } from 'express-fileupload';
import { currencyConverter } from '../transformers/CurrencyTransformer';
import * as redis  from '../util/RedisClient';

export const getIndexHTML = (app:any ) => {
  app.get( '/', ( _req: any, res: { sendFile: (arg0: string) => void; } ) => {
    res.sendFile(path.join(__dirname + '/html/index.html'));
  });
};

export const upload = (app:any) => {
  app.post('/upload', (req: { files: { sampleFile?: any; }; },res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): any; new(): any; }; json: { (arg0: { err: any; }): void; new(): any; }; }; }) => {
    try{
      let sampleFile = null;
      let uploadPath = '';
      
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      sampleFile = req.files.sampleFile as UploadedFile;
      uploadPath = __dirname + '/data/' + sampleFile.name;
      sampleFile.mv(uploadPath);
      parse(uploadPath)
        .then(async () => { 
          await AverageSellingPriceBySellerTypeCalulator();
        }).catch( err => { console.error(err);});
      return res.status(200).send('File Uploaded');
    }catch (err){
      res.status(500).json({ err: err });
    }
  });
};

export const getAveragesBySellerType = (app:any) => {
  app.get('/average/price/by_seller_type', async (_req: any,res: { status: (arg0: number) => { (): any; new(): any; jsonp: { (arg0: any): void; new(): any; }; json: { (arg0: { err: any; }): void; new(): any; }; }; }) => {
    try{
      const averages = await redis.get('averages');
      const avg = JSON.parse(averages.toString());
      currencyConverter(avg);
      res.status(200).jsonp(avg);
    } catch (err){
      res.status(500).json({ err: err });
    }
  });
};