import Image from "next/image";

const logos = [
  {
    type: "text",
    name: "Innovative, Nature-Driven Solutions",
    url: "/landing/services/image1.svg",
  },
  {
    type: "",
    name: "Smart Products",
    url: "/landing/services/image2.svg",
  },
  {
    type: "text",
    name: "Connecting People and Plants",
    url: "/landing/services/image1.svg",
  },
  {
    type: "",
    name: "Smart Bio Technology",
    url: "/landing/services/image1.svg",
  },
  {
    type: "text",
    name: "Sustainable Tech for Green Living",
    url: "/landing/services/image1.svg",
  },
  {
    type: "",
    name: "Smart Products",
    url: "/landing/services/image2.svg",
  },
  {
    type: "text",
    name: "Real-Time Plant Insights",
    url: "/landing/services/image1.svg",
  },
  {
    type: "",
    name: "Smart Bio Technology",
    url: "/landing/services/image1.svg",
  },
  {
    type: "text",
    name: "Cultivating Nature’s Intelligence",
    url: "/landing/services/image1.svg",
  },
  {
    type: "",
    name: "Smart Products",
    url: "/landing/services/image2.svg",
  },
];

const Services = () => {
  return (
    <div className="w-full">
      <div className="mx-auto w-full md:px-6 max-w-screen-2xl">
        <div
          className="group relative mt-5 md:mt-4 flex gap-6 overflow-hidden py-2 md:py-4 border border-green"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 99%)",
          }}
        >
          {Array(8)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-between items-center gap-10"
              >
                {logos.map((logo, key) =>
                  logo.type === "text" ? (
                    <h1 key={key} className="text-green text-xl">
                      {logo.name}
                    </h1>
                  ) : (
                    <Image
                      key={key}
                      src={logo.url}
                      height={50}
                      width={50}
                      alt={`${logo.name}`}
                    />
                  )
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
