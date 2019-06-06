import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ContainerComponent } from './container/container';
import { IonicPageModule } from "ionic-angular";
import { StatsComponent } from './stats/stats';
import { LogsComponent } from './logs/logs';
@NgModule({
	declarations: [ContainerComponent,
	StatsComponent,
	LogsComponent],
	imports: [IonicPageModule.forChild(ContainerComponent)],
	exports: [ContainerComponent,
	StatsComponent,
	LogsComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
