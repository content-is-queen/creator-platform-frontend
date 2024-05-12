"use client"
import Container from "@/components/Container";
import Text from "@/components/Text";
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
 return <div className="grid grid-cols-5">
     <div className="col-span-1 bg-queen-blue h-screen overflow-hidden">
     <Container size="4xl">
      <div className="py-12 md:py-20">
        <div className="flex gap-12">
          <div className="w-full max-w-40">
            <div className="border-b border-queen-black/20 pb-4 mb-4">
              <Text size="lg" className="font-subheading font-bold mb-2">
                Admin
              </Text>
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
    </div>
    <div className="col-span-4">
    <nav class="bg-quen-white border-gray-200 mb-8">
      <h1>navbar goes here</h1>
    </nav>
      {children}
    </div>
  </div>
};

export default Template;
