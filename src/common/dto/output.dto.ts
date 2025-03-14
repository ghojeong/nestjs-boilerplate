import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationOutput {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error?: string;

  static ok = (): MutationOutput => ({ ok: true });

  static error = (error?: string): MutationOutput => ({ ok: false, error });
}
