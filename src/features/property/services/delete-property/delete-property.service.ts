import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRepository } from '../../repositories/property.repository';

@Injectable()
export class DeletePropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async execute(id: string): Promise<void> {
    const property = await this.propertyRepository.findById(id);

    if (!property) {
      throw new NotFoundException('Propriedade não encontrada');
    }

    await this.propertyRepository.delete(id);
  }
}
