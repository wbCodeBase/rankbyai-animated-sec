import { AIChatDemo } from "@/components/ai-chat-demo/AIChatDemo";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 pb-12 sm:px-10"> 
      {/* blurred background photo */}
       <div
        className="absolute -inset-5 -z-20 scale-110 bg-cover bg-center blur-md"
        // style={{ backgroundImage: "url(/cta-bg.jpg)" }}
      />
      <div className="absolute -inset-5 -z-10 bg-[#000000]" />
      {/* <div className="absolute -inset-5 -z-10 bg-[#060a18]/65" /> */}

    {/*  <div className="relative z-10 mb-10 max-w-5xl text-center sm:mb-14">
        <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-5xl">
          Our <span className="text-[#4d9fff]">AI Ranking</span> Service, Live
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-[14px] leading-relaxed text-white/70 sm:text-base">
          This is the same AI Visibility engine our GEO &amp; AEO specialists run for every client watch how
          ChatGPT, Gemini, Perplexity and Claude rank, cite and recommend a brand in real time.
        </p>
      </div> */}

      <AIChatDemo />

    </main>
  );
}
