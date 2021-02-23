import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
  public labels2: string[] = ['Tienda', 'Domicilio', 'Digital'];
  public data3 = [
    [70, 10, 20]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
