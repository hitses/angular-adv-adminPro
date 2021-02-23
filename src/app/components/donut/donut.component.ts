import { Component, Input, OnInit } from '@angular/core';

import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donut',
  templateUrl: './donut.component.html',
  styleUrls: ['./donut.component.scss']
})
export class DonutComponent implements OnInit {
  @Input() title = 'Sin título';
  @Input('labels') doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [20, 30, 50]
  ]
  
  public colors: Color[] = [
    {backgroundColor: ['#EBBD00', '#FF5800', '#63037B']}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
