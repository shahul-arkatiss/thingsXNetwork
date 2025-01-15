
import { ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as go from 'gojs';
import { Router } from 'gojs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-floor-planner',
  templateUrl: './floor-planner.component.html',
  styleUrl: './floor-planner.component.scss'
})
export class FloorPlannerComponent {
  @ViewChild('floor') floor!: ElementRef;

  // Items currently on the floor
  items: any[] = [

  ];


  // Palette of objects to add
  // palette: any[] = [
  //   { name: 'Wall', 
  //     width: 300, 
  //     height: 10 },
  //   { name: 'Table', width: 100, height: 50 },
  //   { name: 'Chair', width: 50, height: 50 },
  //   { name: 'Sofa', width: 150, height: 70 },
  // ];
  zoomFactor: number = 1; // Default zoom level (1 = 100%)
  zoomStep: number = 0.1; // Step for zoom in/out
  minZoom: number = 0.5; // Minimum zoom level (50%)
  maxZoom: number = 2; // Maximum zoom level (200%)

  palette: any[] = [
    {
      name: 'Wall',
      width: "",
      height: 300,
      img: '../../assets/images/Line.svg',
      val:""
    },
    {
      name: 'Doors 1',
      width: "",
      height: 300,
      img: '../../assets/images/Door_1.svg',
      val:""

    },
    {
      name: 'Doors 2',
      width: "",
      height: 300,
      img: '../../assets/images/Door_2.svg',
      val:""
    },
    {
      name: 'Doors 3',
      width: "",
      height: 300,
      img: '../../assets/images/Door_3.svg',
      val:""
    },

    {
      name: 'Doors 4',
      width: "",
      height: 300,
      img: '../../assets/images/Door_4.svg',
      val:""
    },
    // {
    //   name: 'Circle 1',
    //   width: 300,
    //   height: 300,
    //   img: '../../assets/images/Circle-1.svg'
    // },
    // {
    //   name: 'Circle 2',
    //   width: 300,
    //   height: 300,
    //   img: '../../assets/images/Circle-2.svg'
    // },
    {
      name: 'Loading Area',
      width: "",
      height: 300,
      img: '../../assets/images/Loading.svg',
      val:""

    },
    {
      name: 'Unloading Area', width: "", height: 300,
      img: '../../assets/images/unloading.svg',
      val:""

    },
    {
      name: 'Packing Area', width: "", height: 300,
      img: '../../assets/images/packages.svg',
      val:""

    }, {
      name: 'Shelfs', width: "", height: 300,
      img: '../../assets/images/Shelf.svg',
      val:""

    }, {
      name: 'Fork Lift', width: "", height: 300,
      img: '../../assets/images/Fork lift.svg',
      val:""

    }, {
      name: 'Coveyor Belts', width: "", height: 300,
      img: '../../assets/images/conveyor-belt.svg',
      val:""

    }, {
      name: 'Office', width: "", height: 300,
      img: '../../assets/images/Office.svg',
      val:""

    }, {
      name: 'Tucks', width: "", height: 300,
      img: '../../assets/images/Trucks.svg',
      val:""

    }, {
      name: 'Cold Storage', width: "", height: 300,
      img: '../../assets/images/cold-storage.svg',
      val:""

    },
    {
      name: 'input', width: "", height: 300,
      img: '../../assets/images/cold-storage.svg',
      val:""

    },
  ];
  configData: any[] = [
  ];

  selectedItem: any = null;
  draggingItem: any = null;
  resizingItem: any = null;
  offsetX: number = 0;
  offsetY: number = 0;

  selectedVal = "Organization Master Data"
  purchaseData: any;

    constructor(
      private spinner: NgxSpinnerService,
      private snack: MatSnackBar,
      private service: ApiService
    ) {
      this.getPurchaseInventory()
    }

