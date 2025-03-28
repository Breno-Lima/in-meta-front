export function LoadingSpinner({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    default: 'h-8 w-8 border-4',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-cyan-400 border-t-transparent`}></div>
    </div>
  );
}
