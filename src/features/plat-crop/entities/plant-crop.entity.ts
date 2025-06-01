import { PropertyEntity } from '../../property/entities/property.entity';
import FullAuditedEntity from '../../../shared/database/full-audited-entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { HarvestEntity } from '../../harvest/entities/harvest.entity';

@Entity({ name: 'PlantCrop' })
export class PlantCropEntity extends FullAuditedEntity {
  @Column({ name: 'Name' })
  name: string;

  @ManyToOne(() => PropertyEntity, (property) => property.plantCrops)
  property: PropertyEntity;

  @ManyToOne(() => HarvestEntity, (harvest) => harvest.plantCrops)
  harvest: HarvestEntity;
}
