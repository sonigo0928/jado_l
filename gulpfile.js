var gulp = require('gulp'),
	runSequence = require('run-sequence'),
	merge = require('merge-stream'),
	watch = require('gulp-watch'),
	sass = require('gulp-sass'),
	sassGlob = require('gulp-sass-glob'),
	spritesmith = require('gulp.spritesmith-multi'),
	del = require('del');
 
/* ---------------------------------------------------------------------------------- */
 
// Clean Sprite
gulp.task('clean-sprite', function() {
	return del('./static/images/sprites/*');
});
 
// 자동 스프라이트
gulp.task('auto-sprite', function() {
	var opts = {
		spritesmith: function (options, sprite, icons){
			options.imgPath =  `../images/sprites/${options.imgName}`;
			options.cssName = `_${sprite}-sprite.scss`;
			options.cssTemplate = null;
			options.cssSpritesheetName = sprite;
			options.padding = 10;
			options.cssVarMap =  function(sp) {
				sp.name = `${sprite}-${sp.name}`;
			};
 
			return options;
		}
	};
	var spriteData = gulp.src('./src/images/sprites/**/*.png').pipe(spritesmith(opts)).on('error', function (err) {
		console.log("err")
    });
	
	var imgStream = spriteData.img.pipe(gulp.dest('./static/images/sprites'));
	var cssStream = spriteData.css.pipe(gulp.dest('./src/scss/vendors'));
 
	return merge(imgStream, cssStream);
});
 
// sass
gulp.task('sass', function() {
	return gulp.src('./src/scss/*.scss')
 
	// use glob imports
	.pipe(sassGlob())

	// SASS
	.pipe(sass({
		errLogToConsole: true,
		outputStyle: 'compressed' // nested, expanded, compact, or compressed.
	}).on('error', sass.logError))

	// css 배포
	.pipe(gulp.dest('./static/css'));
});
 
// 스프라이트 and SASS
gulp.task('sprite-and-sass', gulp.series('clean-sprite', 'auto-sprite', 'sass'));

gulp.task('watch', function() {
	watch(['./src/images/sprites/*'], gulp.series('sprite-and-sass'));
	watch(['./src/scss/vendors/*.scss'], gulp.series('sass'));
	watch(['./src/scss/*.scss'], gulp.series('sass'));
});

gulp.task('default', gulp.series('sprite-and-sass','watch'));