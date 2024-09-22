import Container from "@/components/Container";
import Subheading from "@/components/Subheading";
import DeleteAccountModal from "@/components/DeleteAccountModal";
import SettingsSidebar from "@/components/SettingsSidebar";

const Layout = ({ children }) => (
  <div
    className="bg-queen-white"
    style={{
      minHeight: "calc(100vh - var(--nav-height))",
    }}
  >
    <Container size="4xl">
      <div className="py-12 md:py-20">
        <div className="flex gap-12">
          <div className="w-full max-w-40">
            <div className="border-b border-queen-black/20 pb-3 mb-4">
              <Subheading size="lg" className="mb-2">
                Settings
              </Subheading>
              <SettingsSidebar />
            </div>
            <DeleteAccountModal />
          </div>
          <div className="w-full">{children}</div>
        </div>
      </div>
    </Container>
  </div>
);

export default Layout;

export const metadata = {
  title: "Settings",
};
