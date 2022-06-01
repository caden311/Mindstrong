import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateResult } from 'mongodb';
import { map, Observable } from 'rxjs';
import { EHR } from '../../../common/models/EHR';

@Injectable({
  providedIn: 'root'
})
export class EhrService {

  constructor(private http: HttpClient) { }

  public getAllRecords(): Observable<EHR[] | undefined> {
    return this.http.get<EHR[]>('http://localhost:3000/Ehr').pipe(map((records: EHR[]) => {
      return records;
    }));
  }

  public updateRecord(ehr: EHR): Observable<UpdateResult | undefined> {
    return this.http.put<any>(`http://localhost:3000/Ehr/${ehr._id}`, ehr).pipe(map((response: UpdateResult) => {
      return response;
    }));
  }
}
