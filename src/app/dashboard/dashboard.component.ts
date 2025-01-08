import { Component } from '@angular/core';
import { ApexChart, ApexNonAxisChartSeries, ApexTitleSubtitle, ApexResponsive, ApexAxisChartSeries, ApexXAxis, ApexYAxis, ApexPlotOptions, ApexLegend, ApexTooltip, ApexStroke, ApexMarkers } from 'ng-apexcharts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  cardsData = [{
    count: 150,
    desc: "Depth Camera",
    active: 100,
    inactive: 50
  },
  {
    count: 200,
    desc: "Depth Camera",
    active: 100,
    inactive: 50
  },
  {
    count: 80,
    desc: "Depth Camera",
    active: 100,
    inactive: 50
  },
  {
    count: 120,
    desc: "Depth Camera",
    active: 100,
    inactive: 50
  },
  {
    count: 100,
    desc: "Depth Camera",
    active: 100,
    inactive: 50
  },
  {
    count: 250,
    desc: "Depth Camera",
    active: 150,
    inactive: 100
  }]

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
  private timeInterval = 1000;
  selectedVal: any='Dashboard';
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
    };}
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
