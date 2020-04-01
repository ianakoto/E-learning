import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video/video.component';
import { NotesComponent } from './notes/notes.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatProgressBar } from '@angular/material/progress-bar';


@NgModule({
  declarations: [VideoComponent, NotesComponent, ExerciseComponent],
  imports: [
    MatProgressBar,
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CKEditorModule,

  ]
})
export class ShareddialogModule { }
