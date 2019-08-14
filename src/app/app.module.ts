import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Services
import { GuideService } from './services/guide.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { EditGuideComponent } from './pages/edit-guide/edit-guide.component';
import { NewGuideComponent } from './pages/new-guide/new-guide.component';
import { ShowGuideComponent } from './pages/show-guide/show-guide.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EditGuideComponent,
    NewGuideComponent,
    ShowGuideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    GuideService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
