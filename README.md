# NestJS 보일러플레이트

NestJS 로의 개발을 대비한 보일러플레이트를 준비

## 실행법

### DB 환경 세팅

1. Docker 를 설치한다.
2. `cd docker && sh docker-start.sh` 명령어를 실행한다.

1번과 2번에 무언가 문제가 있다면 `sh docker-clear.sh` 를 실행해서,  
도커관련 환경을 깨끗하게 만든다.

### 프로젝트 실행법

1. 위의 안내에 따라 DB 를 실행한다.
2. `npm ci && npm run start:dev` 한다.
3. 단위 테스트의 경우 `npm run test` 한다.
4. E2E 테스트의 경우 `npm run test:e2e` 한다.

### GraphQL Playground

브라우저를 이용해 http://localhost:3000/graphql 로 접속하면,  
문서와 함께 간단히 실행해볼 수 있는 콘솔창이 나온다.
