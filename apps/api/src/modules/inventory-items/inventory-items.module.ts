import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventoryitem } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { InventoryitemsController } from './inventoryitems.controller';
import { InventoryitemsService } from './inventoryitems.service';
import { InventoryitemsRepository } from './inventoryitems.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventoryitem]),
    DatabaseModule,
  ],
  controllers: [InventoryitemsController],
  providers: [InventoryitemsService, InventoryitemsRepository],
  exports: [InventoryitemsService],
})
export class InventoryitemsModule {}
