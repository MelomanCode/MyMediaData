import { Component, OnInit } from '@angular/core';

interface ClockData {
  time: string;
  date: string;
}

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css'],
})
export class ClockComponent implements OnInit {
  public clock: ClockData = {
    time: '',
    date: '',
  };
  public week: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  private timerID: any;

  ngOnInit(): void {
    this.timerID = setInterval(this.updateTime.bind(this), 1000);
    this.updateTime();
  }

  updateTime(): void {
    const cd: Date = new Date();
    this.clock.time =
      this.zeroPadding(cd.getHours(), 2) +
      ':' +
      this.zeroPadding(cd.getMinutes(), 2) +
      ':' +
      this.zeroPadding(cd.getSeconds(), 2);
    this.clock.date =
      this.zeroPadding(cd.getFullYear(), 4) +
      '-' +
      this.zeroPadding(cd.getMonth() + 1, 2) +
      '-' +
      this.zeroPadding(cd.getDate(), 2) +
      ' ' +
      this.week[cd.getDay()];
  }

  zeroPadding(num: number, digit: number): string {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }
}
