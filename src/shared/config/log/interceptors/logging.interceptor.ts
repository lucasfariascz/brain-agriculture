import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';

interface RequestWithTransaction extends Request {
  transactionId?: string;
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<RequestWithTransaction>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();

    this.logRequest(request);

    return next.handle().pipe(
      tap((data) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        this.logResponse(request, response, data, duration, 'SUCCESS');
      }),
      catchError((error) => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        this.logResponse(request, response, error, duration, 'ERROR');

        throw error;
      }),
    );
  }

  private logRequest(request: RequestWithTransaction) {
    const logData = {
      transactionId: request.transactionId,
      method: request.method,
      url: request.url,
      userAgent: request.get('User-Agent'),
      ip: request.ip,
      headers: this.sanitizeHeaders(request.headers),
      query: request.query,
      params: request.params,
      body: this.sanitizeBody(request.body),
      timestamp: new Date().toISOString(),
    };

    this.logger.log({
      message: 'Incoming Request',
      ...logData,
    });
  }

  private logResponse(
    request: RequestWithTransaction,
    response: Response,
    data: any,
    duration: number,
    status: 'SUCCESS' | 'ERROR',
  ) {
    const logData = {
      transactionId: request.transactionId,
      method: request.method,
      url: request.url,
      statusCode: response.statusCode,
      duration: `${duration}ms`,
      responseData:
        status === 'SUCCESS' ? this.sanitizeResponseData(data) : undefined,
      error: status === 'ERROR' ? this.sanitizeError(data) : undefined,
      timestamp: new Date().toISOString(),
    };

    if (status === 'SUCCESS') {
      this.logger.log({
        message: 'Outgoing Response',
        ...logData,
      });
    } else {
      this.logger.error({
        message: 'Response Error',
        ...logData,
      });
    }
  }

  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };

    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];
    sensitiveHeaders.forEach((header) => {
      if (sanitized[header]) {
        sanitized[header] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;

    const sanitized = { ...body };

    const sensitiveFields = ['password', 'token', 'secret', 'apiKey'];
    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  private sanitizeResponseData(data: any): any {
    if (!data) return data;

    const jsonString = JSON.stringify(data);
    if (jsonString.length > 10000) {
      return {
        message: 'Response data too large for logging',
        size: jsonString.length,
        preview: JSON.stringify(data).substring(0, 500) + '...',
      };
    }

    return data;
  }

  private sanitizeError(error: any): any {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      status: error.status,
    };
  }
}
