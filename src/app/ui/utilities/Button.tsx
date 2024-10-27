export default function Button({
  title,
  children,
  bg,
}: {
  title: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`${bg} px-3 py-2 text-sm h-fit gap-2 font-semibold text-black bg-mainBlue bg-opacity-80 hover:bg-opacity-100 rounded-md flex items-center duration-100`}
    >
      {children}
      {title}
    </button>
  );
}
