import {Component, OnInit} from '@angular/core';
import {Course} from '../../model/course';
import {Observable, of} from 'rxjs';
import {CoursesService} from '../../services/courses.service';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {CoursesCardListComponent} from '../../feature/course/courses-card-list/courses-card-list.component';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatTabsModule, CoursesCardListComponent, AsyncPipe],
})
export class HomeComponent implements OnInit {
  courses$: Observable<Course[]> = of([]);

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.courses$ = this.coursesService.findAllCourses$().pipe(map(Object.values));
  }
}
