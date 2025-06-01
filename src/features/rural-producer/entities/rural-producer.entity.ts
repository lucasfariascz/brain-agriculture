import { PropertyEntity } from '../../property/entities/property.entity';
import FullAuditedEntity from '../../../shared/database/full-audited-entity';
import { Entity, Column, Index, OneToMany } from 'typeorm';

@Entity('RuralProducer')
export class RuralProducerEntity extends FullAuditedEntity {
  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'CpfOrCnpj' })
  @Index({ unique: true })
  cpfOrCnpj: string;

  @OneToMany(() => PropertyEntity, (property) => property.ruralProducer)
  properties: PropertyEntity[];
}
