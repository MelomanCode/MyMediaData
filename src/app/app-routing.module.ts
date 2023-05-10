import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelEditorComponent } from './admin-panel/admin-panel-editor/admin-panel-editor.component';
import { AdminPanelListComponent } from './admin-panel/admin-panel-list/admin-panel-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'admin-panel-editor', component: AdminPanelEditorComponent },
  { path: 'admin-panel-list', component: AdminPanelListComponent },
  { path: '**', redirectTo: 'home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
