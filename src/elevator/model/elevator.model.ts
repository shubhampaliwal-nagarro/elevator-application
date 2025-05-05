import { ElevatorDirection } from "../../config/config";

export class Elevator {
  id: number;
  currentFloor: number = 1;
  targetFloors: number[] = [];
  direction: ElevatorDirection | null = null;
  isMoving: boolean = false;
  isIdle: boolean = true;

  constructor(id: number) {
    this.id = id;
  }

  logStatus() {
    console.log(`Elevator ${this.id} is currently on floor ${this.currentFloor} (${this.direction || 'idle'})`);
  }

  addTargetFloor(floor: number) {
    if (!this.targetFloors.includes(floor)) {
      this.targetFloors.push(floor);
      this.sortTargetFloors();
      this.isIdle = false;
    }
  }

  private sortTargetFloors() {
    this.targetFloors.sort((a, b) => (this.direction === ElevatorDirection.DOWN ? b - a : a - b));
  }

  moveOneStep() {
    if (this.targetFloors.length === 0) {
      this.direction = null;
      this.isIdle = true;
      return;
    }

    const nextFloor = this.targetFloors[0];

    if (this.currentFloor < nextFloor) {
      this.currentFloor++;
      this.direction = ElevatorDirection.UP
    } else if (this.currentFloor > nextFloor) {
      this.currentFloor--;
      this.direction = ElevatorDirection.DOWN
    }

    if (this.currentFloor === nextFloor) {
      this.targetFloors.shift(); // Reached the floor
      this.sortTargetFloors();
    }

    if (this.targetFloors.length === 0) {
      this.direction = null;
      this.isIdle = true;
    }
  }
}