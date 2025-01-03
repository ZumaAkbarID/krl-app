export default function MenuCard({
  image,
  title,
  onClick,
}: {
  image: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center p-2 min-w-24 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition duration-300 border-solid border-2 dark:border-opacity-10 border-gray-100 rounded-md min-h-28 max-w-28"
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-12 h-12 object-cover mb-2" />
      <p className="text-center text-xs">{title}</p>
    </div>
  );
}
