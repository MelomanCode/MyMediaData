import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HomeComponent } from './home/home.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPanelEditorComponent } from './admin-panel/admin-panel-editor/admin-panel-editor.component';
import { AdminPanelListComponent } from './admin-panel/admin-panel-list/admin-panel-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseconfig } from '../firebaseconfig';
import { NavbarComponent } from './navbar/navbar.component';
import { DescriptionFileComponent } from './description-file/description-file-component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    AdminPanelComponent,
    AdminPanelEditorComponent,
    AdminPanelListComponent,
    HomeComponent,
    NavbarComponent,
    DescriptionFileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NgOptimizedImage,
    NgbModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseconfig),
    AngularFirestoreModule,
  ],
  providers: [],
})
export class AppModule {}
