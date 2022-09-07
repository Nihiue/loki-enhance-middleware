npx pbjs --sparse --es6 -t static-module -w es6 -o src/misc/push-request.js -p proto-path proto-path/push-request.proto

cd src/misc

# what the fuck
sed -i 's|import \* as $protobuf|import $protobuf|' push-request.js
sed -i 's|protobufjs/minimal|protobufjs/minimal.js|' push-request.js
npx pbts -o push-request.d.ts push-request.js
