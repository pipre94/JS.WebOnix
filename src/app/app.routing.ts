import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { ConstructionCompanyComponent } from './components/construction-company/construction-company.component'
import { LegalAdviceComponent } from './components/legal-advice/legal-advice.component'
import { RealEstateComponent } from './components/real-estate/real-estate.component'
import { OurPropertiesComponent } from './components/our-properties/our-properties.component'
import { OurProjectsComponent } from './components/our-projects/our-projects.component'
import { AsesoriaComponent } from './components/asesoria/asesoria.component';
import { ViewPropertiesComponent } from './components/our-properties/view-properties/view-properties.component';
import { AddPropertiesComponent } from './components/add-properties/add-properties.component';
import { UsersComponent } from './components/users/users.component';
import { TextGeneralComponent } from './components/text-general/text-general.component';
import { InfoFormsComponent } from './components/info-forms/info-forms.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'administration',             component: SignupComponent },
    { path: 'menu-option',             component: AdminMenuComponent },
    { path: 'construction-company',     component: ConstructionCompanyComponent },
    { path: 'legal-advice',           component: LegalAdviceComponent },
    { path: 'real-estate',          component: RealEstateComponent },
    { path: 'properties',      component: OurPropertiesComponent },
    { path: 'advice',      component: AsesoriaComponent },
    { path: 'our-projects',      component: OurProjectsComponent },
    { path: 'view-properties/:id',      component: ViewPropertiesComponent },
    { path: 'add-properties',      component: AddPropertiesComponent },
    { path: 'users',      component: UsersComponent },
    { path: 'text-general',      component: TextGeneralComponent },
    { path: 'info-forms',      component: InfoFormsComponent },
    { path: 'add-properties',      component: AddPropertiesComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
