import Image from "next/image";

/** Fixed, full-screen brand background shared by every page. */
export function SiteBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      <Image
        src="/svg/BACKGROUND SITE.svg"
        alt=""
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
