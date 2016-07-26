var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');
var webserver = require('gulp-webserver');

var config = {
  host: '10.10.7.105',
  docName: '开发文档'
};

gulp.task('docs', function () {
  gulp.src(['./app/modules/**/*.js', './README.md']).pipe(jsdoc('./docs', {
    path: 'node_modules/jaguarjs-jsdoc',
    anyTemplateSpecificParameter: 'whatever',
    applicationName: config.docName,
    linenums: true,
    meta: {
        title: config.docName
    }
  }));

  gulp.src('docs')
    .pipe(webserver({
      host: config.host,
      port: 6040,
      path: '/',
      open: false,
      fallback: 'index.html'
    }));
});

gulp.task('live', function(){
  gulp.src('live')
    .pipe(webserver({
      host: config.host,
      port: 6030,
      path: '/',
      open: false,
      fallback: 'index.html'
    }));
});

gulp.task('dev', ['live']);
