import { IsNotEmpty, IsString } from 'class-validator';
import { IsCPFOrCNPJ } from '../../../shared/config/validators/is-cpf-or-cnpj.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRuralProducerDto {
  @ApiProperty({
    description: 'Nome do produtor rural',
    example: 'João da Silva',
  })
  @IsNotEmpty({ message: 'Nome não informado.' })
  @IsString({ message: 'Nome inválido. Informe um nome válido.' })
  name: string;

  @ApiProperty({
    description: 'Documento do produtor rural',
    example: '123.456.789-00',
  })
  @IsNotEmpty({ message: 'Documento não informado.' })
  @IsCPFOrCNPJ({
    message: 'Documento inválido. Informe um CPF ou CNPJ válido.',
  })
  cpfOrCnpj: string;
}
