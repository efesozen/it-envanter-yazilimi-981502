import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Supplier } from './supplier.entity';

@Entity({ name: 'inventory_items' })
export class Inventoryitem extends BaseEntity {
  @Column()
  name!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'integer' })
  quantity!: number;

  @Column({ unique: true })
  @Index('idx_inventory_items_barcode', { unique: true })
  barcode!: string;


@Column({ name: 'supplier_id' })
  supplier_id!: string;

  @Index('idx_inventory_items_supplier_id')
  @ManyToOne('Supplier', 'inventoryitems')
  @JoinColumn({ name: 'supplier_id' })
  supplier!: Supplier;
}
