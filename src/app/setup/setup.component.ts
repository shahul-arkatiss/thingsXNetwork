import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef, Component, ViewChild, inject } from '@angular/core';
import { ColDef, SideBarDef } from 'ag-grid-community';
// import { fabric } from 'fabric';
import * as go from "gojs";
import 'ag-grid-enterprise';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
} from 'ng-apexcharts';
import { EditableColumn } from 'primeng/table';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent {
  name = 'Mars';
  items: any[] = []
  itemControls: any = this.items.map(item => new FormControl(item));
  addNewOrgMasterData: any = new FormControl('');
  addNewControl: any = new FormControl('');
  private _formBuilder = inject(FormBuilder);
  title = 'thingsX-Network';
  value: any;
  // 192.1680.112:8000
  isLoading: any = false;
  rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true, EditableColumn: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false, editable: true },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];
  filteredData = this.rowData
  catalog = [{
    img: "../../assets/images/Edit.svg",
    name: "Depth Camera",
    desc: "",
    quantity: "",
    addImge: "../../assets/images/add.svg"
  },
  {
    img: "../../assets/images/Edit.svg",
    name: "CCTV Camera",
    desc: "",
    quantity: "",
    addImge: "../../assets/images/add.svg"
  }]
  quantity: any
  qunatityValues: any = [
    {
      value: 1,

    },
    {
      value: 2,
    },
    {
      value: 3,
    }
  ];
  // Column Definitions: Defines the columns to be displayed.
  colDefs: ColDef[] = [
    { field: 'make', headerName: "Name" },
    { field: 'model', headerName: "Name" },
    { field: 'price', headerName: "Name" },
    { field: 'electric', headerName: "Name" },
  ];
  colData: any[] = [
    { field: 'make', header: 'Role ID', visible: true },
    { field: 'model', header: 'Email', visible: true },
    { field: 'price', header: 'Created By', visible: true },
    { field: 'electric', header: 'Created Date', visible: true },
    { field: 'actions', header: 'Actions', visible: true, type: 'actions' },
  ];


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  thingsXManageFormGroup = this._formBuilder.group({
    nodeDesc: ['', Validators.required],
    nodeName: ['', Validators.required],

  });
  orgMasterDataUploadForm: FormGroup;

  // orgMasterDataUploadForm:any = this._formBuilder.group({
  //   divisionName: ['', Validators.required],
  //   companyName: ['', Validators.required],
  //   warehouseName: ['', Validators.required],
  // });
  isLinear = false;
  nodes: any[] = [
    {
      name: ""
    }
  ]
  chartOptions: any
  // wallSize = 200;

  // updateWallSize() {
  //   // Update the size of the wall
  //   const activeObject = this.canvas.getActiveObject();
  //   if (activeObject && activeObject.type === 'rect') {
  //     activeObject.set({ width: this.wallSize });
  //     this.canvas.renderAll();
  //   }
  // }
  // addWall() {
  //   const wall = new fabric.Rect({
  //     left: 100,
  //     top: 100,
  //     fill: '#8B4513',  // Brown color for walls
  //     width: 200,
  //     height: 10,
  //     selectable: true
  //   });

  //   this.canvas.add(wall);
  // }

  // // Add a door to the floor plan
  // addDoor() {
  //   const door = new fabric.Rect({
  //     left: 200,
  //     top: 150,
  //     fill: '#8B0000',  // Red color for doors
  //     width: 50,
  //     height: 10,
  //     selectable: true
  //   });

  //   this.canvas.add(door);
  // }

  // // Add a window to the floor plan
  // addWindow() {
  //   const window = new fabric.Rect({
  //     left: 150,
  //     top: 200,
  //     fill: '#4682B4',  // Blue color for windows
  //     width: 60,
  //     height: 10,
  //     selectable: true
  //   });

  //   this.canvas.add(window);
  // }
  constructor(private cdr: ChangeDetectorRef
  ) {
    // this.canvas = new fabric.Canvas('floor-plan-canvas');
    this.orgMasterDataUploadForm = this._formBuilder.group({
      formData: this._formBuilder.array([])
    });
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
  updateDom() {
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }
  deleteRecord(i: any) {
  }
  editRecord(i: any) {
  }
  controlCount: number = 0;
  ngtest: any[] = []
  onAddNewSubmit() {
    const value: any = this.addNewControl.value
    console.log(value)
    this.ngtest.push({key:value,value:''})
    console.log(this.ngtest)
    this.items.unshift(value);
    this.itemControls.unshift(new FormControl(value));
    this.addNewControl.reset();
    console.log(this.itemControls)
    // let obj={}
    // this.itemControls.map((item:any) => {
    //  Object.assign(obj,{[item.value]:['', Validators.required]})
    // })
    // this.orgMasterDataUploadForm = this._formBuilder.group(obj);
  }
  onCreateOrgMasterData(value: any) {
    console.log(value)
    console.log(this.ngtest)
    // this.items.unshift(value);
    // this.itemControls.unshift(new FormControl(value));
    // this.addNewControl.reset();
  }
  delete(index: any) {
    this.itemControls.splice(index, 1);
    this.ngtest.splice(index, 1);

    console.log(this.itemControls[0].value)
  }
  handler(item: any) {
    console.log("from ", item.previousIndex, " to ", item.currentIndex);
    this.moveItem(item.previousIndex, item.currentIndex,item);
  }
  moveItem(fromIndex: any, toIndex: any,event:any) {
    const element = this.itemControls[fromIndex];
    this.itemControls.splice(fromIndex, 1);
    this.itemControls.splice(toIndex, 0, element);
    const element2 = this.ngtest[fromIndex];
    this.ngtest.splice(fromIndex, 1);
    this.ngtest.splice(toIndex, 0, element2);
  }

  createOrgMasterData(e: any) {
    console.log(this.orgMasterDataUploadForm.value)
    console.log(this.ngtest)

  }
  addtoTable(event: any, index: any) {

    // this.catalog[index].quantity = this.quantity
    let qty = Number(this.catalog[index].quantity)
    console.log(event, index, qty)
    for (let i = 0; i < qty; i++) {
      this.rowData.push({
        make: this.catalog[index].name, model: 'Model Y', price: 64950, electric: true
      })
    }
  }
}
