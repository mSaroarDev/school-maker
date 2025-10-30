import Image from "next/image";

interface AvatarProps {
  fullName: string;
  avatar?: string;
  size?: number;
}

const Avatar = ({ fullName = "", avatar, size = 40 }: AvatarProps) => {

  const nameJoin = fullName.split(" ").join("%20");
  const srcLink = `https://api.dicebear.com/9.x/initials/png?seed=${nameJoin}`

  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden flex items-center justify-center relative"
    >
      <Image
        src={avatar ? avatar : srcLink}
        alt={fullName}
        fill
        className="object-cover rounded-full"
      />
    </div>
  );
};

export default Avatar;
