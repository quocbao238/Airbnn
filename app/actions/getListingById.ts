import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}


export default async function getListingById(params: IParams) {


  try {
    if (!params.listingId) {
      return null;
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId
      },
      include: {
        user: true
      }
    });

    if (!listing) {
      return null;
    }

    const safeUser = {
      ...listing.user,
      createdAt: listing.user.createdAt.toISOString(),
      updateAt: listing.user.updatedAt.toISOString(),
      emailVerified: listing.user.emailVerified?.toISOString() || null
    }

    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }



    return {
      ...safeListing,
      user: safeUser
    }


  } catch (e: any) {
    throw new Error(e);
  }
}