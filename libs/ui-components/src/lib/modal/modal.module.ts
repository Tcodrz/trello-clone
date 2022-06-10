import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { ModalConfig } from './types';



@NgModule({
  imports: [
    CommonModule,
    DynamicDialogModule,
  ],
  declarations: [ModalComponent],
  exports: [ModalComponent],
  providers: [ModalService]
})
export class ModalModule {
  static forRoot(config?: ModalConfig): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [ModalService]
    }
  }
}
