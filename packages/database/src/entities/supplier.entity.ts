import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'suppliers' })
export class Supplier extends BaseEntity {
  @Column()
  @Index('idx_suppliers_name')
  name!: string;

  @Column({ type: 'jsonb', nullable: true })
  contact_info?: Record<string, unknown>;

}
