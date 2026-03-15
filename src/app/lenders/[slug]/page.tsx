import { redirect } from "next/navigation";

export default function LenderSlugRedirect({ params }: { params: { slug: string } }) {
  redirect(`/lender-risk-index/${params.slug}`);
}
