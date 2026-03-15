import { redirect } from "next/navigation";

export default async function LenderDetailRedirect({ params }: { params: { slug: string } }) {
  redirect(`/lender-risk-index/${params.slug}`);
}
