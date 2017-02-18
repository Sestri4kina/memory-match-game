var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

//Deploy task
//run: gulp deploy
gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});
