graphicss
=

> Create css for your images

[![Build Status](https://travis-ci.org/coder-on-deck/graphicss.svg?branch=master)](https://travis-ci.org/coder-on-deck/graphicss)

## Installation

```
npm install -D graphicss
```

## Options

 - outdir - destination folder (default: `dist`)
 - outfilename - filename to use for output (default: `graphics`)
 - include - files to include. following [glob-all](https://www.npmjs.com/package/glob-all) conventions. (default : `['**/*.{svg,png}', '!node_modules/**/*']`)
 - classnamePattern - pattern to use for classnames. (default: `icon-%s`)
 
## Usage 

```
graphicss --classnamePattern --outdir build-output --outfilename main --include **/*.png --include **/*.svg --include !node_modules
```

 
## Output Example

Look at the `example` folder and the `example-dist` to see input and output examples


This is the generated css file
```
.example-camera:before{  height : 206px ; width: 406px; display:block; content:''; background:url('example/camera.svg') no-repeat; }
```

Note that the css assumes the path to the graphics remains the same. So if the graphics were at `example/`, they will still be there.   
The intention is that you will copy the graphics folders as is (after optimization with svgo perhaps?) to your dist folder.

Alongside it there's an html file showing all the possible icons. 


# How can I resize the image? 

You can use `transform: scale(.5);` (for example) to change the image's scale. 
