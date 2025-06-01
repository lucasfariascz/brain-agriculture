import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

interface RequestWithTransaction extends Request {
  transactionId?: string;
}

@Injectable()
export class TransactionMiddleware implements NestMiddleware {
  use(req: RequestWithTransaction, res: Response, next: NextFunction) {
    const transactionId = (req.headers['transaction-id'] as string) || uuidv4();

    req.transactionId = transactionId;

    res.setHeader('transaction-id', transactionId);

    res.locals.transactionId = transactionId;

    next();
  }
}
