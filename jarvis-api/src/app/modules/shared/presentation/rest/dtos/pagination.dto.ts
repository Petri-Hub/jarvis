import { ApiProperty } from '@nestjs/swagger';

export class PaginationNavigationDTO {
  @ApiProperty({ example: true })
  hasNext: boolean;

  @ApiProperty({ example: false })
  hasPrevious: boolean;
}

export class PaginationTotalsDTO {
  @ApiProperty({ example: 42 })
  items: number;

  @ApiProperty({ example: 3 })
  pages: number;
}

export class PaginationDTO {
  @ApiProperty({ example: 0 })
  page: number;

  @ApiProperty({ example: 20 })
  size: number;

  @ApiProperty({ type: PaginationNavigationDTO })
  navigation: PaginationNavigationDTO;

  @ApiProperty({ type: PaginationTotalsDTO })
  totals: PaginationTotalsDTO;
}
