init:
	npm install ; cd public ; mkdir uploaded ; cd uploaded ; mkdir sources ; cd .. ; npm install
.PHONY: init

dev:
	npm start
.PHONY: dev

build:
	cd public ; ng build --prod ; cp -R src/sources uploaded/ ; cp src/main.js dist/ ; mv dist/index.html dist/main.html
.PHONY: build

push:
	git add . ; git commit -m "up new code to server" ; git push origin master
.PHONY: push