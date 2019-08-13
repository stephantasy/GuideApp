import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewGuideComponent } from './pages/new-guide/new-guide.component';
import { EditGuideComponent } from './pages/edit-guide/edit-guide.component';
import { ShowGuideComponent } from './pages/show-guide/show-guide.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'guide', component: HomeComponent},
    {path: 'guide/new', component: NewGuideComponent},
    {path: 'guide/edit/:id', component: EditGuideComponent},
    {path: 'guide/:id', component: ShowGuideComponent},
    {path: '**', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

