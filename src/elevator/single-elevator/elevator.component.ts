import { Component, Input } from '@angular/core';
import { Elevator } from '../model/elevator.model';

@Component({
  selector: 'app-elevator',
  template: `
    <div class="elevator">
      <h3>Elevator #{{ elevator.id }}</h3>
      <p>Current Floor: {{ elevator.currentFloor }}</p>
      <p>Direction: {{ elevator.direction || 'Idle' }}</p>
    </div>
  `,
  styles: [`.elevator { border: 1px solid #333; padding: 10px; margin: 5px; width: 180px; }`]
})
export class ElevatorComponent {
  @Input() elevator!: Elevator;
}