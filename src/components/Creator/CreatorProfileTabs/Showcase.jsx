import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return (
      <>
        Select your proudest work from your list of credits to add to your
        showcase
      </>
    );
  }

  return <>No shows</>;
};

const Showcase = () => {
  const { user } = useUser();
  const credits = user?.profile_meta?.credits || [];

  return (
    <div>
      {credits.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
        >
          {credits.map((credit, index) => (
            <div
              key={index}
              style={{ borderRadius: "0.5rem", overflow: "hidden" }}
            >
              <img
                src={credit.coverImage}
                alt="Cover"
                style={{
                  height: "20rem",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                }}
                onError={(e) => {
                  e.target.src = "default_image_url";
                }} // fallback image if the src fails
              />
              <div style={{ padding: "1rem" }}>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "0.5rem",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                  }}
                >
                  {credit.episodeName}
                </p>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "0.25rem",
                    fontSize: "0.875rem",
                    color: "#718096",
                  }}
                >
                  {credit.role.toUpperCase()}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                  }}
                >
                  <a
                    href={credit.episode_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: "#FF7300",
                      color: "#fff",
                      padding: "0.45rem 1.45rem",
                      borderRadius: "1.5rem",
                      textDecoration: "none",
                      textAlign: "center",
                      display: "block",
                      fontSize: "0.8rem",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#e06600")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#FF7300")
                    }
                  >
                    MORE INFO
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Showcase;
