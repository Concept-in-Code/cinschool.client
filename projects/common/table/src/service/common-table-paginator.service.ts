import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CommonTablePaginatorService extends MatPaginatorIntl {

  public override itemsPerPageLabel = 'Anzahl pro Seite: ';

  public override nextPageLabel = 'Nächste Seite';

  public override previousPageLabel = 'vorherige Seite';

  public override firstPageLabel = 'Erste Seite';

  public override lastPageLabel = 'Letzte Seite';

  public override getRangeLabel: (
    page: number,
    size: number,
    count: number
  ) => string = (
    page: number,
    size: number,
    count: number
  ) => {
    if (count !== 0 && size !== 0) {
      count = Math.max(count, 0);
      const start = page * size;
      const end = start < count ? Math.min(start + size, count) : start + size;

      return `${start + 1} - ${end} / ${count}`;
    }

    return '0 / 0';
  }

}
