const Skeleton = ({ className }: { className?: string }) => (
  <div className={`bg-bg-lightC animate-pulse rounded-md ${className}`} />
);

export default Skeleton;
