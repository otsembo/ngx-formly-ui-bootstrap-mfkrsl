import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ToSentencePipe } from './pipes/to-sentence.pipe';

@NgModule({
  imports: [ 
    BrowserModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
  ],
  declarations: [ AppComponent, FormComponent, ToSentencePipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
