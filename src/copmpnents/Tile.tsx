import Feels from "./Icons/Feels";
import Wind from "./Icons/Wind";
import Humidity from "./Icons/Humidity";
import Visibility from "./Icons/Visibility";
type props = {
  icon: "wind" | "feels" | "humidity" | "visibility";
  title: string;
  info: string | JSX.Element;
  description: string;
};
const icons = {
  wind: Wind,
  feels: Feels,
  humidity: Humidity,
  visibility: Visibility,
};
function Tile({ icon, title, info, description }: props): JSX.Element {
  const Icon = icons[icon];
  return (
    <article className="w-[140px] h-[130px] text-xs font-bold flex flex-col items-center bg-white/20 rounded backdrop-blur-lg drop-shadow-lg py-4 mb-5">
      <div className="flex item-center text-sm font-bold">
        <Icon />
        <h4 className="ml-1">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>
      <p className="text-xs font-bold mt-2">{description}</p>
    </article>
  );
}

export default Tile;
