import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {Lesson} from '../model/lesson';
import {Meta, Title} from '@angular/platform-browser';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  standalone: true,
  imports: [NgIf, MatProgressSpinnerModule, MatTableModule],
})
export class CourseComponent implements OnInit {
  course!: Course;

  dataSource!: MatTableDataSource<Lesson>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];

    this.title.setTitle(this.course.description);

    this.meta.updateTag({name: 'description', content: this.course.longDescription});

    this.meta.addTag({name: 'twitter:card', content: 'summary'});
    this.meta.addTag({name: 'twitter:site', content: '@AngularUniv'});
    this.meta.addTag({name: 'twitter:title', content: this.course.description});
    this.meta.addTag({name: 'twitter:description', content: this.course.description});
    this.meta.addTag({name: 'twitter:text:description', content: this.course.description});
    this.meta.addTag({
      name: 'twitter:image',
      content: 'https://avatars3.githubusercontent.com/u/16628445?v=3&s=200',
    });

    // TODO: barisd: any yapma
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.dataSource = new MatTableDataSource([]) as any;

    this.coursesService
      .findAllCourseLessons$(this.course.id)
      .subscribe((lessons) => (this.dataSource.data = lessons));
  }
}
