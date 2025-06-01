import { PrimaryColumn } from 'typeorm';
export default abstract class Entity {
  @PrimaryColumn({ name: 'Id', type: 'uuid' })
  id?: string;
}
