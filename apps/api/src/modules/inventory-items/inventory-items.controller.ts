import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateInventoryitemDto, InventoryitemResponseDto, UpdateInventoryitemDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InventoryitemsService } from './inventoryitems.service';

@Controller('inventoryitems')
@UseGuards(JwtAuthGuard)
export class InventoryitemsController {
  constructor(private readonly inventoryitemsService: InventoryitemsService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<InventoryitemResponseDto[]> {
    return this.inventoryitemsService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<InventoryitemResponseDto> {
    return this.inventoryitemsService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateInventoryitemDto,
    @CurrentUser() user: User
  ): Promise<InventoryitemResponseDto> {
    return this.inventoryitemsService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInventoryitemDto,
    @CurrentUser() user: User
  ): Promise<InventoryitemResponseDto> {
    return this.inventoryitemsService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.inventoryitemsService.remove(id, user.id);
  }
}
