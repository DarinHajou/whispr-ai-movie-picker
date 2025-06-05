export default function ExperienceSelector({ setExperience, setStep }) {
	const experiences = [
		{ label: "Make me feel something deep" },
		{ label: "Give me something fun and light" },
		{ label: "I want to process something heavy" },
		{ label: "Show me something that makes me think" },
		{ label: "I need to escape reality for a bit" },
	];

	return (
		<div className="flex flex-col items-center mt-8 space-y-8">
			<h2 className="text-lg sm:text-xl font-medium italic text-warm-white text-center mb-4">
				What kind of experience are you in the mood for?
			</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
				{experiences.map(exp => (
					<button
						key={exp.label}
						onClick={() => {
							setExperience(exp.label);
							setStep(3);
						}}
						className="w-full px-3 py-4 text-base font-medium text-soft-black bg-pale-sage rounded-xl transition hover:bg-mood-hover hover:text-soft-black hover:scale-[1.02] focus:outline-none focus:shadow-[0_0_0_2px_rgba(244,194,135,0.6)]"
					>
						{exp.label}
					</button>
				))}
			</div>
			<button
				onClick={() => setStep(1)}
				className="text-sm text-glow-amber underline mt-4"
			>
				← Go back to mood picker
			</button>
		</div>
	);
}
  