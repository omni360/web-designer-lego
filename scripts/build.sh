BUILD_FOLDER='wdl-dist'
BUILD_VERSION=`cat package.json | grep version | awk -F":" '{print $2'} | sed -e 's/^ "//' -e 's/",$//'`

echo "[..] Checking npm status"
npm install

echo "[..] Building app as ${BUILD_FOLDER} v${BUILD_VERSION} : in progress ..."

# CREATING FOLDER
rm -rf ${BUILD_FOLDER}
mkdir ${BUILD_FOLDER}

cp -r css img lib   ${BUILD_FOLDER}/

mkdir               ${BUILD_FOLDER}/build
cp build/app.min.js ${BUILD_FOLDER}/build/

mkdir ${BUILD_FOLDER}/node_modules
mkdir ${BUILD_FOLDER}/node_modules/jquery
mkdir ${BUILD_FOLDER}/node_modules/jquery/dist
cp node_modules/jquery/dist/jquery.min* ${BUILD_FOLDER}/node_modules/jquery/dist

cp index.html README.md LICENSE package.json  ${BUILD_FOLDER}/

# ZIP EVERYTHING AND DO SOME CLEANUP
rm -rf ${BUILD_FOLDER}*.zip
zip ${BUILD_FOLDER}-${BUILD_VERSION}.zip ${BUILD_FOLDER}/ -r
rm -rf ${BUILD_FOLDER}

echo "[OK] Building app as ${BUILD_FOLDER} v${BUILD_VERSION} : completed !"
