import { Expose, Type } from 'class-transformer';
import { RuralProducerReponseDto } from './rural-producer.response.dto';
import { PropertyResponseDto } from '../../property/dtos/property.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RuralProducerWithPropertyResponseDto extends RuralProducerReponseDto {
  @ApiProperty({
    description: 'Propriedades',
    example: [{ name: 'Fazenda 1', city: 'São Paulo', state: 'SP' }],
  })
  @Expose()
  @Type(() => PropertyResponseDto)
  properties: PropertyResponseDto[];
}
