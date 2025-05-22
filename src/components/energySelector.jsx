export default function EnergySelector({ setEnergy }) {
    const options = [
      { label: "Low", description: "Not much energy, keep it light" },
      { label: "Medium", description: "Some headspace for something decent" },
      { label: "High", description: "I’m sharp, give me something deep or wild" },
    ];
  
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-center">
          How much mental energy do you have right now?
        </h2>
  
        <div className="space-y-4">
          {options.map(({ label, description }) => (
            <button
              key={label}
              onClick={() => setEnergy(label)}
              className="w-full text-left py-3 px-4 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <span className="block text-lg font-medium">{label}</span>
              <span className="block text-sm text-gray-400">{description}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }