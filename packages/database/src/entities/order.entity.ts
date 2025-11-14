import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { InventoryItem } from './inventory-item.entity';
import type { User } from './user.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @Column({ type: 'integer' })
  quantity!: number;

  @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'] })
  @Index('idx_orders_status')
  status!: 'pending' | 'completed' | 'cancelled';


@Column({ name: 'user_id' })
  user_id!: string;

  @Index('idx_orders_user_id')
  @ManyToOne('User', 'orders')
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Column({ name: 'inventory_item_id' })
  inventory_item_id!: string;

  @Index('idx_orders_inventory_item_id')
  @ManyToOne('InventoryItem', 'orders')
  @JoinColumn({ name: 'inventory_item_id' })
  inventoryItem!: InventoryItem;
}
