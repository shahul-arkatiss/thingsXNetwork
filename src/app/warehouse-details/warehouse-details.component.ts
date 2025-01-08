import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle, ApexResponsive, ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexPlotOptions, ApexLegend, ApexTooltip, ApexStroke, ApexMarkers } from 'ng-apexcharts';
import { ColDef, SideBarDef } from 'ag-grid-community';

@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrl: './warehouse-details.component.scss'
})
export class WarehouseDetailsComponent {
  selectedVal = "Analytics"

  chartOptions: {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    responsive: ApexResponsive[];
    title: ApexTitleSubtitle;
  };
  barChartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
  };
  dounutChartOptions: {
    series: number[];
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
    title: ApexTitleSubtitle;
    legend: ApexLegend;
    responsive: ApexResponsive[];
  };
  humidityChartOptions: {
    series: any[];
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    markers: ApexMarkers;
  };
  tempChartOptions: {
    series: any[];
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
  };
  private count = 0;
  private timeInterval = 1000; // Interval for new data (1 second)
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

  constructor() {
    this.tempChartOptions = {
      series: [
        {
          name: 'Random Data',
          data: [], // Initially empty data
        },
      ],
      chart: {
        type: 'line',
        height: 350,
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      xaxis: {
        type: 'datetime', // Use datetime for the x-axis
        title: {
          text: 'Time',
        },
      },
      yaxis: {
        title: {
          text: 'Value',
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy HH:mm:ss',
        },
      },
      stroke: {
        curve: 'smooth', // Smooth line curve
      },
      title: {
        text: 'Real-Time Data Chart',
        align: 'left',
      },
    };
    this.humidityChartOptions = {
      series: [
        {
          name: 'Temperature',
          data: [
            [1640995200000, 22],
            [1641081600000, 25],
            [1641168000000, 28],
            [1641254400000, 30],
            [1641340800000, 32],
            [1641427200000, 34],
            [1641513600000, 36],
            [1641600000000, 38],
            [1641686400000, 40],
            [1641772800000, 42],
            [1641859200000, 44],
            [1641945600000, 45],
          ], // Example data: [timestamp, value]
        },
      ],
      chart: {
        type: 'line', // Line chart
        height: 350,
        zoom: {
          enabled: true, // Enable zooming
          type: 'x', // Allow zoom on x-axis (time axis)
          autoScaleYaxis: true, // Automatically scale the y-axis
        },
      },
      xaxis: {
        type: 'datetime', // Time-based data
        title: {
          text: 'Date',
        },
      },
      yaxis: {
        title: {
          text: 'Temperature (°C)',
        },
      },
      title: {
        text: 'Zoomable Time Series - Temperature Over Time',
        align: 'left',
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy HH:mm', // Tooltip date format
        },
      },
      stroke: {
        curve: 'smooth', // Smooth line curve
      },
      markers: {
        size: 5, // Size of data points
      },
    };
    this.chartOptions = {
      series: [44, 55, 13, 43, 22], // Data for the pie chart
      chart: {
        type: 'pie',
        height: 350,
      },
      labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'], // Labels for data
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      title: {
        text: 'Simple Pie Chart',
      },
    };

    this.barChartOptions = {
      series: [
        {
          name: 'Sales',
          data: [23, 44, 35, 51, 49, 62, 69],
        },
        {
          name: 'Sales',
          data: [23, 44, 35, 51, 49, 62, 69],
        },

      ],
      chart: {
        type: 'bar', // Column chart
        height: 350,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Months for x-axis labels
      },
      yaxis: {
        title: {
          text: 'Sales (in units)', // Y-axis title
        },
      },
      title: {
        text: 'Monthly Sales', // Chart title
        align: 'left',
      },
    };
    this.dounutChartOptions = {
      series: [55, 30, 15], // Values for the donut chart segments
      chart: {
        type: 'donut', // Chart type is donut
        height: 350, // Height of the chart
      },
      labels: ['Category A', 'Category B', 'Category C'], // Labels for the segments
      plotOptions: {
        pie: {
          donut: {
            size: '70%', // Donut thickness
          },
        },
      },
      title: {
        text: 'Donut Chart Example', // Chart title
        align: 'left',
      },
      legend: {
        position: 'bottom', // Position of the legend
      },
      responsive: [
        {
          breakpoint: 600, // Chart responsiveness for smaller screens
          options: {
            chart: {
              width: 200, // Resize chart for smaller screens
            },
          },
        },
      ],
    };

  }
  ngOnInit(): void {
    // Simulate real-time data updates every second
    setInterval(() => {
      this.addDataPoint();
    }, this.timeInterval);
  }
  onValChange(val: string) {
    this.selectedVal = val
    console.log(this.selectedVal)
    if (val == "Metrics") {
      // this.router.navigate(['/home']);

    } else if (val == "Metrics") {
      // this.router.navigate(['/configuration']);
    }
  }

  private addDataPoint(): void {
    // Generate a new data point
    const newTime = new Date().getTime();
    const newValue = Math.random() * 100; // Simulating random data

    // Add the new data point to the chart
    this.tempChartOptions.series[0].data.push([newTime, newValue]);

    // Limit the number of data points (e.g., show only the last 50)
    if (this.tempChartOptions.series[0].data.length > 50) {
      this.tempChartOptions.series[0].data.shift();
    }

    // Trigger a change detection to update the chart
    // This is necessary to refresh the chart with the new data
    this.tempChartOptions = { ...this.tempChartOptions };
  }
}