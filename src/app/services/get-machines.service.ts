import { Injectable } from '@angular/core';
import { Machine, MachineAPIResponse, MachineImageAPIResponse } from '../models/machines.interface';
import { map, Observable, of, switchMap } from 'rxjs';
import { mockMachineImages, mockMachines } from '../constants/mock-machines.constants';

@Injectable({
  providedIn: 'root'
})
export class GetMachinesService {
  public getMachines(): Observable<Machine[]> {
    return this.getMachinesAPI().pipe(
      switchMap((machines) =>
        this.getMachineImagesAPI().pipe(
          map((images) =>
            machines.map(machine => ({
              ...machine,
              image: images.find(image => image.id === machine.id)?.image || ''
            }))
          )
        )
      )
    );
  }


  public getMachinesAPI(): Observable<MachineAPIResponse[]> {
    return of(mockMachines);
  }

  public getMachineImagesAPI(): Observable<MachineImageAPIResponse[]> {
    return of(mockMachineImages);
  }
}
