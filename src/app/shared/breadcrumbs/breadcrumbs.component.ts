import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(
    private router: Router
  ) {
    this.getRouteData();
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  ngOnInit(): void {
  }

  getRouteData() {
    this.tituloSubs$ =  this.router.events.pipe(
      pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
    ).subscribe(
      ({titulo}) => {
        this.titulo = titulo;
        document.title = `AdminPro - ${titulo}`;
      }
    );
  }
}
