import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule, TabViewModule],
  exports: [TabsComponent]
})
export class TabsModule {}