    getPurchaseInventory() {
      const body = {
        "company_id": parseInt(sessionStorage.getItem("company_id")!),
      }
      this.service.getPurchaseInventory(body).subscribe(
        (res) => {
          
          this.spinner.hide();
          if (res.status == "success") {
            this.purchaseData = res.data
            this.purchaseData.map((item:any)=>{
             this.configData.push({
              name:item.product_name,
              width: "",
              height: 300,
              img: '../../assets/images/Line.svg',
              item
            }) 
            })
            console.log(this.configData)
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
  onValChange(val: string) {
    this.selectedVal = val
    console.log(this.selectedVal)
    if (val == "Home") {
      // this.router.navigate(['/home']);

    } else if (val == "Configurations") {
      // this.router.navigate(['/configuration']);
    }
  }

  zoomIn() {
    if (this.zoomFactor < this.maxZoom) {
      this.zoomFactor = parseFloat((this.zoomFactor + this.zoomStep).toFixed(2));
    }
  }

  zoomOut() {
    if (this.zoomFactor > this.minZoom) {
      this.zoomFactor = parseFloat((this.zoomFactor - this.zoomStep).toFixed(2));
    }
  }


  // Dragging an existing item
  startDragging(event: MouseEvent, item: any) {
    this.draggingItem = item;
    this.offsetX = event.clientX - item.left;
    this.offsetY = event.clientY - item.top;
    this.selectedItem = item; // Select the item for resizing
  }

  // Mousemove to drag
  @HostListener('document:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   if (this.draggingItem) {
  //     this.draggingItem.left = event.clientX - this.offsetX;
  //     this.draggingItem.top = event.clientY - this.offsetY;
  //   } else if (this.resizingItem) {
  //     const deltaX = event.clientX - this.offsetX;
  //     const deltaY = event.clientY - this.offsetY;
  //     this.resizingItem.width = Math.max(10, this.resizingItem.width + deltaX);
  //     this.resizingItem.height = Math.max(10, this.resizingItem.height + deltaY);
  //     this.offsetX = event.clientX;
  //     this.offsetY = event.clientY;
  //   }
  // }
  onMouseMove(event: MouseEvent) {
    if (this.draggingItem && this.floor) {
      const floorRect = this.floor.nativeElement.getBoundingClientRect();

      // Calculate the new position
      let newLeft = event.clientX - this.offsetX;
      let newTop = event.clientY - this.offsetY;

      // Enforce boundaries
      newLeft = Math.max(0, Math.min(newLeft, floorRect.width - this.draggingItem.width));
      newTop = Math.max(0, Math.min(newTop, floorRect.height - this.draggingItem.height));

      // Update the position
      this.draggingItem.left = newLeft;
      this.draggingItem.top = newTop;
    } else if (this.resizingItem) {
      const deltaX = event.clientX - this.offsetX;
      const deltaY = event.clientY - this.offsetY;

      // Prevent resizing beyond floor boundaries
      const floorRect = this.floor.nativeElement.getBoundingClientRect();
      const maxWidth = floorRect.width - this.resizingItem.left;
      const maxHeight = floorRect.height - this.resizingItem.top;

      this.resizingItem.width = Math.max(10, Math.min(this.resizingItem.width + deltaX, maxWidth));
      this.resizingItem.height = Math.max(10, Math.min(this.resizingItem.height + deltaY, maxHeight));

      this.offsetX = event.clientX;
      this.offsetY = event.clientY;
    } else if (this.rotatingItem) {
      const rect = this.floor.nativeElement.getBoundingClientRect();
      const centerX = rect.left + this.rotatingItem.left + this.rotatingItem.width / 2;
      const centerY = rect.top + this.rotatingItem.top + this.rotatingItem.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      // Calculate the angle in degrees
      let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - this.rotationStartAngle;

      // Snap the angle to the nearest 90 degrees
      angle = Math.round(angle / 45) * 45;

      // Update rotation
      this.rotatingItem.rotation = angle;
    }
  }


  // Stop dragging or resizing
  @HostListener('document:mouseup')
  onMouseUp() {
    this.draggingItem = null;
    this.resizingItem = null;
    this.rotatingItem = null;
  }

  // Dragging from the palette
  onDragStart(event: DragEvent, furniture: any) {
    event.dataTransfer?.setData('furniture', JSON.stringify(furniture));
  }

  // Allow drop on floor
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Drop a new item from the palette
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    const furnitureData = event.dataTransfer?.getData('furniture');
    if (furnitureData && this.floor) {
      const floorRect = this.floor.nativeElement.getBoundingClientRect();
      const furniture = JSON.parse(furnitureData);
      this.items.push({
        ...furniture,
        top: event.clientY - floorRect.top,
        left: event.clientX - floorRect.left,
      });
    }
  }
  startResizing(event: MouseEvent, item: any) {
    event.stopPropagation(); // Prevent dragging while resizing
    this.resizingItem = item;
    this.offsetX = event.clientX;
    this.offsetY = event.clientY;
  }
  // Resize item manually via input
  updateSize(item: any) {
    item.width = Math.max(10, item.width);
    item.height = Math.max(10, item.height);
  }

  saveLayout() {
    localStorage.setItem('floorPlanLayout', JSON.stringify(this.items));
    alert('Layout saved!');
  }

  deleteSelectedItem() {
    if (this.selectedItem) {
      this.items = this.items.filter(item => item !== this.selectedItem);
      this.selectedItem = null;
    }
  }




  loadLayout() {
    const savedLayout = localStorage.getItem('floorPlanLayout');
    if (savedLayout) {
      this.items = JSON.parse(savedLayout);
      alert('Layout loaded!');
    } else {
      alert('No saved layout found!');
    }
  }


  rotatingItem: any = null;
  rotationStartAngle: number = 0;
  updateRotation(item: any) {
    item.rotation = Math.round(item.rotation / 45) * 45; // Snap to 90-degree increments
  }
  // Start rotating an item
  startRotating(event: MouseEvent, item: any) {
    event.stopPropagation();
    this.rotatingItem = item;

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    // Calculate the initial angle in degrees
    this.rotationStartAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - (item.rotation || 0);

    // Prevent text selection while rotating
    event.preventDefault();
  }



}

