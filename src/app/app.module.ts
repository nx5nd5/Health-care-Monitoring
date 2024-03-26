import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DafaultModule } from './layouts/dafault/dafault.module';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { ClientListComponent } from "./components/client-list.component";
import { ClientDetailComponent } from "./components/client-details.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { CreateClientComponent } from './components/create/create-client/create-client.component';

import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { UpdateClientComponent } from './components/update/update-client/update-client.component';
import { ClientBoardService } from './services/client-board.service';
import { NgChartsModule } from 'ng2-charts';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HeartbeatChartComponent } from './components/heartbeat-chart.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';



@NgModule({
  declarations: [
    AppComponent,
    ClientListComponent,
    ClientDetailComponent,
    CreateClientComponent,
    LoginComponent,
    UpdateClientComponent,
    DashboardComponent,
    HeartbeatChartComponent,
    HomeComponent,
    ContactComponent,

    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DafaultModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgApexchartsModule,
    NgChartsModule,
    MatMenuModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    NgxPaginationModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    DashboardComponent,
    HeartbeatChartComponent

  ],
  providers: [ClientBoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
