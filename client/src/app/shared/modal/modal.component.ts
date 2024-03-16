import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { v4 } from 'uuid';
import { BOOTSTRAP_TOKEN } from 'src/app/utils/bootstrap.token';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() title?: string;
  @Input() confirmation: string = 'Done';
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();
  @Input() icon?: string = 'bi bi-info-circle';
  modalId: string;
  modalHTMLElement?: any;
  modalObject?: any;

  constructor(@Inject(BOOTSTRAP_TOKEN) private bootstrap: any) {
    this.modalId = 's' + v4();
  }

  ngOnInit(): void {}

  showModal(): void {
    if (!this.modalHTMLElement)
      this.modalHTMLElement = document.getElementById(this.modalId);
    if (!this.modalObject) {
      const options = {
        backdrop: false,
        focus: true,
        keyboard: true,
      };
      this.modalObject = new this.bootstrap.Modal(
        this.modalHTMLElement,
        options
      );
    }
    if (this.modalObject) {
      this.modalObject.show();
    }
  }

  cancelModalAction(): any {
    if (this.modalObject) {
      this.modalObject.hide();
    }
    this.cancel.emit();
  }

  confirmModalAction(data?: any): any {
    this.confirm.emit(data);
    if (this.modalObject) {
      this.modalObject.hide();
    }
  }
}
