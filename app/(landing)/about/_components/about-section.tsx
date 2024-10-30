const AboutUsSection = () => {
  return (
    <section
      id="about"
      className="w-full h-full mt-6 md:mt-12 flex items-center justify-center"
    >
      <div className="py-4 md:py-8 px-5 md:px-10 lg:px-12 flex flex-col items-center gap-7 md:gap-12 max-w-screen-2xl mx-auto min-h-screen">
        <div className="w-full flex flex-col items-center justify-center py-3 gap-8 md:gap-12 pb-4 md:pb-6">
          <h1 className="text-4xl md:text-6xl font-semibold text-green select-none">
            About Us
          </h1>
          <p className="text-sm md:text-lg font-medium text-green text-center w-full md:w-[80%] leading-[1.5rem] md:leading-[2.1rem]">
            Welcome to{" "}
            <span className="font-semibold">
              JAYMA BIO INNOVATIONS PRIVATE LIMITED
            </span>
            , founded in 2022 in Rourkela, dedicated to creating biobased,
            sustainable products for a healthier planet. Our journey began with
            kombucha, symbolizing eco-conscious wellness, and led to innovations
            like bacterial cellulose for sustainable textiles and packaging.
            Collaborating with NIT Rourkela students, we bridge research with
            real-world applications, fueling creativity in biotechnology. Our
            latest product, the Sap Symphony, transforms plant signals into
            music, deepening our connection with nature. At JAYMA,
            sustainability drives every choice. Join us in pioneering a future
            where responsible living is accessible to all.
          </p>
        </div>
        <div className="w-full flex items-center justify-center flex-col gap-6">
          <h1 className="text-3xl md:text-5xl font-semibold text-green select-none">
            Meet Our Leaders
          </h1>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
