import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, OnDestroy {
  public intervalSubscription: Subscription;

  constructor() {
    /* this.returnObs().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('Subs:', valor),
      error => console.warn('Error:', error),
      () => console.info('Observable terminado')
    ); */
    this.intervalSubscription = this.returnInterval().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  returnInterval(): Observable<number> {
    return interval(100).pipe(take(3), map(valor => valor + 1), filter(valor => (valor % 2 === 0) ? true : false));
  }

  returnObs(): Observable<number> {
    let i = 0;
    return new Observable<number>(observer => {
      const INTERVALO = setInterval( () => {
        i++;
        observer.next(i);

        if (i === 5) {
          clearInterval(INTERVALO);
          observer.complete();
        }

        if (i === 2) {
          observer.error('I ha llegado a 2');
        }
      }, 1000);
    });
  }
}
