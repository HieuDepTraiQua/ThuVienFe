import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      if (value === "DONE") {
        return "Đã hoàn thành"
      } else if (value === "INPROGRESS") {
        return "Đang xử lý"
      } else if (value === "LATE") {
        return "Trễ"
      } else if (value === "CANCEL") {
        return "Hủy"
      } else if (value === "NEW") {
        return "Mới";
      } else {
        return ""
      }
    }
    return '';
  }

}
