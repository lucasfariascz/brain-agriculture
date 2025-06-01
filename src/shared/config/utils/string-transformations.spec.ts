import { join } from 'path';
import { isNotNullOrUndefined } from './string-transformations';

describe('isNotNullOrUndefined', () => {
  it('should return true for non-null and non-undefined values', () => {
    expect(isNotNullOrUndefined(0)).toBe(true);
    expect(isNotNullOrUndefined('')).toBe(true);
    expect(isNotNullOrUndefined(false)).toBe(true);
    expect(isNotNullOrUndefined([])).toBe(true);
    expect(isNotNullOrUndefined({})).toBe(true);
  });

  it('should return false for null', () => {
    expect(isNotNullOrUndefined(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isNotNullOrUndefined(undefined)).toBe(false);
  });
});

describe('isNotNullOrUndefined', () => {
  it('should return true for non-null and non-undefined values', () => {
    console.log(
      join(__dirname, '..', '..', '..', '..', 'migrations', '*.{ts,js}'),
    );
    console.log(join(__dirname, '..', '..', '..', '**', '*.entity.{ts,js}'));
    console.log(
      join(
        '/home/lucasfarias/projetos/brain-agriculture/migrations',
        '*.{ts,js}',
      ) === join(__dirname, '..', '..', '..', '..', 'migrations', '*.{ts,js}'),
    );
  });
});
