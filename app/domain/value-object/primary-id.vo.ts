import { uuidv7 } from "uuidv7";
import z, { ZodType } from "zod";

const errorMessage = "未入力または不正な値です";

export const PrimaryIdValidationSchema = z.string().uuid(errorMessage);

const UuidSchema = PrimaryIdValidationSchema.brand("UUID");

export const UserIdSchema = UuidSchema.brand("UserId");

export type UserId = z.infer<typeof UserIdSchema>;

export function createUserId(fromStringId?: string): UserId {
  return createPrimaryId(UserIdSchema, fromStringId);
}

export const postIdSchema = UuidSchema.brand("PostId");
export type PostId = z.infer<typeof postIdSchema>;

export function createPostId(fromStringId?: string): PostId {
  return createPrimaryId(postIdSchema, fromStringId);
}

export function createPrimaryId<T extends ZodType>(
  schema: T,
  fromStringId?: string
): z.infer<T> {
  const id = fromStringId ?? uuidv7();
  return schema.parse(id);
}
