import * as winston from 'winston';

export const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(
    ({ timestamp, level, message, context, transactionId, ...meta }) => {
      return JSON.stringify({
        timestamp,
        level,
        message,
        context,
        transactionId,
        ...meta,
      });
    },
  ),
);
