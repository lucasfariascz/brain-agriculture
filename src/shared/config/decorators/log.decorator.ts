import { Logger } from '@nestjs/common';

export function LogExecution(
  logInput: boolean = true,
  logOutput: boolean = true,
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    const logger = new Logger(target.constructor.name);

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      const transactionId = (this as any).request?.transactionId || 'unknown';

      try {
        if (logInput) {
          logger.log({
            message: `Method ${propertyKey} started`,
            method: propertyKey,
            class: target.constructor.name,
            args: args.length > 0 ? args : undefined,
            transactionId,
            timestamp: new Date().toISOString(),
          });
        }

        const result = await originalMethod.apply(this, args);
        const duration = Date.now() - startTime;

        if (logOutput) {
          logger.log({
            message: `Method ${propertyKey} completed successfully`,
            method: propertyKey,
            class: target.constructor.name,
            duration: `${duration}ms`,
            result: result,
            transactionId,
            timestamp: new Date().toISOString(),
          });
        }

        return result;
      } catch (error) {
        const duration = Date.now() - startTime;

        logger.error({
          message: `Method ${propertyKey} failed`,
          method: propertyKey,
          class: target.constructor.name,
          duration: `${duration}ms`,
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
          transactionId,
          timestamp: new Date().toISOString(),
        });

        throw error;
      }
    };

    return descriptor;
  };
}
