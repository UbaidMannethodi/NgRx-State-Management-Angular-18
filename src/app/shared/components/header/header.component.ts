import { Component, OnInit } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    RouterLink
  ],
  standalone: true
})
export class HeaderComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
  }
}
