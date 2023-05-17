import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
   console.log('loading .env');
   dotenv.config();
}

import { app } from './app.mjs';


/**
 * Αν υπάρχει η μεταβλητή περιβάλλοντος 'PORT' χρησιμοποίησε την τιμή της,
 * αλλιώς χρησιμοποίησε τη θύρα 3000.
 */
const port = process.env.PORT || '3000';

const server = app.listen(port, () => {
   console.log(`Listening to http://127.0.0.1:${port}`);
});

process.on('SIGTERM', () => {
   console.info('SIGTERM signal received.');
   console.log('Closing http server.');
   server.close(() => {
      console.log('Http server closed.');
   });
});

// connecting to the database
const model = await import(`./model/${process.env.MODEL}/${process.env.MODEL}.mjs`);
