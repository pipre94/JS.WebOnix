import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';

import { BasicelementsComponent } from './basicelements/basicelements.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TypographyComponent } from './typography/typography.component';
import { NucleoiconsComponent } from './nucleoicons/nucleoicons.component';
import { ComponentsComponent } from './components.component';
import { NotificationComponent } from './notification/notification.component';
import { NgbdModalComponent } from './modal/modal.component';
import { NgbdModalContent } from './modal/modal.component';
import { ConstructionCompanyComponent } from './construction-company/construction-company.component';
import { OurPropertiesComponent } from './our-properties/our-properties.component';
import { OurProjectsComponent } from './our-projects/our-projects.component';
import { LegalAdviceComponent } from './legal-advice/legal-advice.component';
import { RealEstateComponent } from './real-estate/real-estate.component';
import { AsesoriaComponent } from './asesoria/asesoria.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ViewPropertiesComponent } from './our-properties/view-properties/view-properties.component';
import { UsersComponent } from './users/users.component';
import { AddPropertiesComponent } from './add-properties/add-properties.component';
import { TextGeneralComponent } from './text-general/text-general.component';
import { InfoFormsComponent } from './info-forms/info-forms.component';
import { SignupComponent } from './signup/signup.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import {GoogleMapsModule} from '@angular/google-maps'; 

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        NgImageSliderModule,
        GoogleMapsModule
    ],
    declarations: [
        ComponentsComponent,
        BasicelementsComponent,
        NavigationComponent,
        TypographyComponent,
        NucleoiconsComponent,
        NotificationComponent,
        NgbdModalComponent,
        NgbdModalContent,
        ConstructionCompanyComponent,
        OurPropertiesComponent,
        OurProjectsComponent,
        LegalAdviceComponent,
        RealEstateComponent,
        AsesoriaComponent,
        ViewPropertiesComponent,
        UsersComponent,
        AddPropertiesComponent,
        TextGeneralComponent,
        InfoFormsComponent,
        SignupComponent,
        AdminMenuComponent
    ],
    entryComponents: [NgbdModalContent],
    exports:[ ComponentsComponent,NgbdModalComponent ]
})
export class ComponentsModule { }
