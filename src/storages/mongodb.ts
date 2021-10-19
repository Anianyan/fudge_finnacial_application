import config from 'config';
import mongoose, { CallbackWithoutResult } from 'mongoose';

const connection: string = config.get('db.connection');
const options: any = config.get('db.options');

export const mongoInit = () => {
  mongoose.connect(connection, options);

  mongoose.connection.on('error', (error) => {
    // eslint-disable-next-line no-console
    console.error('error', error);
  });

  mongoose.connection.on('open', () => {
    // eslint-disable-next-line no-console
    console.log('connection opened');
  });
}
