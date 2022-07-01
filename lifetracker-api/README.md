# Lifetracker Express API
npm init -y
npm install --save express@next morgan cors nodemon
npm install --save bcrypt colors dotenv pg

also...
.env.template should be like 
PORT=3001
SECRET_KEY=somelongstring
BCRYPT_WORK_FACTOR=some number
DATABASE_USER=postgres
DATABASE_PASS=default or system password
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=lifetracker
DATABASE_TEST_NAME=lifetracker_test