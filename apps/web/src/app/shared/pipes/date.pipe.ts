import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appDate',
  standalone: true
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date, format: string = 'short'): string {
    if (!value) return '';
    
    const date = new Date(value);
    
    if (isNaN(date.getTime())) return '';
    
    switch (format) {
      case 'short':
        return date.toLocaleDateString();
      case 'long':
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'time':
        return date.toLocaleTimeString();
      case 'datetime':
        return date.toLocaleString();
      default:
        return date.toLocaleDateString();
    }
  }
}
