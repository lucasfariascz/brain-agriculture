import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Request } from 'express';

interface RequestWithTransaction extends Request {
  transactionId?: string;
}

@Injectable({ scope: Scope.REQUEST })
export class LogService {
  private readonly logger = new Logger(LogService.name);

  constructor(
    @Inject(REQUEST) private readonly request: RequestWithTransaction,
  ) {}

  private getTransactionId(): string {
    return this.request.transactionId || 'unknown';
  }

  log(message: any, context?: string) {
    this.logger.log({
      message,
      transactionId: this.getTransactionId(),
      context,
      timestamp: new Date().toISOString(),
    });
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error({
      message,
      trace,
      transactionId: this.getTransactionId(),
      context,
      timestamp: new Date().toISOString(),
    });
  }

  warn(message: any, context?: string) {
    this.logger.warn({
      message,
      transactionId: this.getTransactionId(),
      context,
      timestamp: new Date().toISOString(),
    });
  }

  debug(message: any, context?: string) {
    this.logger.debug({
      message,
      transactionId: this.getTransactionId(),
      context,
      timestamp: new Date().toISOString(),
    });
  }

  verbose(message: any, context?: string) {
    this.logger.verbose({
      message,
      transactionId: this.getTransactionId(),
      context,
      timestamp: new Date().toISOString(),
    });
  }

  logBusinessOperation(operation: string, data: any, result?: any) {
    this.logger.log({
      message: `Business Operation: ${operation}`,
      operation,
      inputData: data,
      result,
      transactionId: this.getTransactionId(),
      timestamp: new Date().toISOString(),
    });
  }

  logPerformance(operation: string, duration: number, additionalData?: any) {
    this.logger.log({
      message: `Performance: ${operation}`,
      operation,
      duration: `${duration}ms`,
      transactionId: this.getTransactionId(),
      ...additionalData,
      timestamp: new Date().toISOString(),
    });
  }
}
