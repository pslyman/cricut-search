import { Component, OnInit } from '@angular/core';
import { mockMachines } from '../../constants/mock-machines.constants';
import { FormsModule } from '@angular/forms';
import { Machine } from '../../models/machines.interface';
import { staggeredFadeIn } from '../../constants/animations.constants';
import { CommonModule } from '@angular/common';
import { MachineCardComponent } from '../machine-card/machine-card.component';
import { TruncatePipe } from '../../pipes/tag-pipe.pipe';

@Component({
  selector: 'app-search-machines',
  standalone: true,
  imports: [CommonModule, FormsModule, MachineCardComponent, TruncatePipe],
  templateUrl: './search-machines.component.html',
  styleUrls: ['./search-machines.component.scss'],
  animations: [staggeredFadeIn],
})
export class SearchMachinesComponent implements OnInit {
  public title = 'Cricut Cutting Machines';
  public machines: Machine[] = mockMachines;
  public machinesFiltered: Machine[] = mockMachines;
  public searchFocus = false;
  public allTags: string[] = [];

  public searchSuggestions = [
    'What materials are you using?',
    'What hardware compatibility do you need?',
    'What tools do you need?',
    'What do you need your machine to do?',
    'Example: "mug, foil, deboss"',
  ];

  public searchQuery = '';
  public searchTags: string[] = [];

  ngOnInit(): void {
    this.generateTags();
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
      this.machinesFiltered = this.machines;
      return;
    } else if (this.searchQuery.length < 3) {
      return;
    }

    const searchTerms = this.searchQuery.replace(/,/g, '').split(' ');
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
    console.log(this.searchTags);

    this.machinesFiltered = searchResults;
  }
}
