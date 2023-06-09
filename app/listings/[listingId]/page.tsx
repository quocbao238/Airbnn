import getListingById from "@/app/actions/getListingById";

import getCurrentUser from "@/app/actions/getCurrentUser";


import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({params}: { params: IParams }) => {

    const listing = await getListingById(params);
    const currentUser = await getCurrentUser();

    console.log("listing", listing);

    if (!listing) return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )


    return (
      <ClientOnly>
        {/*<div className="col-auto, flex-col">*/}
        {/*  {listing.title}*/}

        {/*  {listing.description}*/}

        {/*</div>*/}
        <ListingClient
          listing={listing}
          currentUser={currentUser}/>
      </ClientOnly>
    )
  }
;


export default ListingPage;