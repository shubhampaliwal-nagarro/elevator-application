import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElevatorService } from './service/elevator.service';
import { ElevatorComponent } from './single-elevator/elevator.component';

@Component({
  selector: 'app-elevator-system',
  template: `
    <div class="system">
      <h2>Elevator System Status</h2>
      <h5>Call From Floor: {{ service.selectedElevator.calledFromFloor }} is Assigned to Elevator #{{service.selectedElevator.elevator?.id}}</h5>
      <app-elevator *ngFor="let elevator of service.elevators" [elevator]="elevator"></app-elevator>
    </div>
  `,
  imports:[ElevatorComponent,CommonModule]
})
export class ElevatorSystemComponent {
  constructor(public service: ElevatorService) {}
}