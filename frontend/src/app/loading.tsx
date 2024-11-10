export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="space-y-8 text-center">
        {/* Spinner animado */}
        <div className="inline-block relative w-20 h-20">
          <div className="absolute border-8 border-solid border-blue-500 border-t-transparent rounded-full w-20 h-20 animate-spin"></div>
          <div className="absolute border-8 border-solid border-blue-300 border-t-transparent rounded-full w-16 h-16 top-2 left-2 animate-spin-slow"></div>
        </div>

        {/* Texto de carga */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Loading...
          </h2>
        </div>

        {/* Dots animados */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
}