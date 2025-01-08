import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChangeDetectorRef, Component, ViewChild,inject } from '@angular/core';
import { ColDef, SideBarDef } from 'ag-grid-community';
// import { fabric } from 'fabric';

import 'ag-grid-enterprise';
import { Router } from '@angular/router';
@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss'
})
export class ConfigurationsComponent {
  private _formBuilder = inject(FormBuilder);
  isLoading:any=false; 
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];
  filteredData=this.rowData

  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make',headerName:"Name" },
    { field: 'model',headerName:"Name"  },
    { field: 'price',headerName:"Name"  },
    { field: 'electric',headerName:"Name"  },
  ];
  colData: any[] = [
    { field: 'make', header: 'Role ID', visible: true },
    { field: 'model', header: 'Email', visible: true },
    { field: 'price', header: 'Created By', visible: true },
    { field: 'electric', header: 'Created Date', visible: true },
    { field: 'actions', header: 'Actions', visible: true, type: 'actions'},
    // { field: 'chipsColumns', header: 'chipsColumns', visible: true,type:'chipsColumns'},
  ];

  orgMasterDataUploadForm = this._formBuilder.group({
    divisionName: ['', Validators.required],
    companyName: ['', Validators.required],
    warehouseName: ['', Validators.required],
  });
  chartOptions:any

  constructor(private cdr: ChangeDetectorRef,public router: Router,
  ) {
    // this.canvas = new fabric.Canvas('floor-plan-canvas');

    this.chartOptions = {
      series: [
        {
          name: 'Net Profit',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
          name: 'Revenue',
          data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
          name: 'Free Cash Flow',
          data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          // endingShape: "rounded"
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
        ],
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return '$ ' + val + ' thousands';
          },
        },
      },
    };
  }
  selectedVal = "Organization Master Data"

  onValChange(val: string) {
    this.selectedVal = val
    console.log(this.selectedVal)
    if (val == "Home") {
      this.router.navigate(['/home']);

    } else if (val == "Configurations") {
      this.router.navigate(['/configuration']);
    }
  }
  updateDom() {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }
  deleteRecord(i:any){

  }
  editRecord(i:any){

  }
}
