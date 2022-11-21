import express, { Request, Response, NextFunction } from 'express';
import statusCodes from './statusCode';
import 'express-async-errors';

const app = express();

app.use(express.json());

const PORT = 8000;

app.get('/', (req, res) => {
  res.status(statusCodes.OK).send('Hello World!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  console.log(`name: ${name}`);

  switch (name) {
    case 'BadRequestError':
      res.status(statusCodes.BAD_REQUEST).json({ message });
      break;
    case 'ValidationError':
      res.status(statusCodes.BAD_REQUEST).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(statusCodes.NOT_FOUND).json({ message });
      break;
    case 'ConfictError':
      res.status(409).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
