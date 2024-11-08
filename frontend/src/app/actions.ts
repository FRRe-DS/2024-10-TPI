"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Function to delete a cookie by its name
export async function deleteCookie() {
  const cookieStore = cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("user");
  redirect("/");
}
