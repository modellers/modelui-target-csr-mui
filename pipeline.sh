# Script prepping build pipelines for specific targets
# Create SSR pipline since importing core module loads wrong module type (ESM)
# Pull latest
# Copy esm into root directory
# rename esm to moduleui-core-runtime
# delete node_modules/moduleui-core-runtime
# export DISABLE_ESLINT_PLUGIN=true 
# replace imports
cd src/components/
find . -name Components.js -maxdepth 1 -type f -exec sed -i '' -e  "s/import { layout } from 'modelui-core-runtime';/import { layout } from '..\/modelui-core-runtime';/g" {} \;
find . -name Components.js -maxdepth 1 -type f -exec sed -i '' -e  "s/import { layout } from 'modelui-core-runtime';/import { layout } from '..\/modelui-core-runtime';/g" {} \;

find . -type f -exec sed -i '' -e  "s/import { layout } from 'modelui-core-runtime';/import { layout } from '..\/..\/modelui-core-runtime';/g" {} \;
find . -type f -exec sed -i '' -e  "s/import { structs } from 'modelui-core-runtime';/import { structs } from '..\/..\/modelui-core-runtime';/g" {} \;
find . -type f -exec sed -i '' -e  "s/import { util } from 'modelui-core-runtime';/import { util } from '..\/..\/modelui-core-runtime';/g" {} \;

find . -name AppBase.js -maxdepth 1  -type f -exec sed -i '' -e  "s/import { layout } from 'modelui-core-runtime';/import { layout } from '.\/modelui-core-runtime';/g" {} \;



find . -name *.js -maxdepth 1  -type f -exec sed -i '' -e  "s/import { structs } from 'modelui-core-runtime';/import { structs } from '..\/modelui-core-runtime';/g" {} \;
find . -name *.js -maxdepth 1  -type f -exec sed -i '' -e  "s/import { util } from 'modelui-core-runtime';/import { util } from '..\/modelui-core-runtime';/g" {} \;
