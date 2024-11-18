import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {CoursesService} from './courses.service';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseResolver implements Resolve<Course> {
  constructor(private coursesService: CoursesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Course> {
    const courseId = route.params['id'];

    return this.coursesService.findCourseById$(courseId).pipe(first());
  }
}
