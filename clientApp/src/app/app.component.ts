import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EhrService } from 'src/services/ehr.service';
import { Condition, conditions } from '../../../common/constants/conditions';
import { EHR } from '../../../common/models/EHR';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public records:EHR[] = [];
  public conditions: Condition[] = conditions;
  public currentReview = 0;
  public selectedCondition: Condition | undefined = undefined;
  // For the sake of time randomizing the doctor 
  public doctor = Math.floor(Math.random() * 10) + 1;
  constructor(private ehrService: EhrService, private snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.ehrService.getAllRecords().subscribe(ehrs => {
      this.records = ehrs || [];
    })
  }

  public saveCase() {
    if (this.selectedCondition) {
      this.records[this.currentReview].condition = this.selectedCondition;
      this.records[this.currentReview].doctorId = this.doctor;
      this.ehrService.updateRecord(this.records[this.currentReview]).subscribe(res => {
        this.currentReview+=1;
        this.selectedCondition = undefined;
        this.snackbar.open('Updated EHR Case.', '', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 1000
        });
      });
    }

  }
}
