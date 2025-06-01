import { Entity, Column, OneToMany } from 'typeorm';
import FullAuditedEntity from '../../../shared/database/full-audited-entity';
import { PlantCropEntity } from '../../plat-crop/entities/plant-crop.entity';

@Entity({ name: 'Harvest' })
export class HarvestEntity extends FullAuditedEntity {
  @Column({ name: 'Year', type: 'integer' })
  year: number;

  @Column({ name: 'Text', type: 'text', default: 'Safra' })
  text: string;

  @OneToMany(() => PlantCropEntity, (plantedCrop) => plantedCrop.harvest)
  plantCrops: PlantCropEntity[];
}
