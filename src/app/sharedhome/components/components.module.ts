import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomefooterComponent } from './homefooter/homefooter.component';
import { HomesidebarComponent } from './homesidebar/homesidebar.component';
import { HomeheaderComponent } from './homeheader/homeheader.component';



@NgModule({
  declarations: [HomefooterComponent, HomesidebarComponent, HomeheaderComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    HomefooterComponent,
    HomesidebarComponent,
    HomeheaderComponent,
    CommonModule
  ]
})
export class ComponentsModule { }
