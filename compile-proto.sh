npx pbjs --sparse --es6 -t static-module -w es6 -o src/misc/push-request.js -p proto-path proto-path/push-request.proto

cd src/misc

# Portable in-place edits (GNU sed vs BSD sed)
sed -i.bak 's|import \* as $protobuf|import $protobuf|' push-request.js
sed -i.bak 's|protobufjs/minimal|protobufjs/minimal.js|' push-request.js
rm -f push-request.js.bak

npx pbts -o push-request.d.mts push-request.js
mv -f push-request.js push-request.mjs
