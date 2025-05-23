import { z } from "zod";

export const signUpSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    role: z.enum([
      "STUDENT",
      "TEACHER",
      "ORGANIZATION_ADMIN",
      "ENTERPRISE_ADMIN",
    ]),
    orgName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.role === "ORGANIZATION_ADMIN" ||
        data.role === "ENTERPRISE_ADMIN") &&
      (!data.orgName || data.orgName.trim() === "")
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Organization/Enterprise name is required",
        path: ["orgName"],
      });
    }
  });

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Error(issue.message);
  }
  return result.data;
}

export function validateClient<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Error(issue.message);
  }
  return result.data;
}
