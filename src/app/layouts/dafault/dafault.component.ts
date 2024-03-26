import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dafault',
  templateUrl: './dafault.component.html',
  styleUrls: ['./dafault.component.scss']
})
export class DafaultComponent {
  SideBarOpen = true;
  ngOnInit() {}
sideBareToggler(){
this.SideBarOpen = !this.SideBarOpen;

}
constructor(private router: Router) {
  const redirectUrl = sessionStorage.getItem('redirectUrl');
  if (redirectUrl) {
    sessionStorage.removeItem('redirectUrl');
    this.router.navigateByUrl(redirectUrl);
  }

}
}
