import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TruckController } from './presentation/rest/truck.controller';
import { CreateTruckUseCase } from './application/use-cases/create-truck.usecase';
import { SearchTrucksUseCase } from './application/use-cases/search-trucks.usecase';
import { FindTruckByIdUseCase } from './application/use-cases/find-truck-by-id.usecase';
import { UpdateTruckUseCase } from './application/use-cases/update-truck.usecase';
import { DeleteTruckUseCase } from './application/use-cases/delete-truck.usecase';
import { PrismaTruckRepository } from './infrastructure/repositories/prisma-truck.repository';
import { TruckRepository } from './domain/repositories/truck.repository';
import { TruckControllerMapper } from './presentation/rest/truck.controller.mapper';

@Module({
  imports: [PrismaModule],
  controllers: [TruckController],
  providers: [
    {
      provide: TruckRepository,
      useClass: PrismaTruckRepository,
    },
    CreateTruckUseCase,
    SearchTrucksUseCase,
    FindTruckByIdUseCase,
    UpdateTruckUseCase,
    DeleteTruckUseCase,
    TruckControllerMapper,
  ],
})
export class TrucksModule {}
