import { Component } from '@angular/core';
import { ElevatorSystemComponent } from '../elevator/elevator-system.component';

@Component({
  selector: 'app-root',
  imports: [ElevatorSystemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'elevator-application';
}
