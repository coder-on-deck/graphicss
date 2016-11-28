const imageSize = require('image-size')
const fs = require('fs')
const path = require('path')
const glob = require('glob-all')
const util = require('util')
var log = require('loglevel')

function graphicss (config) {
  log.setLevel(config.loglevel || 'silent')
  config = util._extend({
    'outdir': 'dist',
    'outfilename': 'graphics',
    'include': ['**/*.{svg,png}', '!node_modules/**/*'],
    'classnamePattern': 'icon-%s'
  }, config)
  log.debug('config is', config)
  const files = glob.sync(config.include)
  log.debug('files are', files)
  var sizes = files.map((f) => {
    var size = imageSize(f)
    size.file = f
    return size
  }).map((size) => {
    size.filename = path.basename(size.file).replace(`.${size.type}`, '')
    return size
  }).map((size) => {
    var classname = util.format(config.classnamePattern, size.filename)
    size.css = `.${classname}:before{  height : ${size.height}px ; width: ${size.width}px; display:block; content:''; background:url('${size.file}') no-repeat; }`
    size.html = `
    <div>
      <div>
          <pre>&lt;i class="${classname}"/> -- ${size.type}</pre>  
      </div>
      <i class="${classname}"></i><br/>
    </div>
    
  `
    return size
  })

  var html = `
    <html>
      <head>
        <link href="./${config.outfilename}.css" rel="stylesheet"/>
        <style>pre{ background:#CECECE; color:red; font-family:"Courier New"; padding:2px; }
            body{background-image: linear-gradient(#eee 25%, transparent 25%, transparent), linear-gradient(#eee 25%, transparent 25%, transparent), linear-gradient(transparent 75%, #eee 75%), linear-gradient(transparent 75%, #eee 75%);
  width: auto;
  background-size: 10px 10px;}          </style>
        
      </head>
      <body>
        ${sizes.map((s) => s.html).join('')}
      </body>
    </html>
`

  fs.writeFileSync(`${config.outdir}/${config.outfilename}.css`, sizes.map((s) => s.css).join(''))
  fs.writeFileSync(`${config.outdir}/${config.outfilename}.html`, html)
}

module.exports.graphicss = graphicss

