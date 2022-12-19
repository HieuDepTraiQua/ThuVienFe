import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef } from "@angular/core";
import { ColTableComponent } from "../col/col.component";
import { FormGroup } from "@angular/forms";


@Component({
  selector: 'app-table-component',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  
})
export class TableComponent implements OnInit, AfterContentInit {
  settingForm?: FormGroup;
  listOfData: readonly any[] = [];
  displayData: readonly any[] = [];
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  

  @Input() isLoading = false;
  @Input() bordered = false;
  @Input() clientPagingation = false;
  @Input() totalRecords!: number;
  @Input() totalPage = 10;
  @Input() pageIndex = 0;
  @Input() gridSize: 'middle' | 'default' | 'small' = 'middle';
  @Input() checked = true;
  @Input() showPagingation = true;
  @Input() showSizeChange = true;
  @Input() sortField!: string;
  @Input() sortDirection!: string;
  @Input() data: any[] = [];
  @Input() showEdit = true;
  @Input() showDelete = true;
  @Input() showVote = false;
  @Input() canSearch = true;
  @Input() canFilter = true;
  @Input() canExport = true;
  @Input() canCreate = true;
  @Input() canAction = true;
  

  @Output() rowClick = new EventEmitter();
  @Output() pageIndexChange = new EventEmitter();
  @Output() pageSizeChange = new EventEmitter();
  @Output() editButtonClick = new EventEmitter();
  @Output() deleteButtonClick = new EventEmitter();
  @Output() createButton = new EventEmitter();
  @Output() voteButtonClick = new EventEmitter();

  @ContentChildren(ColTableComponent) columns!: QueryList<ColTableComponent>;
  @ContentChildren('headerTable', { descendants: true }) headerParentTmp!: QueryList<TemplateRef<any>>

  constructor() {}

  ngOnInit(): void {
    this.listOfData = this.data;
    this.displayData = this.listOfData
  }

  ngAfterContentInit(): void {

  }

 

  // click record
  onRowClick(data: any) {
    this.rowClick.emit(data);
  }

  onCreate(): void {
    this.createButton.emit();
  }
  
// edit record
  onEditRow(data: any): void {
    if (this.editButtonClick) {
      this.editButtonClick.emit(data);
    }  
  }

  onVote(data: any): void {
    if (this.voteButtonClick) {
      this.voteButtonClick.emit(data);
    }  
  }

  // delete record
  onDeleteRow(data: any): void {
    if (this.deleteButtonClick) {
      this.deleteButtonClick.emit(data);
    }  
  }



  // Pagingnation
  currentPageDataChange($event: readonly any[]): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled);
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true);
    const allUnChecked = validData.every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  onPageIndexChange(pageIndex: number): void {
    if (this.pageIndexChange) {
      this.pageIndexChange.emit(pageIndex);
    }
  }

  onPageSizeChange(pageSize: number): void {
    if (this.pageSizeChange) {
      this.pageSizeChange.emit(pageSize);
    }
  }
}
