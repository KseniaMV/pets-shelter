const
  gulp          = require('gulp'),
  autoprefixer  = require('gulp-autoprefixer')


const paths = {
  styles: {
    src: "src/styles/**/*.css",
    dest: "dist/css"
  }
};

function style(){
    return(
      gulp
      .src(paths.styles.src)
      .pipe(autoprefixer(['last 2 versions'], {cascade: true}))
      .pipe(gulp.dest(paths.styles.dest))
    );
  
  };

  exports.style = style;