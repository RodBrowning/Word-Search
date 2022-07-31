set -e

dir="dist"
if [ -d $dir ]
then
cd $dir
rm -rf .git
cd -
fi

npm run build

cd dist

git init
git checkout -b main
git add -A
git commit -m 'deploy'

git push -f git@github.com:<USER>/<REPO>.git main:gh-pages

cd -
