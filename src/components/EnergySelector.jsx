export default function EnergySelector({ setEnergy }) {
  const options = [
    { label: "Low", description: "Not much energy, keep it light" },
    { label: "Medium", description: "Some headspace for something decent" },
    { label: "High", description: "I’m sharp, give me something deep or wild" },
  ];

  return (
    <div className="space-y-8 w-full max-w-xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-semibold mt-8 mb-12 text-warm-white">
        How much mental{" "}
        <span className="italic text-[#FFC542]">
          Energy
        </span>{" "}
        do you have right now?
      </h2>

      <div className="space-y-4">
        {options.map(({ label, description }) => (
          <button
            key={label}
            onClick={() => setEnergy(label)}
            className="
              w-full text-left px-5 py-4 sm:py-5 rounded-xl
              bg-[#1d283a] hover:bg-[#2a3650]
              focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-glow-amber
              transition-all duration-200
            "
          >
            <span className="block text-lg sm:text-xl font-semibold text-warm-white">
              {label}
            </span>
            <span className="block text-sm sm:text-base text-gray-400 mt-1">
              {description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
