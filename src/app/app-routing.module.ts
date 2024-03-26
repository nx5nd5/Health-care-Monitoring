import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DafaultComponent } from './layouts/dafault/dafault.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { CreateClientComponent } from "./components/create/create-client/create-client.component";
import { ClientListComponent } from "./components/client-list.component";
import { ClientDetailComponent } from "./components/client-details.component";
import { HeartbeatChartComponent } from "./components/heartbeat-chart.component";
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { UpdateClientComponent } from './components/update/update-client/update-client.component';
import { AdminGuard } from 'src/app/services/admin.guard';
import { UserGuard } from 'src/app/services/user.guard';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'home', component:HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
 
    {
      path: 'def',
      component: DafaultComponent,
  
      canActivate: [AuthGuard,UserGuard], // UserGuard allows access to all child routes for non-admin users
      children: [
        { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
        { path: 'Dashboard', component: DashboardComponent ,canActivate: [AuthGuard] },
        // { path: 'client/:id', component: ClientDetailComponent }
        // Add other routes for user-only pages here
      ]
    },
    {
      path: 'def',
      component: DafaultComponent,
      canActivate: [AuthGuard,AdminGuard], // AdminGuard allows access to all child routes for admin users
      children: [
        { path: 'clients', component: ClientListComponent },
        { path: 'CreateClient', component: CreateClientComponent },
        { path: 'UpdateClient', component: UpdateClientComponent },
        { path: 'heartbeats', component: HeartbeatChartComponent },
        { path: 'client/:id', component: ClientDetailComponent },
        // Add other routes for admin-only pages here
      ]
    },
    // Add any other routes outside of 'def' here
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}