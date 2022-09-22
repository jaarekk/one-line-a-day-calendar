import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  today = new Date();

  startDate!: Date;
  days: CalendarDay[] = [];
  header?: string;

  ngOnInit(): void {
    const start = new Date(
      this.today.getFullYear(),
      this.today.getMonth(),
      1,
      12
    );

    this.generate(start);
  }

  generate(date: Date) {
    this.startDate = date;
    this.days = [];

    const monthName = this.startDate.toLocaleDateString('en-US', {
      month: 'long',
    });
    this.header = `${monthName} ${this.startDate.getFullYear()}`;

    let current = new Date(this.startDate);
    let month = current.getMonth();

    while (current.getMonth() == month) {
      console.log(current);
      this.days.push(new CalendarDay(current));
      current.setDate(current.getDate() + 1);
    }
  }

  prev() {
    const start = new Date(
      this.startDate.setMonth(this.startDate.getMonth() - 1)
    );
    console.log(start);
    this.generate(start);
  }

  next() {
    const start = new Date(
      this.startDate.setMonth(this.startDate.getMonth() + 1)
    );
    console.log(start);
    this.generate(start);
  }
}

class CalendarDay {
  day: number;
  name: string;
  isWorkingDay: boolean;

  constructor(date: Date) {
    this.day = date.getDate();
    this.name = date.toLocaleDateString('en-US', { weekday: 'short' });
    this.isWorkingDay = date.getDay() !== 6 && date.getDay() !== 0;
  }

  public toString(): string {
    return `${this.day} ${this.name}`;
  }
}
