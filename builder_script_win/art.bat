echo ************ Art Config ************
cd .. 
cd .\artConfigurator
rmdir /s /q .\dist
set NODE_ENV=development
CALL yarn build:css
CALL tsc
CALL yarn build:win
