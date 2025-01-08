#!/bin/bash

find ./release -type f ! -name '*.md' -delete

bun build --compile --target=bun-linux-x64-baseline ./src/index.ts --outfile ./release/simple-inventory-linux
bun build --compile --target=bun-linux-arm64 ./src/index.ts --outfile ./release/simple-inventory-linux-mobile 
bun build --compile --target=bun-windows-x64-baseline ./src/index.ts --outfile ./release/simple-inventory-windows
bun build --compile --target=bun-darwin-arm64 ./src/index.ts --outfile ./release/simple-inventory-mac
bun build --compile --target=bun-darwin-x64 ./src/index.ts --outfile ./release/simple-inventory-mac-intel
