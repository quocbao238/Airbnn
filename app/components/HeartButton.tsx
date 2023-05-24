'use client'

import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

import useFavorite from "@/app/hooks/useFavorite";
import {SafeUser} from "@/app/types";
import ClientOnly from "./ClientOnly";
import React from "react";


interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}


const HeartButton: React.FC<HeartButtonProps> = (prop: HeartButtonProps) => {
  const {listingId, currentUser} = prop;

  const {hasFavorite, toggleFavorite} = useFavorite({
    listingId,
    currentUser,
  });


  return (
    <div
      className='relative hover:opacity-80 transition cursor-pointer'
      onClick={toggleFavorite}
    >
      <AiOutlineHeart
        size={30}
        className="fill-white absolute -top-[2px] -right-[3px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'}
      />
    </div>
  )
}
export default HeartButton;