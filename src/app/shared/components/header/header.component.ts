import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSideBareForMe: EventEmitter<any> = new EventEmitter()
  constructor(){}
  toggleSideBar(){
this.toggleSideBareForMe.emit();
  }
}
