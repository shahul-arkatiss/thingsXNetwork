import { Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-multi-tree',
  templateUrl: './d3-multi-tree.component.html',
  styleUrl: './d3-multi-tree.component.scss'
})
export class D3MultiTreeComponent {
  @ViewChild('treeContainer', { static: true }) treeContainer!: ElementRef;

  // Define the tree data structure
  treeData = 
    {
      name: 'Root',
      children: [
        {
          name: 'Child 1',
          children: [
            { name: 'Grandchild 1-1' },
            { name: 'Grandchild 1-2' },
          ],
        },
        {
          name: 'Child 2',
          children: [
            { name: 'Grandchild 2-1' },
            { name: 'Grandchild 2-2' },
          ],
        },

      ],
    }

  

  constructor() { }

  ngOnInit(): void {
    this.createTree();
  }

  createTree() {
    const width = 600;
    const height = 400;

    const svg = d3
      .select(this.treeContainer.nativeElement)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g').attr('transform', 'translate(50,50)');

    // Create the tree layout
    const treeLayout = d3.tree().size([height - 100, width - 100]);
    const root: any = d3.hierarchy(this.treeData);
    treeLayout(root);

    // Draw the links
    g.selectAll('.link')
      .data(root.links())
      .enter()
      .append('path')
      .attr(
        'd',
        d3
          .linkHorizontal()
          .x((d: any) => d.y)
          .y((d: any) => d.x) as any
      )
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#ccc')
      .style('stroke-width', '2px');

    // Draw the nodes
    const nodes = g
      .selectAll('.node')
      .data(root.descendants())
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

    nodes.append('circle').attr('r', 5).style('fill', 'steelblue');

    nodes
      .append('text')
      .attr('dx', 10)
      .attr('dy', 3)
      .text((d: any) => d.data.name)
      .style('font-size', '12px')
      .style('font-family', 'Arial');
  }
}
