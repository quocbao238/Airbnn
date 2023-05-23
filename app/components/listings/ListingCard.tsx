

import useCountries from "@/app/hooks/useCountry";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";


interface ListingCardProps {
    data: Listing;
    reservation?: Reservation;
    onAction?: (id: string) => void;
    disable?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}



const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disable,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disable) {
                return;
            }

            onAction?.(actionId);
        }, [disable, actionId, onAction]
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


    }, [reservation]);




    return (
        <div>
            'Listing Card'
        </div>
    )
}

export default ListingCard;