export default function EmotionPicker({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="mb-4 text-warm-white">[EmotionPicker Stub]</p>
      <button
        onClick={onNext}
        className="px-6 py-3 bg-bright-amber text-soft-black rounded-full"
      >
        Next
      </button>
    </div>
  );
}
