import { ElevatorDirection } from '../../config/config';
import { Elevator } from '../model/elevator.model';

export interface ISelectedElevator {
  elevator: Elevator | null;
  calledFromFloor: Number;
  direction: ElevatorDirection | 'Idle';
}
