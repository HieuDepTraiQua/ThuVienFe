import { CardService } from './../../services/library_card.service';
import { LibraryCard } from './../../models/library_card.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Author } from 'src/app/models/author.model';

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.scss']
})
export class LibraryCardComponent implements OnInit {

  formGroup!: FormGroup;
  cards: LibraryCard[] = [];
  selectedCard!: LibraryCard;
  isLoading$ = new BehaviorSubject(false);
  isVisible = false;
  isUpdate = false;
  pageIndex = 1;
  totalPage = 1;
  pageSize = 10;
  constructor(
    private cardService: CardService ,
    private fb: FormBuilder,
    private modal: NzModalService
  ) { 
    this.formGroup = this.fb.group({
      idCard: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getAllCard();
  }

  getAllCard(): void {
    this.isLoading$.next(true); // Hiển thị loading khi đang đang gửi request
    this.cardService.getAllPaging(this.pageIndex-1, this.pageSize)
      .pipe(finalize(() => this.isLoading$.next(false))) // Ẩn loading khi request gọi thành công
      .subscribe((response: any) => {
        if (response && response.success) {
          this.cards = response.data;
          this.totalPage = response.totalPage  * 10;
         this.cards = this.cards.map(card => {
           return {
             ...card,
             checked: false
           }
         });
        } else {
          console.log('Xảy ra lỗi');
        }
      })
  }

  onDelete(data: LibraryCard): void {
    this.cardService.delete(data.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllCard();
      });
  }
  
  showModal(data?: LibraryCard): void {
    this.isVisible = true;
  
    if (data) {
      this.isUpdate = true;
      this.selectedCard = data;
      this.formGroup.patchValue({
        startDate: data.startDate,
        endDate: data.endDate,
        idCard: data.idCard
      })
    } else {
      this.isUpdate = false;
      this.formGroup.reset();
    }
  }

  handleOk(): void {

    if (this.formGroup.invalid) {
      console.log(this.formGroup, 'form invalid');
      return;
    }
    
    const card: LibraryCard = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.cardService.update(card, this.selectedCard.id)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllCard();
      });
    } else {
      this.cardService.create(card)
        .pipe(finalize(() => this.isVisible = false))
        .subscribe(response => {
          this.getAllCard();
        });
    }  
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  showDeleteConfirm(data: LibraryCard): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa?',
      nzContent: `<b style="color: red;">${data.idCard}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onDelete(data),
      nzCancelText: 'No'
    });
  }

  onPageChange(pageNumber: number): void {
    this.pageIndex = pageNumber;
    this.getAllCard();    
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.getAllCard();
  }


}
