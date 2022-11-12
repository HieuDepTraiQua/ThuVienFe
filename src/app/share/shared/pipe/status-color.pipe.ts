import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor'
})
export class StatusColorPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      if (value === "Đã hoàn thành") {
        
      }
    }
    return "";
  }

}
