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
```
SchoolManagament
├─ .git
│  ├─ .COMMIT_EDITMSG.swp
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  ├─ exclude
│  │  └─ refs
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ main
│  │     │  └─ master
│  │     └─ remotes
│  │        └─ origin
│  │           ├─ main
│  │           └─ master
│  ├─ objects
│  │  ├─ 01
│  │  │  └─ 03674b9eb02e6129cb3d51b0f6187a028f0369
│  │  ├─ 07
│  │  │  └─ 8ceca6f563de519bf983b328eee4d4634e99ac
│  │  ├─ 0b
│  │  │  └─ 27edc50243c7f8e6ac7192aa1325e4835f1fc8
│  │  ├─ 10
│  │  │  └─ c658f3e535dfffc3f83bf0f9419c25cee0775c
│  │  ├─ 12
│  │  │  └─ 0a8980554f83791c1c2c97889072ce6072c81e
│  │  ├─ 13
│  │  │  ├─ 39b6c3bb629aaee1c7e5f8a633371cb7efc9a8
│  │  │  └─ bc7653a75e988f4efae5f4d9db7fe0dbb4da37
│  │  ├─ 14
│  │  │  └─ c1554c0c3eea670417c9c35111b53808b6b20b
│  │  ├─ 15
│  │  │  └─ f906bdc4f03be1db48d75ef81f69db6acd3971
│  │  ├─ 16
│  │  │  └─ 7da356fa7b1f195a39bfcd2dd725f503c9603b
│  │  ├─ 18
│  │  │  ├─ 0f26db0557fc46ecc45add219744d7fe137795
│  │  │  └─ c6e8053e97426378901db7ee421fb6728d9e41
│  │  ├─ 1a
│  │  │  └─ 272b0936af724f57d1918054b6ee62b035374e
│  │  ├─ 1f
│  │  │  ├─ c7acea3d4fa32331df05b918087b1276b2bd6e
│  │  │  └─ eb2d380ef1b6d36cfb64a5a8ff804be626e9b4
│  │  ├─ 22
│  │  │  ├─ 0c9cd84c1aa88b5f45efce06c8d62349e363d0
│  │  │  └─ a26f9fd58f84538d68d72692acf0e3eea2c8b0
│  │  ├─ 25
│  │  │  └─ fc4ac506e34b72bdb14aaa91d1111e8a71c4b5
│  │  ├─ 28
│  │  │  └─ a5ee5f5878d9c76accae8dee2c317fca5b26c5
│  │  ├─ 2a
│  │  │  └─ 636204f1298868e7abff6a49ee830639843ad4
│  │  ├─ 2c
│  │  │  ├─ 59cc7beac1f6f3c8262aefc782048a5f1abfce
│  │  │  └─ 969885b94e9e47d9a897ab9314ca05fcf49dcb
│  │  ├─ 2d
│  │  │  ├─ 058f5e8f09f9beac34ccb294782c78b3375ddd
│  │  │  └─ e2ea3fd24586df70332427b6ef042c96a0b26b
│  │  ├─ 2e
│  │  │  └─ cc06b3e53f00e617aa7b9592052ccf4c3fb140
│  │  ├─ 35
│  │  │  └─ 2a46d2c5c4126855f75bacb423176a8259e927
│  │  ├─ 37
│  │  │  └─ d7e734864bd350186d5b907e57928a91cf2244
│  │  ├─ 39
│  │  │  └─ c7baa6886931ef400652c1bd3deb9fda4780e2
│  │  ├─ 3c
│  │  │  └─ 04ef66211c110a2fd69d57dee2443c7715f2fe
│  │  ├─ 3d
│  │  │  └─ a84e81e1321845cd091979fd8e24706d75454d
│  │  ├─ 3e
│  │  │  └─ 00ba7d089fc84050c8d39713d2ea4d64bdd621
│  │  ├─ 3f
│  │  │  └─ f9436996e378b2bb3daa873a22cf0295f85f8e
│  │  ├─ 49
│  │  │  ├─ 844ccb7369689ac6b4b653be43ac4cb9387ae4
│  │  │  └─ ef0fbdaf1972702a91bc208d31c3b7d8bf2535
│  │  ├─ 4a
│  │  │  └─ 3930db467851404f76b7b99ebc2d29001c8a8a
│  │  ├─ 4c
│  │  │  └─ 05243f2439e6f925631acf9a7a87f598f609bd
│  │  ├─ 4d
│  │  │  └─ e22f4ee01fc0e3c2c25c7996906d63d3991967
│  │  ├─ 4f
│  │  │  └─ c3ecb830b4a39d8e553b72373c45476c9aa1a8
│  │  ├─ 50
│  │  │  └─ ad38fb674fd9323b00c25fa5c05433a52a0e27
│  │  ├─ 51
│  │  │  ├─ 9beace176aa0662b38378b221bc4510978344e
│  │  │  └─ de1537f61ed9310e071ea71926d397f5547d07
│  │  ├─ 52
│  │  │  └─ b140fe5fd900869d9775f3631e6b464644ff98
│  │  ├─ 53
│  │  │  ├─ a85d2c7c54db8c1bf3452af85015a4442c79b0
│  │  │  ├─ c4458ca564c02e459691bbdf58c887f8cd3a23
│  │  │  └─ f600a1c2dbf4f1e85ba386cf1aff3a64b7a8f2
│  │  ├─ 55
│  │  │  ├─ 004b6324a2e676a849b54b3cb170a17004cad6
│  │  │  └─ d2e64ef0adf8514695fd3b297d663185a7d91c
│  │  ├─ 57
│  │  │  └─ 10bcd97d14d44aa44c221dcba32829665b4c77
│  │  ├─ 59
│  │  │  ├─ da2ab9baf180965f4600ac98f996b54826c7de
│  │  │  └─ dc4ac25c923280febcad8e4815a65284b80317
│  │  ├─ 5b
│  │  │  └─ 7e79db8077927a854eb63d998f2c28cc54e16a
│  │  ├─ 5e
│  │  │  └─ c223b438e21b781079ead489fc853b0e41df3e
│  │  ├─ 5f
│  │  │  └─ 6d1f5d092e7c5ccfc51c80b1892a01a856c737
│  │  ├─ 62
│  │  │  └─ 3ca005a74982d213bb23a9ff16f800c018c6d4
│  │  ├─ 63
│  │  │  └─ ff55a359f2ab37775426b6d78e212abef28f7b
│  │  ├─ 66
│  │  │  └─ 1d723bea8a78b17aad0b5f63faa5dde17c149d
│  │  ├─ 67
│  │  │  └─ e055ecf140f0f642135dd0071cbfe44b448dfd
│  │  ├─ 68
│  │  │  ├─ 5a5b546f18de4a677064848fc78116dd701c1a
│  │  │  └─ 872b7ad97d86af30a740f607bbaca84f03bd43
│  │  ├─ 6c
│  │  │  ├─ 84614831397fdac3fc697451ccf0ce806aa48c
│  │  │  └─ aac760913ca1caf2cc62fe95d8d3f1cfd35156
│  │  ├─ 6e
│  │  │  └─ 4de5561a1c019b3c8ea2591a4d116a7db15d0e
│  │  ├─ 6f
│  │  │  └─ 88514cdfb0cc9d44ef1a2679b3226368b73693
│  │  ├─ 71
│  │  │  └─ c6ab04151029b57f8f402e8d34523e4afa988c
│  │  ├─ 72
│  │  │  ├─ 5dbc8aa663443aea724c70916e6bb970320d02
│  │  │  └─ a71ba179cd416c7dea19cd4039db3e5d455c2a
│  │  ├─ 73
│  │  │  └─ 6ab8f75fd36b93d08b431f025ea1f3a3c68aa2
│  │  ├─ 76
│  │  │  ├─ 19191e6feba2a2ea0fdb2e41dbc9968dae5554
│  │  │  ├─ 4430db95ae51a7107b7ab9f114b95d818dc6ea
│  │  │  └─ a8d89ba923cb896df88959d0fbdc1da81358a7
│  │  ├─ 78
│  │  │  └─ 34ddaad9ff63c25c920bb6e3d7c40411d27c09
│  │  ├─ 79
│  │  │  └─ 3e3b5a09dce0b7ba1aa6f243618733640523e2
│  │  ├─ 7e
│  │  │  ├─ abbe1b14cc3d2aa41e29031abf5f551b407df5
│  │  │  └─ cf27e56edd38eda383bb336a53ebc961c124ff
│  │  ├─ 80
│  │  │  └─ 463fe5b5750d826500c67188a7aa133fedc66e
│  │  ├─ 82
│  │  │  └─ 493144c2c24052f767da8a43c0866bb9d5bc0a
│  │  ├─ 87
│  │  │  └─ c5d426334e59e6322adc68ccfb5c358579194f
│  │  ├─ 8b
│  │  │  └─ 404fe378af16c8028ffb35b0121dd31adb3e5e
│  │  ├─ 8c
│  │  │  └─ d0f162148f4008f62a6cea74e89f74ed7ae378
│  │  ├─ 8e
│  │  │  ├─ 35f968556bdf6bd647159a8453188d0b27ce3b
│  │  │  └─ 441679603dd00b0d943f1303302770f10cbecd
│  │  ├─ 8f
│  │  │  ├─ 9f84a449e98fa80920dd9cfa9d4251e7cba672
│  │  │  └─ b0cb01064d4446244e36e7257d9450d76c9346
│  │  ├─ 93
│  │  │  └─ 043329d46c4ca25fe0cd9c92b0e2e0aff7c3bb
│  │  ├─ 95
│  │  │  └─ fc1ebc681d09ec3427caeab15b79aac2eda9cb
│  │  ├─ 98
│  │  │  └─ 8ecf53c7438ba933b10b6ffd222e2d391aacfc
│  │  ├─ 9b
│  │  │  └─ c14462e98074747a91388516981c35d3b708cc
│  │  ├─ 9c
│  │  │  └─ ea6efffe8b3bc04c9d0fe754705cbb42a20448
│  │  ├─ a1
│  │  │  └─ 833da894a80fe54a21f6dd8504bbca1ae5e1b4
│  │  ├─ a4
│  │  │  ├─ 6b6857fd9a9ca3b767f554b9f3fbb04a9f3489
│  │  │  ├─ 85e8d81b9042e127181143118d43c0e76d4551
│  │  │  └─ c066aee80d19bdaef0a0af1c8a9b5657349714
│  │  ├─ a6
│  │  │  └─ 006db58c2f260ef943723634b95027dba9a7be
│  │  ├─ a7
│  │  │  └─ 500c715b3361e5f5539a218278dc02f20998a9
│  │  ├─ a8
│  │  │  └─ 6b2c9436466e00e00ddb43ed662a449cfe222d
│  │  ├─ a9
│  │  │  ├─ 047812e4751399cdda82ef81749d2d4043e43a
│  │  │  └─ ed07ab5f53453b972f09128887fedd6225a0da
│  │  ├─ ac
│  │  │  └─ 96d1d5c07f83d827b8f122ea6e6978f9039e34
│  │  ├─ af
│  │  │  ├─ fd243a9648676ee9c7b514b1a79d91bf9bdc05
│  │  │  └─ fdab6ebaf500cc47d11fecfc666a1a74fac8ac
│  │  ├─ b2
│  │  │  └─ 9c95a705944b611b3a2ac37ca08d658e436c49
│  │  ├─ b9
│  │  │  └─ 7ea42f5c8d96be7b8a82d335f222f11f8bbc4c
│  │  ├─ ba
│  │  │  └─ 4a6b15ca7ed1b7aad8c6f973839b6169850403
│  │  ├─ be
│  │  │  ├─ 19da3fdfc5306cd1c4d423fbcbbd635a1e242d
│  │  │  └─ 54b6b2f13d29982e130c4f020a7342ad9d45e3
│  │  ├─ c2
│  │  │  └─ 0cab1e3d734e4961237c9ce13118bc5fb59560
│  │  ├─ c3
│  │  │  └─ 152a521b2bd65fb258e8b4c0d84398984100d1
│  │  ├─ c4
│  │  │  └─ e918b2d6d192fbdf310afea6576e0f6a9ef450
│  │  ├─ c5
│  │  │  ├─ 70f91f5506b6e258fc106b95bd698bbace8982
│  │  │  ├─ 9f9cc6b7d07b2c160a2bf23c7462ec5befae86
│  │  │  └─ e9cefd1f97d77cca7894dc3db5b0267ecfa24e
│  │  ├─ c9
│  │  │  └─ 1b684b2e0dd2d48f95b66b9b052a0efc50ecae
│  │  ├─ ca
│  │  │  ├─ 69561c04b6a108eb529e5afa675082d6fa2270
│  │  │  └─ 6cfa022a9156b06946f92cac3a924a75c87998
│  │  ├─ cb
│  │  │  └─ cd54027faaa9107a56be16ddddf09c72246d5f
│  │  ├─ d0
│  │  │  ├─ 11989019f93f64aaa0e6da58c00040ca6c2bf9
│  │  │  └─ 52657b1d13e69ed7a56af0b4b2e83dce532461
│  │  ├─ d5
│  │  │  └─ 735a804489099883fa342b7adeaacc760cf7f4
│  │  ├─ db
│  │  │  └─ ec59a1dd767dde714efd483e7616df98ac8745
│  │  ├─ e0
│  │  │  └─ 0f0eff7501e2851472483c56ecbd762e8265b4
│  │  ├─ e1
│  │  │  └─ 2437ce505b93aaa6377cd0c76f390258c21ff4
│  │  ├─ e2
│  │  │  └─ 8e76b51c55cfa67fd3135f36a7fb87766e948c
│  │  ├─ e3
│  │  │  └─ 92eff2a5eb52a1cbc0144b26ed84f0e755c0db
│  │  ├─ e5
│  │  │  └─ b01a5a68b8eb2bbf29275f3d80f1ad7777583f
│  │  ├─ eb
│  │  │  └─ 9fadbcd9d671c39c8f687665c330957e648e2f
│  │  ├─ ee
│  │  │  ├─ 2dd29e96825c336cd9ace54f518a001a87e8b0
│  │  │  └─ a58115159e4306a4825fd58855afda8f0af52f
│  │  ├─ ef
│  │  │  └─ 1fc7d24c02387033540ecab0c282204b4785f5
│  │  ├─ f3
│  │  │  ├─ 60d652eea7980974a39767c63098d86c1c61c2
│  │  │  └─ cfd9c4b74eee31cb9ad97386babe76f3661803
│  │  ├─ f7
│  │  │  └─ 9ab16ef322d61661035f7f90bda0bb468b5d66
│  │  ├─ f8
│  │  │  └─ 07fd5d4fbecf1bb0d36929228151333dd46d21
│  │  ├─ f9
│  │  │  ├─ 79fb4f78819db9a8353d54341e7d8d782a2202
│  │  │  └─ ba781a03fdd6bb17f44d436bdd6449783336d6
│  │  ├─ fb
│  │  │  ├─ 6c993badc22817fd973361f9254377b55695b4
│  │  │  └─ dcacb2bf3dedda66e5c9149abf3a0e3cd8d554
│  │  ├─ ff
│  │  │  └─ 5447f648336aba5a6dd97e26af53858f372540
│  │  ├─ info
│  │  │  ├─ commit-graph
│  │  │  └─ packs
│  │  └─ pack
│  │     ├─ pack-6954c01b5af4164d86a997561e69cf8d83751588.idx
│  │     ├─ pack-6954c01b5af4164d86a997561e69cf8d83751588.pack
│  │     ├─ pack-eb7b41da42ff9ea36cd4ea0e7a17d2727c6fdac0.idx
│  │     └─ pack-eb7b41da42ff9ea36cd4ea0e7a17d2727c6fdac0.pack
│  ├─ ORIG_HEAD
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .vscode
├─ app
│  └─ app.js
├─ config
│  └─ dbConnect.js
├─ controller
│  ├─ academics
│  │  ├─ academicTermCtrl.js
│  │  ├─ academicYearCtrl.js
│  │  ├─ categoryCtrl.js
│  │  ├─ chatbot.js
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
│  ├─ isTeacherLogin.js
│  └─ notAllowLoginPage.js
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
│  │  ├─ chatbot.js
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
│  ├─ paginationUtils.js
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
   ├─ chatbot
   │  ├─ chatbot.hbs
   │  └─ chatDisplay.hbs
   ├─ class-level
   │  ├─ classLevel.hbs
   │  ├─ createClassLevel.hbs
   │  ├─ deleteClassLevel.hbs
   │  ├─ index.hbs
   │  └─ updateClassLevel.hbs
   ├─ exam
   │  ├─ add-question.hbs
   │  ├─ attach-question.hbs
   │  ├─ create-auto-exam.hbs
   │  ├─ createExam.hbs
   │  ├─ deleteExam.hbs
   │  ├─ exam-edit-question.hbs
   │  ├─ exam.hbs
   │  ├─ index.hbs
   │  └─ updateExam.hbs
   ├─ exam-result
   │  ├─ admin-toggle-result.hbs
   │  ├─ deleteExamResult.hbs
   │  ├─ index.hbs
   │  ├─ index_admin.hbs
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
   │  ├─ deleteQuestion.hbs
   │  ├─ index.hbs
   │  ├─ question.hbs
   │  ├─ selectExam.hbs
   │  └─ updateQuestion.hbs
   ├─ student
   │  ├─ access-key-error.hbs
   │  ├─ admin-update-student.hbs
   │  ├─ adminRegisterStudent.hbs
   │  ├─ chatbot.hbs
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