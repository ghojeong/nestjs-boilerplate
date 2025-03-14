import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationOutput {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;

  static defaultOk = (): MutationOutput => ({ ok: true });

  static defaultError = (error?: string): MutationOutput => ({
    ok: false,
    error,
  });
}
