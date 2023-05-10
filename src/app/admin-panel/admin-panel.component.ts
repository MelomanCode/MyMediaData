import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  ngOnInit(): void {
    for (const a in ['dfdf', 'dfdf']) {
      console.log(a);
    }
  }
}
