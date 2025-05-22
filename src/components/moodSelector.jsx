const moods = [
  "Sad",
  "Defeated",
  "Lonely",
  "Anxious",
  "Angry",
  "Numb",
  "Curious",
  "Inspired",
  "Happy",
  "Calm",
];

export default function MoodSelector({ setMood }) {
	return (
	  <div className="space-y-6">
		<h2 className="text-2xl font-semibold text-center text-warm-white">How are you feeling?</h2>
		<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
		  {moods.map((mood) => (
			<button
			  key={mood}
			  onClick={() => setMood(mood)}
			  className="py-2 px-4 rounded-md text-sm font-medium bg-pale-sage text-soft-black hover:bg-glow-amber transition-colors"
			>
			  {mood}
			</button>
		  ))}
		</div>
	  </div>
	);
  }
  