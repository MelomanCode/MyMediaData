import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPanelListComponent } from './admin-panel/admin-panel-list/admin-panel-list.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthenticationComponent } from './auth/authentication/authentication.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'admin-panel-list',
    component: AdminPanelListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'authentication', component: AuthenticationComponent },
  { path: '**', redirectTo: 'home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
