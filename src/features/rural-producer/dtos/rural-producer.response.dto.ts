import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RuralProducerReponseDto {
  @ApiProperty({
    description: 'ID do produtor rural',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Nome do produtor rural',
    example: 'João da Silva',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Documento do produtor rural',
    example: '123.456.789-00',
  })
  @Expose()
  cpfOrCnpj: string;

  @ApiProperty({
    description: 'Data de criação do produtor rural',
    example: '2025-06-01T02:16:34.188Z',
  })
  @Expose()
  creationTime: Date;

  @ApiProperty({
    description: 'Data de última modificação do produtor rural',
    example: '2025-06-01T02:16:34.188Z',
  })
  @Expose()
  lastModificationTime: Date;
}
