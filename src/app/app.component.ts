import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MultiScreen-Primeng';
  showForm:boolean=false;
  AddSubject(event:any)
  {
    this.showForm = event;
  }
}
