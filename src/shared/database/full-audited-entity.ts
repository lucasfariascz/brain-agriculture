import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import Entity from './entity';

export default abstract class FullAuditedEntity extends Entity {
  @CreateDateColumn({ name: 'CreationTime', type: 'timestamp' })
  creationTime: Date;

  @UpdateDateColumn({
    name: 'LastModificationTime',
    type: 'timestamp',
    nullable: true,
  })
  lastModificationTime?: Date;

  @DeleteDateColumn({ name: 'DeletionTime', type: 'timestamp', nullable: true })
  deletionTime?: Date;
}
