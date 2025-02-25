import { TestBed } from '@angular/core/testing';

import { GetMachinesService } from './get-machines.service';
import { of } from 'rxjs';
import { mockMachines, mockMachineImages } from '../constants/mock-machines.constants';

describe('GetMachinesService', () => {
  let service: GetMachinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMachinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return machines with images', (done) => {
    service.getMachines().subscribe((machines) => {
      expect(machines.length).toBe(mockMachines.length);
      machines.forEach((machine, index) => {
        expect(machine.image).toBe(mockMachineImages[index].image);
      });
      done();
    });
  });

  it('should return machines with empty images if no matching image found', (done) => {
    const emptyImages = mockMachineImages.map(machineImage => ({
      id: machineImage.id + 100,
      image: '',
    }));

    spyOn(service, 'getMachineImagesAPI').and.returnValue(of(emptyImages));

    service.getMachines().subscribe((machines) => {
      expect(machines.length).toBe(mockMachineImages.length);
      machines.forEach((machine) => {
        expect(machine.image).toBe('');
      });
      done();
    });
  });
});
