const Skeleton = ({ className }: { className?: string }) => (
  <div
    className={`bg-background-lightC animate-pulse rounded-md ${className}`}
  />
);

export default Skeleton;
