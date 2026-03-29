import organicLines from "@/assets/organic-lines.png";

/**
 * Decoração lateral com linhas orgânicas abstratas.
 * Visível apenas em telas md+ para não interferir no mobile.
 */
const BackgroundDecoration = () => {
  return (
    <>
      <img
        src={organicLines}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 h-full w-[280px] object-cover opacity-25 select-none hidden lg:block"
      />
      <img
        src={organicLines}
        alt=""
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 h-full w-[280px] object-cover opacity-25 select-none hidden lg:block"
        style={{ transform: "scaleX(-1)" }}
      />
    </>
  );
};

export default BackgroundDecoration;
