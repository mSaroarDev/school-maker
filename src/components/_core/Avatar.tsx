import Image from "next/image";
import { useMemo } from "react";

interface AvatarProps {
  fullName: string;
  avatar?: string;
  size?: number;
}

const Avatar = ({ fullName = "", avatar, size = 40 }: AvatarProps) => {
  const avatarColor = useMemo(() => {
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "purple",
      "pink",
      "indigo",
      "teal",
      "orange",
      "cyan",
    ];
    let hash = 0;
    for (let i = 0; i < fullName.length; i++) {
      hash = fullName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }, [fullName]);

  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase();
  };

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden flex items-center justify-center relative"
    >
      {avatar ? (
        <Image
          src={avatar}
          alt={fullName}
          fill
          className="object-cover rounded-full"
        />
      ) : (
        <div
          className="w-full h-full rounded-full flex items-center justify-center font-bold text-lg"
          style={{
            backgroundColor: `${avatarColor}1A`,
            color: avatarColor,
          }}
        >
          {getInitials(fullName)}
        </div>
      )}
    </div>
  );
};
export default Avatar;