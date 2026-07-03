
import CheckoutClient from "@/components/website/CheckoutClient";
// import { getUserFromSession } from "@/lib/auth"; // later JWT

export default async function CheckoutPage() {
  // const user = await getUserFromSession();

  // if (!user) {
  //   redirect("/login?redirect=/checkout");
  // }

  return <CheckoutClient/>;
}
