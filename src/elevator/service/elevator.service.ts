import { Injectable } from '@angular/core';
import { Elevator } from '../model/elevator.model';
import { CONFIG, ElevatorDirection } from '../../config/config';
import { ISelectedElevator } from '../interface/elevatorInterface';

@Injectable({ providedIn: 'root' })
export class ElevatorService {
  elevators: Elevator[] = [];
  totalFloors = CONFIG.totalFloors;
  selectedElevator: ISelectedElevator = {
    elevator: null,
    calledFromFloor: 0,
    direction: 'Idle',
  };
  constructor() {
    // Initialize elevators
    this.elevators = Array.from(
      { length: CONFIG.elevatorCount },
      (_, index) => new Elevator(index + 1)
    );
    this.startSystem();
  }

  callElevator(floor: number, direction: ElevatorDirection) {
    const elevator = this.selectElevator(floor, direction);
    if (elevator) {
      this.selectedElevator.elevator = elevator;
      this.selectedElevator.calledFromFloor = floor;
      this.selectedElevator.direction = direction;
      elevator.addTargetFloor(floor);
    }
  }

  private selectElevator(
    requestedFloor: number,
    direction: ElevatorDirection
  ): Elevator | null {
    let bestElevator: Elevator | null = null;
    let bestScore = Infinity;

    for (const elevator of this.elevators) {
      const distance = Math.abs(elevator.currentFloor - requestedFloor);
      let score = distance;

      // Penalize elevators going in the wrong direction
      if (elevator.direction && elevator.direction !== direction) {
        score += 100;
      }

      const isMovingTowardRequest =
        (elevator.direction === ElevatorDirection.UP &&
          elevator.currentFloor <= requestedFloor) ||
        (elevator.direction === ElevatorDirection.DOWN &&
          elevator.currentFloor >= requestedFloor);

      // Reward elevators already moving toward the request
      if (elevator.direction === direction && isMovingTowardRequest) {
        score -= 5;
      }

      if (score < bestScore) {
        bestScore = score;
        bestElevator = elevator;
      }
    }

    return bestElevator;
  }

  moveElevatorsOneStep() {
    this.elevators.forEach((elevator) => {
      elevator.moveOneStep();
      elevator.logStatus();
    });
  }

  createRandomCallToElevator() {
    const floor = Math.ceil(Math.random() * this.totalFloors);
    const direction =
      floor === this.totalFloors
        ? ElevatorDirection.DOWN
        : floor === 1
        ? ElevatorDirection.UP
        : Math.random() > 0.5
        ? ElevatorDirection.UP
        : ElevatorDirection.DOWN;

    this.callElevator(floor, direction);
  }

  startSystem() {
    setInterval(() => this.createRandomCallToElevator(), CONFIG.requestTime);
    setInterval(() => this.moveElevatorsOneStep(), CONFIG.stepTime);
  }
}
