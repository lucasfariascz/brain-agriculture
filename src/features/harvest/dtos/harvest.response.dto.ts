import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class HarvestResponseDto {
  @ApiProperty({
    description: 'ID da safra',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Ano da safra',
    example: 2021,
  })
  @Expose()
  year: number;

  @ApiProperty({
    description: 'Texto da safra',
    example: 'Safra',
  })
  @Expose()
  text: string;

  @ApiProperty({
    description: 'Data de criação da safra',
    example: '2025-06-01T02:16:34.188Z',
  })
  @Expose()
  creationTime: Date;

  @ApiProperty({
    description: 'Data de última modificação da safra',
    example: '2025-06-01T02:16:34.188Z',
  })
  @Expose()
  lastModificationTime: Date;
}
