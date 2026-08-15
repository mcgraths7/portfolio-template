import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Exit preview: linked from the draft banner. No secret needed to leave. */
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
