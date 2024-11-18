import {HomeComponent} from "./home/home.component";
import {CourseComponent} from "./course/course.component";
import {CourseResolver} from "./services/course.resolver";
import {AboutComponent} from './about/about.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent

  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
    resolve: {
      course: CourseResolver
    }
  },
  {
    path: "**",
    redirectTo: '/'
  }
];


