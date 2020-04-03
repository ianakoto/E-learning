import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomefooterComponent } from './homefooter/homefooter.component';
import { HomesidebarComponent } from './homesidebar/homesidebar.component';
import { HomeheaderComponent } from './homeheader/homeheader.component';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [HomefooterComponent, HomesidebarComponent, HomeheaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonToggleModule
  ],
  exports: [
    HomefooterComponent,
    HomesidebarComponent,
    HomeheaderComponent,
    CommonModule
  ]
})
export class ComponentsModule { }
