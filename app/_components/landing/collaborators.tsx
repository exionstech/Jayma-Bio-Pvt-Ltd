import { MovingCards } from "@/components/shared/moving-card";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Collaborators() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <MovingCards pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </MovingCards>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}



// const Collaborators = () => {
//     return (
//       <section className="w-full px-5 md:px-14 min-h-screen flex flex-col max-w-screen-2xl mx-auto h-full pt-10 lg:pt-16 gap-[5rem]">
//         <div className="text-center">
//           <h2 className="text-3xl leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] 2xl:text-6xl md:text-5xl font-bold md:font-semibold text-green line-clamp-6">
//             Recent Collaborations <br />& {" "}
//             <span className="bg-lightGreen text-green py-0.5 px-3 leading-[2.8rem] md:leading-[4.3rem] 2xl:leading-[5.3rem] md:px-4 rounded-full text-3xl 2xl:text-6xl md:text-5xl font-bold md:font-semibold items-center justify-center">
//               Innovations
//             </span>
//           </h2>
//         </div>
//         <div className="lg:h-[50vh] h-[40vh] bg-pink-100 w-full flex items-center justify-center">
//           <ImageSlider images={[
//               "/landing/collaborators/c1.svg",
//               "/landing/collaborators/c2.svg",
//               "/landing/collaborators/c3.svg",
//               "/landing/collaborators/c4.svg",
//               "/landing/collaborators/c5.svg"
//           ]}/>
//         </div>
//         <div className="w-full flex items-center justify-center py-2">
//           <AnimatedButton buttonText="All Products" link={"/"} />
//         </div>
//       </section>
//     );
//   };