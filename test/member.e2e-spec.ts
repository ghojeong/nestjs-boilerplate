import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

const GRAPHQL_ENDPOINT = '/graphql';

describe('Member Module (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('회원가입 후 본인정보 조회 시나리오', () => {
    const TEST_EMAIL = Math.random() + '@a.com';
    const TEST_PASSWORD = 'pwd';
    let tempToken: string;

    it('회원가입에 성공한다.', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
          mutation{
            createMember(input: {
              email: "${TEST_EMAIL}",
              password: "${TEST_PASSWORD}"
            }) {
              ok
              error
            }
          }
          `,
        })
        .expect(200)
        .expect(({ body: { data } }) => {
          const {
            createMember: { ok, error },
          } = data;
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
        });
    });

    it('로그인에 성공한다.', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
          mutation{
            login(input: {
              email: "${TEST_EMAIL}",
              password: "${TEST_PASSWORD}"
            }) {
              ok
              error
              token
            }
          }
          `,
        })
        .expect(200)
        .expect(({ body: { data } }) => {
          const {
            login: { ok, error, token },
          } = data;

          tempToken = token;
          expect(tempToken).toBeDefined();
          expect(ok).toBeTruthy();
          expect(error).toBeNull();
        });
    });

    it('토큰으로 본인정보 조회에 성공한다.', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('Authorization', tempToken)
        .send({
          query: `
          query{
            me {
              email
            }
          }
          `,
        })
        .expect(200)
        .expect(({ body: { data } }) => {
          console.log(data);
          const {
            me: { email },
          } = data;
          expect(email).toEqual(TEST_EMAIL);
        });
    });
  });
});
