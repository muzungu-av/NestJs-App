
echo ************ Frontend ************
cd .. 
cd .\frontend
rmdir /s /q .\dist
set NODE_ENV=development
CALL yarn build:css
CALL tsc
CALL yarn build:win




