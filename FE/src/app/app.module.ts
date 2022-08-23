import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './modules/materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganisationComponent } from './components/organisation/organisation.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidebarComponent } from './components/navigation/sidebar/sidebar.component';
import { TransactionsComponent } from './components/transactions/transactions.component';

import { AuthService } from "./shared/services/auth.service";

//------------- Upload Image Component ----------------------------//
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { DragDropDirectiveDirective } from './components/upload-image/drag-drop-directive/drag-drop-directive.directive';
//--------------------------------------------------------------------//

//-------------------- FireBase libs ---------------------------------------//
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//---------------------------------------------------------------------------//
import { environment } from '../environments/environment';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { TempPageComponent } from './components/authentication/temp-page/temp-page.component';
import { MainComponent } from './components/main/main.component';

const config = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    OrganisationComponent,
    UploadImageComponent,
    DragDropDirectiveDirective,
    SignInComponent,
    ForgotPasswordComponent,
    TempPageComponent,
    HeaderComponent,
    SidebarComponent,
    TransactionsComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => getFirestore()),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FlexLayoutModule,
    ReactiveFormsModule,


  ],
  exports: [
    AngularFireStorageModule,

  ],
  providers: [
    { provide: BUCKET, useValue: environment.firebaseConfig.storageBucket },AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
