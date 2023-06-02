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

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent },
    { path: 'construction-company',     component: ConstructionCompanyComponent },
    { path: 'legal-advice',           component: LegalAdviceComponent },
    { path: 'real-estate',          component: RealEstateComponent },
    { path: 'properties',      component: OurPropertiesComponent },
    { path: 'advice',      component: AsesoriaComponent },
    { path: 'our-projects',      component: OurProjectsComponent },
    { path: 'view-properties/:id',      component: ViewPropertiesComponent },
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
