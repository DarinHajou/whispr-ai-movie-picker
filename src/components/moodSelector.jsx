export default function MoodSelector({ setMood }) {
	const moods = [
	  { label: "Sad", emoji: "😢" },
	  { label: "Defeated", emoji: "🥀" },
	  { label: "Lonely", emoji: "😔" },
	  { label: "Anxious", emoji: "😰" },
	  { label: "Angry", emoji: "😡" },
	  { label: "Numb", emoji: "😶" },
	  { label: "Curious", emoji: "🧐" },
	  { label: "Inspired", emoji: "✨" },
	  { label: "Happy", emoji: "😊" },
	  { label: "Calm", emoji: "🌿" }
	];
  
	return (
		<div className="w-full px-4 flex justify-center">
			<div className="grid grid-cols-2 gap-x-4 gap-y-4" style={{ maxWidth: '20rem' }}>
				{moods.map((mood) => (
					<button
						key={mood.label}
						onClick={() => setMood(mood.label)}
						className="w-full px-2 py-3 rounded-xl text-sm sm:text-base font-medium bg-pale-sage text-soft-black hover:bg-glow-amber transition flex items-center justify-center gap-2"
					>
						<span className="text-xl">{mood.emoji}</span>
						<span className="whitespace-nowrap">{mood.label}</span>
					</button>
				))}
			</div>
		</div>
	);				
}
  