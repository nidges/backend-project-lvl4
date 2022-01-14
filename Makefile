install:
	npm ci

lint:
	npx eslint .

fix:
	npx eslint --fix .

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage --coverageProvider=v8

test-debug:
	DEBUG=tracker NODE_OPTIONS=--experimental-vm-modules npx jest

prod:
	npm run build

.PHONY: test
