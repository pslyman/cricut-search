import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMachinesComponent } from './search-machines.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { GetMachinesService } from '../../services/get-machines.service';
import { Machine } from '../../models/machines.interface';


describe('SearchMachinesComponent', () => {
  let component: SearchMachinesComponent;
  let fixture: ComponentFixture<SearchMachinesComponent>;
  let getMachinesService: jasmine.SpyObj<GetMachinesService>;

  const testMachines: Machine[] = [{
    id: 1,
    rank: 1,
    name: 'Cricut Maker 00',
    description:
      '',
    tags: {
      projectTags: [
        'Vinyl decals',
        'Written labels',
      ],
      cutTypeTags: [
        'Cut',
        'Write',
      ],
      toolTags: [
        'Premium Fine-Point Blade',
        'Foil Transfer Tool',
      ],
      materialTags: [
        'Acetate',
        'Adhesive Foil',
      ],
      specTags: ['Bluetooth', 'USB', 'iOS', 'Mac', 'Windows', 'Android'],
    },
    image: '',
    url: '',
  }, {
    id: 1,
    rank: 2,
    name: 'Cricut Maker 99',
    description:
      '',
    tags: {
      projectTags: [
        'Vinyl decals',
        'Written labels',

      ],
      cutTypeTags: [
        'Cut',
        'Write',
        'Deboss',
      ],
      toolTags: [
        'Premium Fine-Point Blade',
        'Foil Transfer Tool',
      ],
      materialTags: [
        'Acetate',
        'Adhesive Foil',
      ],
      specTags: ['Bluetooth', 'USB', 'iOS', 'Mac', 'Windows', 'Android'],
    },
    image: '',
    url: '',
  }];

  const mockMachines: Machine[] = testMachines;

  beforeEach(async () => {
    const getMachinesServiceSpy = jasmine.createSpyObj('GetMachinesService', ['getMachines']);

    await TestBed.configureTestingModule({
      imports: [SearchMachinesComponent, BrowserAnimationsModule],
      providers: [{ provide: GetMachinesService, useValue: getMachinesServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchMachinesComponent);
    component = fixture.componentInstance;
    getMachinesService = TestBed.inject(GetMachinesService) as jasmine.SpyObj<GetMachinesService>;
    getMachinesService.getMachines.and.returnValue(of(mockMachines));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize machines and generate tags on init', () => {
    expect(component.machines).toEqual(mockMachines);
    expect(component.machinesFiltered).toEqual(mockMachines);
    expect(component.allTags).toEqual(['Vinyl decals', 'Written labels', 'Cut', 'Write', 'Premium Fine-Point Blade', 'Foil Transfer Tool', 'Acetate', 'Adhesive Foil', 'Bluetooth', 'USB', 'iOS', 'Mac', 'Windows', 'Android', 'Deboss',]);
  });

  it('should filter machines based on search query', () => {
    // match found in both machines
    component.searchQuery = 'cut';
    component.searchMachines();
    expect(component.machinesFiltered).toEqual(mockMachines);

    // match found in one machine
    component.searchQuery = 'Deboss';
    component.searchMachines();
    expect(component.machinesFiltered).toEqual([mockMachines[1]]);

    // no match found
    component.searchQuery = 'xyz';
    component.searchMachines();
    expect(component.machinesFiltered).toEqual([]);
  });

  it('should return all machines if search query is empty and searchFocus is false', () => {
    component.searchQuery = '';
    component.searchFocus = false;
    component.searchMachines();
    expect(component.machinesFiltered).toEqual(mockMachines);
  });

  it('should return no machines if search query is empty and searchFocus is true', () => {
    component.searchQuery = '';
    component.searchFocus = true;
    component.searchMachines();
    expect(component.machinesFiltered).toEqual([]);
  });

  it('should not filter machines if search query length is less than 3', () => {
    component.searchQuery = 'cu';
    component.searchMachines();
    expect(component.machinesFiltered).toEqual(mockMachines);
  });
});
