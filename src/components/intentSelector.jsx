export default function IntentSelector({ mood, setIntent }) {
  const options = [
    { label: "Escape", description: "I just want to forget for a while" },
    { label: "Understand", description: "Help me process what I'm feeling" },
    { label: "Transform", description: "I want to shift this energy" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">
        What do you want to do with your {mood.toLowerCase()} feeling?
      </h2>

      <div className="space-y-4">
        {options.map(({ label, description }) => (
          <button
            key={label}
            onClick={() => setIntent(label)}
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