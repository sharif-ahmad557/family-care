export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-white dark:bg-gray-900 transition-colors">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
      </div>
    </div>
  );
}
