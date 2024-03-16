import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Output() dateSelected: EventEmitter<Date> = new EventEmitter<Date>();
  @Input() defaultDate?: Date;
  defaultValue?: string;
  private dateInputChange: Subject<string> = new Subject<string>();

  constructor() {
    this.dateInputChange.pipe(debounceTime(400)).subscribe((value: string) => {
      this.onDateChange(value);
    });
  }

  private dateMonthToString(month: number): string {
    let m = month + 1;
    if (m < 10) {
      return '0' + m;
    }
    return m + '';
  }

  ngOnInit(): void {
    if (!this.defaultDate){
      this.defaultDate = new Date();
    }
    this.defaultValue = `${this.defaultDate.getFullYear()}-${this.dateMonthToString(
      this.defaultDate.getMonth()
    )}-${this.defaultDate.getDate()}`;
    this.onDateChange(this.defaultValue);
  }

  onDateInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.dateInputChange.next(inputElement.value);
  }

  onDateChange(dateString: string): void {
    //const inputElement = event.target as HTMLInputElement;
    //console.log(dateString);
    const selectedDate: Date = new Date(`${dateString}T24:00:00.000Z`);
    //console.log(selectedDate.toDateString());
    this.dateSelected.emit(selectedDate);
  }
}
