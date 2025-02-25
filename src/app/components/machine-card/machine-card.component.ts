import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-machine-card',
  standalone: true,
  imports: [],
  templateUrl: './machine-card.component.html',
  styleUrl: './machine-card.component.scss'
})
export class MachineCardComponent {
  @Input() public name: string = '';
  @Input() public description: string = '';
  @Input() public image: string = '';
  @Input() public url: string = '';
}
