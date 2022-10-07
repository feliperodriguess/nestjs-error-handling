import { DatabaseError } from './DatabaseError';
import { PrismaClientError } from './PrismaClientError';
import { UniqueConstraintError } from './UniqueConstraintError';

export enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
}

export const handleDatabaseErrors = (
  prismaClientError: PrismaClientError,
): Error => {
  const { code, message } = prismaClientError;
  switch (code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(prismaClientError);

    default:
      return new DatabaseError(message);
  }
};

export const isPrismaError = (
  prismaClientError: PrismaClientError,
): boolean => {
  const { clientVersion, code, meta } = prismaClientError;
  return (
    typeof code === 'string' &&
    typeof clientVersion === 'string' &&
    (typeof meta === 'undefined' ||
      (typeof meta === 'object' &&
        (typeof meta.target === 'string' || typeof meta.target === 'object')))
  );
};
