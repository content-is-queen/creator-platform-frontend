"use client";
import Container from "@/components/Container";
import Link from "next/link";
import { usePathname } from "next/navigation";
const LINKS = [
  {
    href: "/admin",
    label: "Dashboard",
  },
  {
    href: "/admin/opportunities",
    label: "Opportunities",
  },
  {
    href: "/admin/users",
    label: "Users",
  },
  { href: "/admin/billing", label: "Billing" },
];
const Template = ({ children }) => {
  const pathname = usePathname();
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1 bg-queen-blue h-screen overflow-hidden flex flex-col justify-between">
        <Container size="4xl">
          <div className="mt-8">
            <img src="/images/touch-icon.png" alt="logo" className="h-32" />
          </div>
          <div className="py-12 md:py-20">
            <div className="flex gap-12">
              <div className="w-full max-w-40">
                <div className="border-b border-queen-black/20 pb-4 mb-4">
                  <ul>
                    {LINKS.map(({ href, label }) => (
                      <li key={href} className="py-1">
                        <Link
                          href={href}
                          className={pathname != href && "opacity-70"}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <img
          src="/images/CiQ_Pattern 5.png"
          alt="logo"
          className="self-end mb-8"
        />
      </div>

      <div className="col-span-4">
        <nav class="bg-quen-white border-gray-200 mb-8">
          <h1>navbar goes here</h1>
        </nav>
        {children}
      </div>
    </div>
  );
};

export default Template;
