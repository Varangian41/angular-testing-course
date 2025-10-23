import { CoursesService } from "./courses.service";
import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";
import { COURSES } from "../../../../server/db-data";

describe('CoursesService', () => {

  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })

    coursesService = TestBed.inject(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })

  it('Should retrieve all courses', () => {
    coursesService.findAllCourses().subscribe((courses) => {
      expect(courses).toBeTruthy('No courses returned');
      expect(courses.length).toBe(12, 'Incorrect number of courses');

      const course = courses.find((course) => course.id === 12);

      expect(course.titles.description).toBe('Angular Testing Course', 'Incorrect course name');
    })

    const request = httpTestingController.expectOne('/api/courses');

    expect(request.request.method).toEqual('GET');

    request.flush({payload: Object.values(COURSES)});
  })

  it('Should retrieve single course', () => {
    coursesService.findCourseById(12).subscribe((course) => {
      expect(course).toBeTruthy('No courses returned');
      expect(course.id).toBe(12);

      expect(course.titles.description).toBe('Angular Testing Course', 'Incorrect course name');
    })

    const request = httpTestingController.expectOne(`/api/courses/${12}`);

    expect(request.request.method).toEqual('GET');

    request.flush(COURSES[12]);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

})
