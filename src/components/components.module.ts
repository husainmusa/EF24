import { TranslateService } from '@ngx-translate/core';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedHeaderComponent } from './shared-header/shared-header';
import { IonicPageModule,IonicModule } from 'ionic-angular';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export function createTranslateLoader(http: Http) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
	declarations: [SharedHeaderComponent],
	exports: [SharedHeaderComponent],
	imports: [
		CommonModule,
		IonicPageModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forRoot({
			loader: {
			  provide: TranslateLoader,
			  useFactory: (createTranslateLoader),
			  deps: [Http]
			}
		  }),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
	
})
export class ComponentsModule {}
