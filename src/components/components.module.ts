import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContainerComponent } from './container/container';
import { IonicPageModule } from "ionic-angular";
@NgModule({
	declarations: [ContainerComponent],
	imports: [IonicPageModule.forChild(ContainerComponent)],
	exports: [ContainerComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
