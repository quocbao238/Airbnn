'use client'

import useCountries from "@/app/hooks/useCountry";
import {SafeListing, SafeUser} from "@/app/types";
import {Reservation} from "@prisma/client";
import {useRouter} from "next/navigation";
import React, {useCallback, useMemo} from "react";
import {format} from "date-fns";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";
import Button from "@/app/components/Button";


interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disable?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}


const ListingCard: React.FC<ListingCardProps> = (props: ListingCardProps) => {
  const {data, reservation, onAction, disable, actionLabel, actionId, currentUser} = props;
  const router = useRouter()
  const {getByValue} = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disable) {
        return;
      }
      if (onAction) {
        onAction(actionId || "");
      }
    }, [onAction, actionId, disable]
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;


  }, [reservation]);


  const handleOnClick = () => {
    if (currentUser) {
      router.push(`/listings/${data.id}`)
    } else {
      router.push(`/login`)
    }
  }

  console.log(data.imageSrc)


  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={handleOnClick}>
      <div className='flex flex-col gap-1 w-full'>
        <div
          className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt='Listings'
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />

          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />

          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500/90">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && (<div className="font-light">night</div>)}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disable}
            small
            label={actionLabel}
            onClick={handleCancel}
          />

        )}
      </div>
    </div>
  )
}

export default ListingCard;