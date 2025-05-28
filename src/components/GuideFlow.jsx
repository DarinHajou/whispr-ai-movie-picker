	import { useState } from "react";
	import { TypeAnimation } from "react-type-animation";
	import MoodSelector from "./MoodSelector";
	import IntentSelector from "./IntentSelector";
	import EnergySelector from "./EnergySelector";
	import { AnimatePresence, motion } from "framer-motion";

	export default function GuidedFlow({
		step,
		setStep,
		mood,
		setMood,
		setIntent,
		setEnergy
	}) {
	const [showMood, setShowMood] = useState(false);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={step}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.4 }}
			>
				{/* STEP 1 */}
				{step === 1 && (
					<>
						<div className="-mt-6 text-center mb-2 text-glow-amber text-xl sm:text-3xl font-medium min-h-[6rem] max-w-md mx-auto">
							<TypeAnimation
								sequence={[
									"Hi.",
									1000,
									"I’m Sol.",
									1000,
									"Tell me how you feel, and I’ll whisper something worth watching.",
									300,
									() => setShowMood(true)
								]}
								speed={95}
								wrapper="span"
								cursor={true}
								repeat={0}
							/>
						</div>

						{showMood && (
							<div className="flex flex-col items-center max-w-md mx-auto animate-fade-in">
								<p className="mb-2 text-xl">How do you feel today?</p>
								<div className="mt-2">
									<MoodSelector
										setMood={(selected) => {
											setMood(selected);
											setStep(2);
										}}
									/>
								</div>
							</div>
						)}
					</>
				)}

				{/* STEP 2 */}
				{step === 2 && (
					<>
						<IntentSelector
							mood={mood}
							setIntent={(selected) => {
								setIntent(selected);
								setStep(3);
							}}
						/>
						<div className="text-center mt-4">
							<button
								onClick={() => setStep(1)}
								className="text-sm text-gray-400 hover:text-white underline"
							>
								← Go back
							</button>
						</div>
					</>
				)}

				{/* STEP 3 */}
				{step === 3 && (
					<>
						<EnergySelector
							setEnergy={(energyLevel) => {
								setEnergy(energyLevel);
								setStep(4);
							}}
						/>
						<div className="text-center mt-4">
							<button
								onClick={() => setStep(2)}
								className="text-sm text-gray-400 hover:text-white underline"
							>
								← Go back
							</button>
						</div>
					</>
				)}
			</motion.div>
		</AnimatePresence>
	);
  }