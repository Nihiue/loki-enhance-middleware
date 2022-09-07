pbjs --sparse -t static-module -w commonjs -o src/misc/push-request.js -p proto-path proto-path/push-request.proto
cd src/misc
pbts -o push-request.d.cts push-request.js
mv -f push-request.js push-request.cjs
