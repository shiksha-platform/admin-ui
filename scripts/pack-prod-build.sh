#!/bin/bash
rm -rf prod-build
mkdir prod-build
mkdir prod-build/modules
find modules \( ! -path lib/common-ui -o ! -path apps/admiin-console \) -type d  -maxdepth 1 -mindepth 1 -exec bash -c '
for f  do
    # echo $f
    if [ $f != "lib/common-ui" ] &&  [ $f != "apps/admin-console" ] ; then
        echo "Processing ${f//modules\//}"
        cp -rf "$f/build" "prod-build/modules/${f//modules\//}"
    fi
done 
' sh {} +
cp -r  apps/admin-console/build/* prod-build/
find  prod-build -name  'modules.json' | xargs sed -i 's|http://localhost:[0-9]*||g'
cd prod-build && tar -cf ../shiksha-admin-ui.tar . && cd ../
