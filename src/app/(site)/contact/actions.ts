"use server";

export interface ContactFormState {
  success: boolean;
  error: string | null;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const orgSize = formData.get("orgSize") as string;
  const message = formData.get("message") as string;

  // Validate required fields
  if (!name || !email || !company) {
    return { success: false, error: "Please fill in all required fields." };
  }

  // Basic email validation
  if (!email.includes("@")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  // Placeholder: log submission (replace with Resend or other email service)
  console.log("Contact form submission:", {
    name,
    email,
    company,
    orgSize,
    message,
  });

  return { success: true, error: null };
}
