"use client";

import Image from "next/image";
import { LuCamera } from "react-icons/lu";
import { cn } from "@/lib/utils";

export interface AvatarChangeProps {
  className?: string;
}

const DEFAULT_FALLBACK_AVATAR =
  "https://i.pravatar.cc";

export const AvatarChange = ({
  className

}: AvatarChangeProps) => {



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        // You can do something with the base64 image here
        console.log("Base64 image:", base64Image);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <label htmlFor="avatar" className={cn("relative rounded cursor-pointer group border border-gray-200 size-12 sm:size-32 inline-flex shrink-0", className)}>
      {/* Hidden File Input */}
      <input
        type="file"
        name="avatar"
        id="avatar"
        accept="image/png, image/jpeg, image/webp, image/svg+xml"
        className="hidden"
        onChange={handleFileChange}
      />
      {/* Image */}
      <Image
        src={DEFAULT_FALLBACK_AVATAR}
        alt="Avatar"
        width={80}
        height={80}
        className="object-cover w-full h-full rounded transition-opacity duration-200 group-hover:opacity-80"
      />

      {/* Camera Icon */}
      <div className="absolute bottom-1 right-1 size-6 rounded-full bg-white shadow-2xs flex items-center justify-center transition-opacity duration-200">
        <LuCamera className="text-forest" />
      </div>
    </label>
  );

};

export default AvatarChange;