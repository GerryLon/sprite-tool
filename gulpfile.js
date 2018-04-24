// Load in dependencies
var path = require('path');
var shell = require('shelljs');
var gulp = require('gulp');  
var spritesmith = require('gulp.spritesmith');
var config = require('./config');

var settings = {
  sliceDir: 'slice',
  root: __dirname,
  spriteName: 'sprite.png'
};

// 合并配置
settings = Object.assign({}, settings, config);

// /**
//  * 获取小图
//  * @return {[type]} [description]
//  */
// function getSlices() {
//   // slice 目录不存在

//   var code = 0;

//   if ((code = shell.ls(settings.sliceDir).code) !== 0) {
//     console.log(code);
//     shell.mkdir(settings.sliceDir);
//     return false;
//   }

//   var images = [];

//   shell.cd(settings.sliceDir);
//   shell.ls().forEach(function(img, idx) {
//     console.log(img);
//     images.push(path.join(settings.root, settings.sliceDir, img));
//   });

//   return images;
// }

// var slices = getSlices();

// if (!slices) {
//   shell.echo('no slice dir found');
//   shell.exit(1);
// }

// if (!slices.length) {
//   shell.echo('no image found in slice dir');
//   shell.exit(2);
// }

if (shell.ls('img').code !== 0) {
  shell.mkdir('img');
} else {
  shell.ls('rm -rf img/*');
}

gulp.task('sprite', function() {

  // var spriteData = gulp.src(CONFIG.src + '/img/slice/*.png')
  // var spriteData = gulp.src(slices)
  var spriteData = gulp.src('./' + settings.sliceDir + '/*.*(png|jpg|jpeg|gif)')
    .pipe(spritesmith({
      imgName: settings.spriteName, // 生成的雪碧图的名称
      cssName: './_sprite.less',
      imgPath:  `./img/${settings.spriteName}`, // 手动指定路径, 会直接出现在css代码的background属性的值中
      padding: 4, // 小图之间的间距, 防止重叠, 设置为2足够了
      cssFormat: 'css', // less文件内容以css的格式输出

      cssTemplate: (data) => {
        // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
        let arr = [],
          width = data.spritesheet.px.width,
          height = data.spritesheet.px.height,
          url = data.spritesheet.image;

        arr.push(
`.icon {
  display: inline-block;
  vertical-align: middle;
  background: url("${url}") no-repeat;
}
`
        );

        data.sprites.forEach(function(sprite) {

          arr.push(
`.i-${sprite.name} {
  width: ${sprite.px.width};
  height: ${sprite.px.height};
  background-position: ${sprite.px.offset_x} ${sprite.px.offset_y};
}
`
          );
        });

        return arr.join('');
      }

    }));

  return spriteData.pipe(gulp.dest('./img'));
});