import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  formatDate(date: Date): string {
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const day = utcDate.getUTCDate();
    const month = utcDate.getUTCMonth() + 1;
    const year = utcDate.getUTCFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  formatTime(date: Date): string {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let hoursString = hours < 10 ? '0' + hours : hours.toString();
    let minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    return hoursString + ':' + minutesString;
  }

  parseDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return date;
  }

  parseTime(timeString: string): Date {
    const [hour, minute] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date;
  }
}
