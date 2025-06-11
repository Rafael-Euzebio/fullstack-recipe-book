import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { HttpException } from '@nestjs/common'
import { HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, catchError } from 'rxjs/operators';

type QueryParams = {
  s?: string;
  i?: string;
  a?: string;
  c?: string;
};



@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) { }

  getMany(params: QueryParams): Observable<any> {
    const endpoints: Record<keyof QueryParams, string> = {
      s: 'search.php?s=',
      i: 'filter.php?i=',
      a: 'filter.php?a=',
      c: 'filter.php?c=',
    };

    const priority: (keyof QueryParams)[] = ['i', 'a', 'c', 's'];

    const chosenKey =
      priority.find((key) => key !== 's' && !!params[key]) ??
      's';

    const queryValue = params[chosenKey] ?? '';
    const endpoint = endpoints[chosenKey] + encodeURIComponent(queryValue);
    const url = process.env.BASE_URL + endpoint;

    return this.httpService.get(url).pipe(
      map(response => response.data),
      catchError(error => {
        throw new HttpException('Failed to fetch recipes', HttpStatus.BAD_GATEWAY);
      }),
    );
  }

  getOne(id: string): Observable<any> {
    return this.httpService.get(`${process.env.BASE_URL}/lookup.php?i=${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        throw new HttpException('Failed to fetch recipe', HttpStatus.BAD_GATEWAY);
      }),
    )
  }
}

