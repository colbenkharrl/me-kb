/**
 * Simple log function that formats text as JSON, which will be useful for
 * parsing in DataDog.
 * @param message
 */
export const logEvent = (
  message: string,
  context: "startup" | "runtime" | "test",
  level: "info" | "warning" | "error" = "info"
) => {
  const payload = { message, context, level };
  console.log(
    process.env.NODE_ENV === "production"
      ? JSON.stringify(payload)
      : JSON.stringify(payload, null, 4)
  );
};
