"use server";

import { draftMode } from "next/headers";

export async function disableDraftMode() {
  const dm = await draftMode();
  dm.disable();
  // Small delay to ensure the cookie is cleared before redirect
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
