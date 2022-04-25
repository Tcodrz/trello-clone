import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, Injectable, Optional, Type } from "@angular/core";
import { MODAL_MODULE_TOKEN } from './di';
import { ModalConfig } from './types';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

export interface Modal extends DynamicDialogConfig {
  component: Type<unknown> | null;
  cbOnClose?: () => void
}

@Injectable()
export class ModalService {
  private modal$: BehaviorSubject<Modal> = new BehaviorSubject<Modal>({ component: null });

  constructor(
    @Optional() @Inject(MODAL_MODULE_TOKEN)
    private readonly _config: ModalConfig | null
  ) {
  }
  open(modal: Modal): void {
    this.modal$.next(modal);
  }
  config(): Observable<Modal> {
    return this.modal$.asObservable();
  }
}
