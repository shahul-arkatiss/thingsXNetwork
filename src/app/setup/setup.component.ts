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
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';

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


  basicSetupFormGroup = this._formBuilder.group({
    fullName: ['', Validators.required],
    companyName: ['', Validators.required],
    firstCtrl: ['', Validators.required],
    emailId: ['', Validators.required],
    mobileNum: ['', Validators.required],
    address: ['', Validators.required],
    usersInvite: ['', Validators.required],
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
  fullName: any
  usersInvite: any
  address: any
  mobileNum: any
  companyName: any
  emailId: any
  orgJson: any[] = []
  purchaseData: any;

  constructor(private cdr: ChangeDetectorRef,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snack: MatSnackBar,
    private service: ApiService
  ) {
    console.log(sessionStorage.getItem("address"))
    this.address = sessionStorage.getItem("address")
    this.companyName = sessionStorage.getItem("company_name")
    this.fullName = sessionStorage.getItem("full_name")
    this.emailId = sessionStorage.getItem("email")
    this.mobileNum = sessionStorage.getItem("telephone")
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
    const val = sessionStorage.getItem("address")
    console.log(sessionStorage.getItem("address"))

    this.getHierarcy()
    this.getOrgMaster()
    // this.getPurchaseInventory()
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
    this.items.unshift(value);
    this.itemControls.unshift(new FormControl(value));
    this.addNewControl.reset();
    console.log(this.itemControls)
  }
  onCreateOrgMasterData(value: any) {
    console.log(value)
    console.log(this.ngtest)
  }
  delete(index: any) {
    this.itemControls.splice(index, 1);

    console.log(this.itemControls[0].value)
  }
  handler(item: any) {
    console.log("from ", item.previousIndex, " to ", item.currentIndex);
    this.moveItem(item.previousIndex, item.currentIndex, item);
  }
  moveItem(fromIndex: any, toIndex: any, event: any) {
    const element = this.itemControls[fromIndex];
    this.itemControls.splice(fromIndex, 1);
    this.itemControls.splice(toIndex, 0, element);
    console.log(event)
    console.log(this.itemControls)
  }
  saveOrgStructureConfigData() {
    this.itemControls.map((menu: any, index: any) => {
      this.orgJson.push({
        "level_name": menu.value,
        "level_description": "",
        "ref_level_id": index + 1
      })
    })
    const body = {
      "user_id": sessionStorage.getItem("user_id"),
      "company_id": sessionStorage.getItem("company_id"),
      "email_id": sessionStorage.getItem("email"),
      "hierarchy": this.orgJson
    }
    this.service.saveOrgConfigData(body).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.status == "success") {
          this.snack.open(res.message, 'Ok', { duration: 3000 });
          this.getHierarcy()
        } else {
          this.snack.open(res.message, 'Ok', { duration: 3000 });
        }
      },
      (err) => {
        this.spinner.hide();
        this.snack.open(err, 'Ok', { duration: 3000 });
      })
  }
  getOrgMaster() {
    const body = {
      "company_id": parseInt(sessionStorage.getItem("company_id")!),
    }
    this.service.getOrgMaster(body).subscribe(
      (res) => {
        this.spinner.hide();

        if (res.data.status == "success") {
          console.log(res)
          // this.ngtest = res.data.data
          let arr = [
          ]
          this.colData = res.data.data.column_names
          res.data.data.column_names.map((item: any) => {
            arr.push({ field: item, header: item, visible: true })
          })
          arr.push({ field: 'actions', header: 'Actions', visible: true, type: 'actions' })
          this.colData = arr
          this.filteredData = res.data.data.data
          this.snack.open(res.message, 'Ok', { duration: 3000 });
          // res.data.data.map((menu: any) => {

          //   const value: any = menu.level_name
          //   this.items.unshift(value);
          //   this.itemControls.unshift(new FormControl(value));
          //   this.addNewControl.reset();
          //   console.log(this.itemControls)
          // })
        } else {
          this.snack.open(res.message, 'Ok', { duration: 3000 });

        }
      },
      (err) => {
        this.spinner.hide();

        this.snack.open(err, 'Ok', { duration: 3000 });
      })
  }
  getHierarcy() {
    const body = {
      "company_id": parseInt(sessionStorage.getItem("company_id")!),
    }
    this.service.getHierarcyData(body).subscribe(
      (res) => {
        this.spinner.hide();

        if (res.data.status == "success") {
          console.log(res)
          this.ngtest = res.data.data

          this.snack.open(res.message, 'Ok', { duration: 3000 });
          res.data.data.map((menu: any) => {

            const value: any = menu.level_name
            this.items.unshift(value);
            this.itemControls.unshift(new FormControl(value));
            this.addNewControl.reset();
            console.log(this.itemControls)
          })
        } else {
          this.snack.open(res.message, 'Ok', { duration: 3000 });

        }
      },
      (err) => {
        this.spinner.hide();

        this.snack.open(err, 'Ok', { duration: 3000 });
      })
  }
  getPurchaseInventory() {
    const body = {
      "company_id": parseInt(sessionStorage.getItem("company_id")!),
    }
    this.service.getPurchaseInventory(body).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.data.status == "success") {
          this.purchaseData = res.data.data
          this.snack.open(res.message, 'Ok', { duration: 3000 });

        } else {
          this.snack.open(res.message, 'Ok', { duration: 3000 });

        }
      },
      (err) => {
        this.spinner.hide();

        this.snack.open(err, 'Ok', { duration: 3000 });
      })
  }
  createOrgMasterData(e: any) {
    let orgData: any[] = []
    this.ngtest.map((item: any) => {
      orgData.push({
        "entity_name": item.level_description,
        "level_id": item.level_id,
        "address_id": 6,
        "ref_entity_id": item.ref_level_id
      })
    })
    const body = {
      "user_id": sessionStorage.getItem("user_id"),
      "company_id": sessionStorage.getItem("company_id"),
      "email_id": sessionStorage.getItem("email"),
      "org_master": orgData
    }
    this.service.createOrgMaster(body).subscribe(
      (res) => {
        this.spinner.hide();
        if (res.status == "success") {
          this.getOrgMaster()

          this.snack.open(res.message, 'Ok', { duration: 3000 });
        } else {
          this.snack.open(res.message, 'Ok', { duration: 3000 });
        }
      },
      (err) => {
        this.spinner.hide();
        this.snack.open(err, 'Ok', { duration: 3000 });
      })
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
