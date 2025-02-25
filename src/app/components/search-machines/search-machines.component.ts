import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Machine } from '../../models/machines.interface';
import { fadeIn, staggeredFadeIn } from '../../constants/animations.constants';
import { CommonModule } from '@angular/common';
import { MachineCardComponent } from '../machine-card/machine-card.component';
import { TruncatePipe } from '../../pipes/tag-pipe.pipe';
import { GetMachinesService } from '../../services/get-machines.service';

@Component({
  selector: 'app-search-machines',
  standalone: true,
  imports: [CommonModule, FormsModule, MachineCardComponent, TruncatePipe],
  templateUrl: './search-machines.component.html',
  styleUrls: ['./search-machines.component.scss'],
  animations: [staggeredFadeIn, fadeIn],
})
export class SearchMachinesComponent implements OnInit {
  public title = 'Cricut Cutting Machines';
  public machines: Machine[] = [];
  public machinesFiltered: Machine[] = [];
  public searchFocus = false;
  public allTags: string[] = [];
  public getMachinesService = inject(GetMachinesService);

  public searchSuggestions = [
    'What materials are you using?',
    'What hardware compatibility do you need?',
    'What tools do you need?',
    'What do you need your machine to do?',
    'Examples: "cut, draw, score", "paper flowers", or "Glitter Vinyl"',
  ];

  public searchQuery = '';
  public searchTags: string[] = [];

  ngOnInit(): void {
    this.getMachinesService.getMachines().subscribe((machines) => {
      this.machines = machines;
      this.machinesFiltered = machines;

      this.generateTags();
    });
  }

  public generateTags() {
    const tagsMap = new Map<string, boolean>();
    this.machines.forEach((machine: Machine) => {
      Object.keys(machine.tags).forEach((tag: string) => {
        machine.tags[tag].forEach((tagValue: string) => {
          tagsMap.set(tagValue, true);
        });
      });
    });

    this.allTags = Array.from(tagsMap.keys());
    console.log('All possible search terms', this.allTags);
  }

  public searchMachines() {
    if (this.searchQuery.length === 0) {
      if (this.searchFocus) { this.machinesFiltered = [] } else { this.machinesFiltered = this.machines; }

      return;
    } else if (this.searchQuery.length < 3) {
      return;
    }

    const searchTerms = this.searchQuery.replace(/,/g, '').split(' ').filter(term => term !== '');
    const searchTagsMap = new Map<string, boolean>();

    const searchResults = this.machines.filter((machine: Machine) => {
      return searchTerms.every((term: string) => {
        return Object.keys(machine.tags).some((tag: string) => {
          return machine.tags[tag].some((tagValue: string) => {
            if (tagValue.toLowerCase().includes(term.toLowerCase())) {
              searchTagsMap.set(tagValue, true);
              return tagValue
            }
            return;
          });
        });
      });
    });

    this.searchTags = Array.from(searchTagsMap.keys());

    this.machinesFiltered = searchResults;
  }
}
