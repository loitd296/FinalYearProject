# FinalYearProject
```
SchoolManagament
├─ .env
├─ app
│  └─ app.js
├─ config
│  └─ dbConnect.js
├─ controller
│  ├─ academics
│  │  ├─ academicTermCtrl.js
│  │  ├─ academicYearCtrl.js
│  │  ├─ categoryCtrl.js
│  │  ├─ classLevel.js
│  │  ├─ examResults.js
│  │  ├─ examsCtrl.js
│  │  ├─ programs.js
│  │  ├─ questionsCtrl.js
│  │  ├─ subjects.js
│  │  └─ yearGroups.js
│  ├─ staff
│  │  ├─ adminCtrl.js
│  │  └─ teachersCtrl.js
│  └─ students
│     └─ studentsCtrl.js
├─ middlewares
│  ├─ globalErrorHandler.js
│  ├─ isAdmin.js
│  ├─ isLogin.js
│  ├─ isStudent.js
│  ├─ isStudentLogin.js
│  ├─ isTeacher.js
│  └─ isTeacherLogin.js
├─ model
│  ├─ Academic
│  │  ├─ AcademicTerm.js
│  │  ├─ AcademicYear.js
│  │  ├─ Categories.js
│  │  ├─ ClassLevel.js
│  │  ├─ Exam.js
│  │  ├─ ExamResults.js
│  │  ├─ Program.js
│  │  ├─ Questions.js
│  │  ├─ Student.js
│  │  ├─ Subject.js
│  │  └─ YearGroup.js
│  └─ Staff
│     ├─ Admin.js
│     └─ Teacher.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ bootrap
│  ├─ css
│  │  ├─ bootstrap.min.css
│  │  ├─ bootstrap.min.css.map
│  │  ├─ paper-dashboard.css
│  │  ├─ paper-dashboard.css.map
│  │  ├─ paper-dashboard.min.css
│  │  ├─ style-for-admin-page.css
│  │  ├─ style.css
│  │  ├─ style.min.css
│  │  ├─ style1.css
│  │  └─ style1.min.css
│  ├─ fonts
│  │  ├─ nucleo-icons.eot
│  │  ├─ nucleo-icons.ttf
│  │  ├─ nucleo-icons.woff
│  │  └─ nucleo-icons.woff2
│  ├─ img
│  │  ├─ about-1.jpg
│  │  ├─ about-2.jpg
│  │  ├─ about.jpg
│  │  ├─ apple-icon.png
│  │  ├─ bg-image.jpg
│  │  ├─ bg5.jpg
│  │  ├─ blog-1.jpg
│  │  ├─ blog-2.jpg
│  │  ├─ blog-3.jpg
│  │  ├─ carousel-1.jpg
│  │  ├─ carousel-2.jpg
│  │  ├─ cat-1.jpg
│  │  ├─ cat-2.jpg
│  │  ├─ cat-3.jpg
│  │  ├─ cat-4.jpg
│  │  ├─ class-1.jpg
│  │  ├─ class-2.jpg
│  │  ├─ class-3.jpg
│  │  ├─ course-1.jpg
│  │  ├─ course-2.jpg
│  │  ├─ course-3.jpg
│  │  ├─ courses-1.jpg
│  │  ├─ courses-2.jpg
│  │  ├─ courses-3.jpg
│  │  ├─ courses-4.jpg
│  │  ├─ courses-5.jpg
│  │  ├─ courses-6.jpg
│  │  ├─ courses-80x80.jpg
│  │  ├─ damir-bosnjak.jpg
│  │  ├─ default-avatar.png
│  │  ├─ detail.jpg
│  │  ├─ faces
│  │  │  ├─ ayo-ogunseinde-1.jpg
│  │  │  ├─ ayo-ogunseinde-2.jpg
│  │  │  ├─ clem-onojeghuo-1.jpg
│  │  │  ├─ clem-onojeghuo-2.jpg
│  │  │  ├─ clem-onojeghuo-3.jpg
│  │  │  ├─ clem-onojeghuo-4.jpg
│  │  │  ├─ erik-lucatero-1.jpg
│  │  │  ├─ erik-lucatero-2.jpg
│  │  │  ├─ joe-gardner-1.jpg
│  │  │  ├─ joe-gardner-2.jpg
│  │  │  ├─ kaci-baum-1.jpg
│  │  │  └─ kaci-baum-2.jpg
│  │  ├─ favicon.png
│  │  ├─ feature.jpg
│  │  ├─ header.jpg
│  │  ├─ header.png
│  │  ├─ jan-sendereks.jpg
│  │  ├─ logo-small.png
│  │  ├─ mike.jpg
│  │  ├─ overlay-bottom.png
│  │  ├─ overlay-top.png
│  │  ├─ page-header.jpg
│  │  ├─ portfolio-1.jpg
│  │  ├─ portfolio-2.jpg
│  │  ├─ portfolio-3.jpg
│  │  ├─ portfolio-4.jpg
│  │  ├─ portfolio-5.jpg
│  │  ├─ portfolio-6.jpg
│  │  ├─ post-1.jpg
│  │  ├─ post-2.jpg
│  │  ├─ post-3.jpg
│  │  ├─ school-new-1.jpeg
│  │  ├─ school-new-2.jpeg
│  │  ├─ school-new-3.jpeg
│  │  ├─ team-1.jpg
│  │  ├─ team-2.jpg
│  │  ├─ team-3.jpg
│  │  ├─ team-4.jpg
│  │  ├─ testimonial-1.jpg
│  │  ├─ testimonial-2.jpg
│  │  ├─ testimonial-3.jpg
│  │  ├─ testimonial-4.jpg
│  │  ├─ user.jpg
│  │  └─ wepik-export-202306120714449OSH.png
│  ├─ js
│  │  ├─ core
│  │  │  ├─ bootstrap.min.js
│  │  │  ├─ jquery.min.js
│  │  │  └─ popper.min.js
│  │  ├─ main.js
│  │  ├─ paper-dashboard.js
│  │  ├─ paper-dashboard.js.map
│  │  ├─ paper-dashboard.min.js
│  │  └─ plugins
│  │     ├─ bootstrap-notify.js
│  │     ├─ chartjs.min.js
│  │     └─ perfect-scrollbar.jquery.min.js
│  ├─ lib
│  │  ├─ animate
│  │  │  ├─ animate.css
│  │  │  └─ animate.min.css
│  │  ├─ counterup
│  │  │  └─ counterup.min.js
│  │  ├─ easing
│  │  │  ├─ easing.js
│  │  │  └─ easing.min.js
│  │  ├─ flaticon
│  │  │  ├─ font
│  │  │  │  ├─ flaticon.css
│  │  │  │  ├─ flaticon.html
│  │  │  │  ├─ Flaticon.svg
│  │  │  │  ├─ Flaticon.ttf
│  │  │  │  ├─ Flaticon.woff
│  │  │  │  ├─ Flaticon.woff2
│  │  │  │  └─ _flaticon.scss
│  │  │  └─ license
│  │  │     └─ license.pdf
│  │  ├─ isotope
│  │  │  ├─ isotope.pkgd.js
│  │  │  └─ isotope.pkgd.min.js
│  │  ├─ lightbox
│  │  │  ├─ css
│  │  │  │  ├─ lightbox.css
│  │  │  │  └─ lightbox.min.css
│  │  │  ├─ images
│  │  │  │  ├─ close.png
│  │  │  │  ├─ loading.gif
│  │  │  │  ├─ next.png
│  │  │  │  └─ prev.png
│  │  │  ├─ js
│  │  │  │  ├─ lightbox.js
│  │  │  │  └─ lightbox.min.js
│  │  │  └─ links.php
│  │  ├─ owlcarousel
│  │  │  ├─ assets
│  │  │  │  ├─ ajax-loader.gif
│  │  │  │  ├─ owl.carousel.css
│  │  │  │  ├─ owl.carousel.min.css
│  │  │  │  ├─ owl.theme.default.css
│  │  │  │  ├─ owl.theme.default.min.css
│  │  │  │  ├─ owl.theme.green.css
│  │  │  │  ├─ owl.theme.green.min.css
│  │  │  │  └─ owl.video.play.png
│  │  │  ├─ LICENSE
│  │  │  ├─ owl.carousel.js
│  │  │  └─ owl.carousel.min.js
│  │  ├─ tempusdominus
│  │  │  ├─ css
│  │  │  │  ├─ tempusdominus-bootstrap-4.css
│  │  │  │  └─ tempusdominus-bootstrap-4.min.css
│  │  │  └─ js
│  │  │     ├─ moment-timezone.min.js
│  │  │     ├─ moment.min.js
│  │  │     ├─ tempusdominus-bootstrap-4.js
│  │  │     └─ tempusdominus-bootstrap-4.min.js
│  │  ├─ waypoints
│  │  │  ├─ links.php
│  │  │  └─ waypoints.min.js
│  │  └─ wow
│  │     ├─ wow.js
│  │     └─ wow.min.js
│  ├─ mail
│  │  ├─ contact.js
│  │  ├─ contact.php
│  │  └─ jqBootstrapValidation.min.js
│  └─ scss
│     ├─ bootstrap
│     │  └─ scss
│     │     ├─ bootstrap-grid.scss
│     │     ├─ bootstrap-reboot.scss
│     │     ├─ bootstrap-utilities.scss
│     │     ├─ bootstrap.scss
│     │     ├─ forms
│     │     │  ├─ _floating-labels.scss
│     │     │  ├─ _form-check.scss
│     │     │  ├─ _form-control.scss
│     │     │  ├─ _form-range.scss
│     │     │  ├─ _form-select.scss
│     │     │  ├─ _form-text.scss
│     │     │  ├─ _input-group.scss
│     │     │  ├─ _labels.scss
│     │     │  └─ _validation.scss
│     │     ├─ helpers
│     │     │  ├─ _clearfix.scss
│     │     │  ├─ _colored-links.scss
│     │     │  ├─ _position.scss
│     │     │  ├─ _ratio.scss
│     │     │  ├─ _stretched-link.scss
│     │     │  ├─ _text-truncation.scss
│     │     │  └─ _visually-hidden.scss
│     │     ├─ mixins
│     │     │  ├─ _alert.scss
│     │     │  ├─ _background-variant.scss
│     │     │  ├─ _badge.scss
│     │     │  ├─ _border-radius.scss
│     │     │  ├─ _box-shadow.scss
│     │     │  ├─ _breakpoints.scss
│     │     │  ├─ _buttons.scss
│     │     │  ├─ _caret.scss
│     │     │  ├─ _clearfix.scss
│     │     │  ├─ _color-scheme.scss
│     │     │  ├─ _container.scss
│     │     │  ├─ _deprecate.scss
│     │     │  ├─ _float.scss
│     │     │  ├─ _forms.scss
│     │     │  ├─ _gradients.scss
│     │     │  ├─ _grid-framework.scss
│     │     │  ├─ _grid.scss
│     │     │  ├─ _hover.scss
│     │     │  ├─ _image.scss
│     │     │  ├─ _list-group.scss
│     │     │  ├─ _lists.scss
│     │     │  ├─ _nav-divider.scss
│     │     │  ├─ _pagination.scss
│     │     │  ├─ _reset-text.scss
│     │     │  ├─ _resize.scss
│     │     │  ├─ _screen-reader.scss
│     │     │  ├─ _size.scss
│     │     │  ├─ _table-row.scss
│     │     │  ├─ _table-variants.scss
│     │     │  ├─ _text-emphasis.scss
│     │     │  ├─ _text-hide.scss
│     │     │  ├─ _text-truncate.scss
│     │     │  ├─ _transition.scss
│     │     │  ├─ _utilities.scss
│     │     │  ├─ _visibility.scss
│     │     │  └─ _visually-hidden.scss
│     │     ├─ utilities
│     │     │  ├─ _align.scss
│     │     │  ├─ _api.scss
│     │     │  ├─ _background.scss
│     │     │  ├─ _borders.scss
│     │     │  ├─ _clearfix.scss
│     │     │  ├─ _display.scss
│     │     │  ├─ _embed.scss
│     │     │  ├─ _flex.scss
│     │     │  ├─ _float.scss
│     │     │  ├─ _interactions.scss
│     │     │  ├─ _overflow.scss
│     │     │  ├─ _position.scss
│     │     │  ├─ _screenreaders.scss
│     │     │  ├─ _shadows.scss
│     │     │  ├─ _sizing.scss
│     │     │  ├─ _spacing.scss
│     │     │  ├─ _stretched-link.scss
│     │     │  ├─ _text.scss
│     │     │  └─ _visibility.scss
│     │     ├─ vendor
│     │     │  └─ _rfs.scss
│     │     ├─ _accordion.scss
│     │     ├─ _alert.scss
│     │     ├─ _badge.scss
│     │     ├─ _breadcrumb.scss
│     │     ├─ _button-group.scss
│     │     ├─ _buttons.scss
│     │     ├─ _card.scss
│     │     ├─ _carousel.scss
│     │     ├─ _close.scss
│     │     ├─ _code.scss
│     │     ├─ _containers.scss
│     │     ├─ _custom-forms.scss
│     │     ├─ _dropdown.scss
│     │     ├─ _forms.scss
│     │     ├─ _functions.scss
│     │     ├─ _grid.scss
│     │     ├─ _helpers.scss
│     │     ├─ _images.scss
│     │     ├─ _input-group.scss
│     │     ├─ _jumbotron.scss
│     │     ├─ _list-group.scss
│     │     ├─ _media.scss
│     │     ├─ _mixins.scss
│     │     ├─ _modal.scss
│     │     ├─ _nav.scss
│     │     ├─ _navbar.scss
│     │     ├─ _offcanvas.scss
│     │     ├─ _pagination.scss
│     │     ├─ _popover.scss
│     │     ├─ _print.scss
│     │     ├─ _progress.scss
│     │     ├─ _reboot.scss
│     │     ├─ _root.scss
│     │     ├─ _spinners.scss
│     │     ├─ _tables.scss
│     │     ├─ _toasts.scss
│     │     ├─ _tooltip.scss
│     │     ├─ _transitions.scss
│     │     ├─ _type.scss
│     │     ├─ _utilities.scss
│     │     └─ _variables.scss
│     ├─ bootstrap.scss
│     ├─ paper-dashboard
│     │  ├─ cards
│     │  │  ├─ _card-chart.scss
│     │  │  ├─ _card-map.scss
│     │  │  ├─ _card-plain.scss
│     │  │  ├─ _card-stats.scss
│     │  │  └─ _card-user.scss
│     │  ├─ mixins
│     │  │  ├─ _buttons.scss
│     │  │  ├─ _cards.scss
│     │  │  ├─ _dropdown.scss
│     │  │  ├─ _inputs.scss
│     │  │  ├─ _page-header.scss
│     │  │  ├─ _transparency.scss
│     │  │  └─ _vendor-prefixes.scss
│     │  ├─ plugins
│     │  │  ├─ _plugin-animate-bootstrap-notify.scss
│     │  │  └─ _plugin-perfect-scrollbar.scss
│     │  ├─ _alerts.scss
│     │  ├─ _animated-buttons.scss
│     │  ├─ _buttons.scss
│     │  ├─ _cards.scss
│     │  ├─ _checkboxes-radio.scss
│     │  ├─ _dropdown.scss
│     │  ├─ _fixed-plugin.scss
│     │  ├─ _footers.scss
│     │  ├─ _images.scss
│     │  ├─ _inputs.scss
│     │  ├─ _misc.scss
│     │  ├─ _mixins.scss
│     │  ├─ _navbar.scss
│     │  ├─ _nucleo-outline.scss
│     │  ├─ _page-header.scss
│     │  ├─ _responsive.scss
│     │  ├─ _sidebar-and-main-panel.scss
│     │  ├─ _tables.scss
│     │  ├─ _typography.scss
│     │  └─ _variables.scss
│     ├─ paper-dashboard.scss
│     └─ style.scss
├─ README.md
├─ routes
│  ├─ academics
│  │  ├─ academicTerm.js
│  │  ├─ academicYear.js
│  │  ├─ category.js
│  │  ├─ classLevel.js
│  │  ├─ examResultRoute.js
│  │  ├─ examRoutes.js
│  │  ├─ program.js
│  │  ├─ questionRoutes.js
│  │  ├─ subjects.js
│  │  ├─ userRouter.js
│  │  └─ yearGroups.js
│  ├─ staff
│  │  ├─ adminRouter.js
│  │  └─ teachers.js
│  └─ student
│     └─ student.js
├─ server.js
├─ utils
│  ├─ generateToken.js
│  ├─ helpers.js
│  └─ verifyToken.js
└─ views
   ├─ academic-term
   │  ├─ academicTerm.hbs
   │  ├─ createAcademicTerm.hbs
   │  ├─ deleteAcademicTerm.hbs
   │  ├─ index.hbs
   │  └─ updateAcademicTerms.hbs
   ├─ academic-years
   │  ├─ academicYear.hbs
   │  ├─ createAcademicYear.hbs
   │  ├─ deleteAcademicYear.hbs
   │  ├─ index.hbs
   │  └─ updateAcademicYear.hbs
   ├─ admin
   │  ├─ admin-login.hbs
   │  ├─ admin-profile.hbs
   │  ├─ admin-register.hbs
   │  ├─ deleteTeacher.hbs
   │  └─ index.hbs
   ├─ category
   │  ├─ category.hbs
   │  ├─ createCategory.hbs
   │  ├─ deleteCategory.hbs
   │  ├─ index.hbs
   │  └─ updateCategory.hbs
   ├─ class-level
   │  ├─ classLevel.hbs
   │  ├─ createClassLevel.hbs
   │  ├─ deleteClassLevel.hbs
   │  ├─ index.hbs
   │  └─ updateClassLevel.hbs
   ├─ exam
   │  ├─ add-question.hbs
   │  ├─ attach-question.hbs
   │  ├─ createExam.hbs
   │  ├─ exam.hbs
   │  ├─ index.hbs
   │  └─ updateExam.hbs
   ├─ exam-result
   │  ├─ index.hbs
   │  └─ student-check-result.hbs
   ├─ layouts
   │  └─ main.hbs
   ├─ partials
   │  ├─ footer.hbs
   │  ├─ header.hbs
   │  └─ header_admin.hbs
   ├─ program
   │  ├─ createProgram.hbs
   │  ├─ deleteProgram.hbs
   │  ├─ index.hbs
   │  ├─ program.hbs
   │  └─ updateProgram.hbs
   ├─ question
   │  ├─ createQuestion.hbs
   │  ├─ index.hbs
   │  ├─ question.hbs
   │  ├─ selectExam.hbs
   │  └─ updateQuestion.hbs
   ├─ student
   │  ├─ admin-update-student.hbs
   │  ├─ adminRegisterStudent.hbs
   │  ├─ index.hbs
   │  ├─ selectExam.hbs
   │  ├─ student-home-page.hbs
   │  ├─ student-login.hbs
   │  ├─ student-profile.hbs
   │  ├─ student-take-exam.hbs
   │  └─ student.hbs
   ├─ subject
   │  ├─ createSubject.hbs
   │  ├─ deleteSubject.hbs
   │  ├─ index.hbs
   │  ├─ subject.hbs
   │  └─ updateSubject.hbs
   ├─ teacher
   │  ├─ admin-update-teacher.hbs
   │  ├─ deleteTeacher.hbs
   │  ├─ index.hbs
   │  ├─ teacher-login.hbs
   │  ├─ teacher-profile.hbs
   │  ├─ teacher-register.hbs
   │  └─ teacher.hbs
   ├─ user
   │  ├─ about.hbs
   │  └─ index.hbs
   └─ year-group
      ├─ createYearGroup.hbs
      ├─ deleteYearGroup.hbs
      ├─ index.hbs
      ├─ updateYearGroup.hbs
      └─ yearGroup.hbs

```