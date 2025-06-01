import { RuralProducerEntity } from '../../rural-producer/entities/rural-producer.entity';
import FullAuditedEntity from '../../../shared/database/full-audited-entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { PlantCropEntity } from '../../plat-crop/entities/plant-crop.entity';

@Entity('Property')
export class PropertyEntity extends FullAuditedEntity {
  @Column({ name: 'FarmName' })
  farmName: string;

  @Column({ name: 'FarmCity' })
  farmCity: string;

  @Column({ name: 'FarmState' })
  farmState: string;

  @Column({
    name: 'TotalAreaHectares',
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  totalAreaHectares: number;

  @Column({
    name: 'ArableAreaHectares',
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  arableAreaHectares: number;

  @Column({
    name: 'VegetationAreaHectares',
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  vegetationAreaHectares: number;

  @ManyToOne(() => RuralProducerEntity, (producer) => producer.properties)
  ruralProducer: RuralProducerEntity;

  @OneToMany(() => PlantCropEntity, (plantCrop) => plantCrop.property)
  plantCrops: PlantCropEntity[];
}
