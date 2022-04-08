import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, Type, Input, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Modal, ModalService } from './modal.service';

@Component({
  selector: 'ui-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class ModalComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private defaultConfig: DynamicDialogConfig = {
    width: '80%',
    height: '90%',
    modal: true,
    closable: true,
    closeOnEscape: true,
    dismissableMask: true,
    autoZIndex: true,
  };
  constructor(
    private dialogService: DialogService,
    private modalService: ModalService,
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.subscription = this.modalService.config()
      .subscribe(modal => this.show(modal));
  }
  show(modal: Modal) {
    if (!modal.component) return;
    const config = { ...this.defaultConfig, ...modal };
    this.dialogService.open(modal.component, config);
  }
}
