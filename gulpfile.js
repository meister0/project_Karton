const project_folder = 'dist';
const source_folder = 'src';
const path = {
	build: {
		html: './' + project_folder + '/',
		css: project_folder + '/css/',
		img: project_folder + '/img/',
		js: project_folder + '/js/',
		inject: ['./dist/css/*.min.css', './dist/js/*.min.js'],
	},
	src: {
		html: './' + source_folder + '/index.html',
		css: [
			source_folder + '/sass/*.s[ca]ss',
			'!' + source_folder + '/sass/_*.s[ca]ss',
		],
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		js: source_folder + '/js/script.js',
	},
	watch: {
		html: source_folder + '/**/*.html',
		css: source_folder + '/sass/**/*.sass',
		img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
		js: source_folder + '/js/*.js',
	},
	clean: './' + project_folder + '/',
};

const { src, dest } = require('gulp');
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const groupmedia = require('gulp-group-css-media-queries');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const fileinclude = require('gulp-file-include');
const uglify = require('gulp-uglify-es').default;

function browserSync(params) {
	browsersync.init({
		server: {
			baseDir: './' + project_folder + '/',
		},
		port: 3000,
		notify: false,
	});
}

function html() {
	return src(path.src.html)
		.pipe(dest(path.build.html))
		.pipe(inject(src(path.build.inject, { read: false }), { relative: true }))
		.pipe(dest(path.build.html))
		.pipe(browsersync.stream());
}

function images() {
	return src(path.src.img)
		.pipe(
			imagemin({
				progressive: true,
				svgoPlugins: [{ removeViewBox: false }],
				interlaced: true,
				optimizationLevel: 3,
			})
		)
		.pipe(dest(path.build.img))
		.pipe(browsersync.stream());
}

function css() {
	return src(path.src.css)
		.pipe(
			sass({
				outputStyle: 'expanded',
			}).on('error', sass.logError)
		)
		.pipe(groupmedia())
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 5 versions'],
				cascade: true,
			})
		)
		.pipe(dest(path.build.css))
		.pipe(cleancss())
		.pipe(rename({ extname: '.min.css' }))
		.pipe(dest(path.build.css))
		.pipe(browsersync.stream());
}

function js() {
	return src(path.src.js)
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
		.pipe(uglify())
		.pipe(
			rename({
				extname: '.min.js',
			})
		)
		.pipe(dest(path.build.js))
		.pipe(browsersync.stream());
}

function watchFiles(params) {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.js], js);
}

function clean(params) {
	return del(path.clean);
}

const build = gulp.series(clean, gulp.parallel(css, js, images), html );
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.watch = watch;
exports.build = build;
exports.css = css;
exports.default = watch;

// // FTP
// function server(done) {
// 	const conn = ftp.create({
// 		host: '136.243.147.150',
// 		user: 'eazy1108',
// 		password: 'gYwR07MW5X',
// 		parallel: 10,
// 		log: gutil.log
// 	});
// 	const globs = ['src/**'];
// 	gulp
// 		.src(globs, { base: './src/', buffer: false })
// 		.pipe(conn.newer('/www/meister0.site/')) // only upload newer files
// 		.pipe(conn.dest('/www/meister0.site/'));
// 	done();
// }

// exports.default = gulp.series(watch, style);
// exports.serv = server;
