import {HomeComponent} from './page/home/home.component';
import {CourseComponent} from './feature/course/course.component';
import {CourseResolver} from './services/course.resolver';
import {AboutComponent} from './feature/about/about.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
    resolve: {
      course: CourseResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
