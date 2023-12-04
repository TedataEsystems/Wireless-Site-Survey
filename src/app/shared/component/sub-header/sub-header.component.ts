import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css']
})
export class SubHeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  public onToggleSidenav=()=> {
    this.sidenavToggle.emit();
     }
}
