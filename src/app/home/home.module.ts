import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { HomePageRoutingModule } from './home-routing.module';

import { IssueItemComponent } from './components/issue-item/issue-item.component';
import { SelectComponent } from './components/select-component/select-component.component';
import { HomePage } from './home.page';

import { CalculationPipe } from '../pipe/calculation.pipe';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage, IssueItemComponent, SelectComponent, CalculationPipe],
})
export class HomePageModule {}
