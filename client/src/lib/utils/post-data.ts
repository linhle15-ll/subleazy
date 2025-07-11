
import { House } from '@/lib/types/house.types'
import { User } from '@/lib/types/user.types'
import {
  Wifi,
  Utensils,
  Dog,
  Wind,
  Clock,
  Users,
  BedDouble,
  Bath,
  Home,
  Building2,
  Car,
  Train,
  ShoppingCart,
  Accessibility,
  WashingMachine,
  Lock,
  PartyPopper,
  Cigarette,
  Cannabis,
} from 'lucide-react';

export const postData = (post: any) => {
    return {
    _id: `${post._id}`,
    title: `${post.title}`,
    zip: `${post.zip}`,
    price:`${post.price}`,
    address: `${(post.house as House).address}, ${post.suites ? `${post.suites},` : ''} ${post.city}, ${post.state} ${post.zip}`,
    author: post.author as User,
    amenities: [
      { icon: Wifi, label: post.amenities.wifi ? 'Wifi' : '' },
      { icon: Utensils, label: post.amenities.kitchen ? 'Kitchen' : '' },
      { icon: WashingMachine, label: post.amenities.laundry ? 'Laundry' : '' },
      {
        icon: Wind,
        label: post.amenities.airConditioning ? 'Air conditioning' : '',
      },
      { icon: Car, label: post.amenities.parking ? 'Parking' : '' },
    ].filter((amenity) => amenity.label),
    convenience: [
      {
        icon: Train,
        label: post.convenience.publicTransport ? 'Near public transport' : '',
      },
      {
        icon: ShoppingCart,
        label: post.convenience.supermarket ? 'Near supermarket' : '',
      },
      {
        icon: Accessibility,
        label: post.convenience.disabilityFriendly ? 'Disability friendly' : '',
      },
    ].filter((item) => item.label),
    roomInfo: [
      {
        icon: Home,
        label: `${post.houseInfo.houseType.charAt(0).toUpperCase() + post.houseInfo.houseType.slice(1)}`,
      },
      {
        icon: Building2,
        label: `${post.houseInfo.placeType.charAt(0).toUpperCase() + post.houseInfo.placeType.slice(1)} living space`,
      },
      {
        icon: Users,
        label: `Max ${post.bedroomInfo.maxGuests} guest${post.bedroomInfo.maxGuests > 1 ? 's' : ''}`,
      },
      {
        icon: BedDouble,
        label: `${post.bedroomInfo.bedrooms} bedroom${post.bedroomInfo.bedrooms > 1 ? 's' : ''}, ${post.bedroomInfo.beds} bed${post.bedroomInfo.beds > 1 ? 's' : ''}`,
      },
      {
        icon: Bath,
        label: `${post.bathroomInfo.privateAttached + post.bathroomInfo.privateAccessible} private, ${post.bathroomInfo.shared} shared bathroom`,
      },
      {
        icon: Lock,
        label: post.bedroomInfo.lock
          ? 'Room has lock'
          : 'Room does not have lock',
      },
    ],
    rules: [
      {
        icon: Clock,
        label: post.rules.quietHours
          ? `Quiet hours: ${post.rules.quietHours.from} - ${post.rules.quietHours.to}`
          : 'No quiet hours specified',
      },
      {
        icon: Users,
        label: post.rules.noGuest ? 'No guests allowed' : 'Guests allowed',
      },
      {
        icon: Dog,
        label: post.rules.noPet ? 'No pets allowed' : 'Pets allowed',
      },
      {
        icon: PartyPopper,
        label: post.rules.noParty ? 'No parties allowed' : 'Parties allowed',
      },
      {
        icon: Cigarette,
        label: post.rules.noSmoking ? 'No smoking allowed' : 'Smoking allowed',
      },
      {
        icon: Cannabis,
        label: post.rules.noDrug ? 'No drugs allowed' : 'Drugs allowed',
      },
    ],
    availability: {
      startDate: new Date(post.availability.startDate).toLocaleDateString(),
      endDate: new Date(post.availability.endDate).toLocaleDateString(),
      checkinTime: post.availability.checkinTime,
      checkoutTime: post.availability.checkoutTime,
    },
    whoElse: post.whoElse
      .map((item: any) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(', '),
    }
};