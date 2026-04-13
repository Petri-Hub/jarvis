import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../../../prisma/infrastructure/prisma.repository';
import {
  TruckRepository,
  CreateTruckData,
  UpdateTruckData,
} from '../../domain/repositories/truck.repository';
import { Truck } from '../../domain/entities/truck.entity';
import { TruckFilters } from '../../domain/entities/truck-filters.entity';
import { TruckSort } from '../../domain/entities/truck-sort.entity';
import { TruckPersistenceError } from '../../domain/errors/truck-persistence.error';
import { Page } from '../../../shared/domain/entities/page.entity';

@Injectable()
export class PrismaTruckRepository implements TruckRepository {
  constructor(private readonly prisma: PrismaRepository) {}

  async create(data: CreateTruckData): Promise<Truck> {
    try {
      const created = await this.prisma.truck.create({
        data,
        select: {
          id: true,
          licensePlate: true,
          brand: true,
          model: true,
          year: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.mapToDomain(created);
    } catch (error) {
      throw new TruckPersistenceError({ cause: error });
    }
  }

  async searchAll(
    page: number,
    size: number,
    filters: TruckFilters,
    sort: TruckSort,
  ): Promise<Page<Truck>> {
    try {
      const searchFilter = filters.search?.trim()
        ? {
            OR: [
              { licensePlate: { contains: filters.search, mode: 'insensitive' as const } },
              { brand: { contains: filters.search, mode: 'insensitive' as const } },
              { model: { contains: filters.search, mode: 'insensitive' as const } },
            ],
          }
        : undefined;

      const where = searchFilter ?? {};
      const skip = page * size;
      const orderBy = sort.field
        ? { [sort.field]: sort.order ?? 'asc' }
        : { createdAt: 'desc' as const };

      const [records, totalItems] = await Promise.all([
        this.prisma.truck.findMany({
          where,
          skip,
          take: size,
          orderBy,
          select: {
            id: true,
            licensePlate: true,
            brand: true,
            model: true,
            year: true,
            createdAt: true,
            updatedAt: true,
          },
        }),
        this.prisma.truck.count({ where }),
      ]);

      const totalPages = Math.ceil(totalItems / size);

      return {
        content: records.map((record) => this.mapToDomain(record)),
        current: page,
        size,
        navigation: {
          hasNext: page + 1 < totalPages,
          hasPrevious: page > 0,
        },
        totals: {
          items: totalItems,
          pages: totalPages,
        },
      };
    } catch (error) {
      throw new TruckPersistenceError({ cause: error });
    }
  }

  async findById(id: number): Promise<Truck | null> {
    try {
      const truck = await this.prisma.truck.findUnique({
        where: { id },
        select: {
          id: true,
          licensePlate: true,
          brand: true,
          model: true,
          year: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return truck ? this.mapToDomain(truck) : null;
    } catch (error) {
      throw new TruckPersistenceError({ cause: error });
    }
  }

  async findByLicensePlate(licensePlate: string): Promise<Truck | null> {
    try {
      const truck = await this.prisma.truck.findUnique({
        where: { licensePlate },
        select: {
          id: true,
          licensePlate: true,
          brand: true,
          model: true,
          year: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return truck ? this.mapToDomain(truck) : null;
    } catch (error) {
      throw new TruckPersistenceError({ cause: error });
    }
  }

  async update(id: number, data: UpdateTruckData): Promise<Truck> {
    try {
      const updated = await this.prisma.truck.update({
        where: { id },
        data,
        select: {
          id: true,
          licensePlate: true,
          brand: true,
          model: true,
          year: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return this.mapToDomain(updated);
    } catch (error) {
      throw new TruckPersistenceError({ cause: error });
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prisma.truck.delete({
        where: { id },
      });
    } catch (error) {
      throw new TruckPersistenceError({ cause: error });
    }
  }

  private mapToDomain(prismaTruck: {
    id: number;
    licensePlate: string;
    brand: string;
    model: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
  }): Truck {
    return {
      id: prismaTruck.id,
      licensePlate: prismaTruck.licensePlate,
      brand: prismaTruck.brand,
      model: prismaTruck.model,
      year: prismaTruck.year,
      createdAt: prismaTruck.createdAt,
      updatedAt: prismaTruck.updatedAt,
    };
  }
}
