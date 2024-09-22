import Container from "@/components/Container";
import Chat from "@/components/Chat";

const Conversations = () => {
  return (
    <div style={{ height: "calc(100vh - var(--nav-height)" }}>
      <Container className="pt-8 grid gap-6 grid-cols-12">
        <Chat />
      </Container>
    </div>
  );
};

export default Conversations;

export const metadata = {
  title: "Conversations",
};
