'use client';

import { useFilterStore } from '@/lib/stores/filter.store';
import { HouseType, PlaceType } from '@/lib/types/enums';
import { cn } from '@/lib/cn-utils';
import { Popover, PopoverContent, PopoverTrigger } from '../commons/popover';
import { Button } from '../button';
import {
  Accessibility,
  Bath,
  Building,
  Cannabis,
  Cigarette,
  CigaretteOff,
  CircleParking,
  CookingPot,
  Filter,
  Fish,
  FishOff,
  House,
  KeyRound,
  LockKeyhole,
  LockKeyholeOpen,
  MegaphoneOff,
  PartyPopper,
  ShowerHead,
  Siren,
  Store,
  ThermometerSnowflake,
  TramFront,
  Trash2,
  UserRoundCheck,
  UserRoundX,
  WashingMachine,
  Wifi,
} from 'lucide-react';
import React from 'react';
import {
  Amenities,
  BathroomInfo,
  Convenience,
  HouseInfo,
  Rules,
} from '@/lib/types/post.types';
import { DatePickerFilterButton } from '../date/date-picker';

const FilterButton = ({
  text,
  icon: Icon,
  selected,
  onClick,
}: {
  text: string;
  icon?: React.ElementType;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'rounded-2xl border-2 text-xs font-normal',
        selected && 'border-lightOrange'
      )}
    >
      {Icon && <Icon />}
      {text}
    </Button>
  );
};

const InputField = ({
  name,
  value,
  placeholder,
  onChange,
  onBlur,
}: {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}) => {
  return (
    <div className="flex flex-col pb-2">
      <span className={`text-xs text-center pb-1`}>{name}</span>
      <input
        type="number"
        className={`w-20 border-2 border-gray-300 focus:outline-none rounded-xl p-1 text-center self-center`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
  );
};

export function FilterMenu({ isLandingPage }: { isLandingPage: boolean }) {
  const filters = useFilterStore((state) => state.filters);
  const setFilters = useFilterStore((state) => state.setFilters);

  const handlePriceChange = (key: 'minPrice' | 'maxPrice', value: number) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const selectPrice = (key: 'minPrice' | 'maxPrice', value: number) => {
    const curPrice = Math.round(value);
    if (curPrice <= 0 || curPrice >= 4500) {
      setFilters({
        ...filters,
        [key]: undefined,
      });
      return;
    }
    if (key === 'minPrice' && filters.maxPrice && curPrice > filters.maxPrice) {
      setFilters({
        ...filters,
        minPrice: filters.maxPrice,
        maxPrice: curPrice,
      });
      return;
    } else if (
      key === 'maxPrice' &&
      filters.minPrice &&
      curPrice < filters.minPrice
    ) {
      setFilters({
        ...filters,
        maxPrice: filters.minPrice,
        minPrice: curPrice,
      });
      return;
    }
    setFilters({
      ...filters,
      [key]: curPrice,
    });
  };

  const selectHouseInfo = (
    key: keyof HouseInfo,
    value: HouseType | PlaceType
  ) => {
    setFilters({
      ...filters,
      houseInfo: {
        ...filters.houseInfo,
        [key]: value == filters.houseInfo?.[key] ? undefined : value,
      },
    });
  };

  const selectBedroomInfo = (key: 'maxGuests' | 'bedrooms', value: number) => {
    if (value < 0 || value > 50) return;
    setFilters({
      ...filters,
      bedroomInfo: {
        ...filters.bedroomInfo,
        [key]: Math.round(value),
      },
    });
  };

  const selectBathroomInfo = (key: keyof BathroomInfo) => {
    setFilters({
      ...filters,
      bathroomInfo: {
        ...filters.bathroomInfo,
        [key]: filters.bathroomInfo?.[key] ? 0 : 1,
      },
    });
  };

  const selectAmenities = (key: keyof Amenities) => {
    setFilters({
      ...filters,
      amenities: {
        ...filters.amenities,
        [key]: !filters.amenities?.[key],
      },
    });
  };

  const selectConvenience = (key: keyof Convenience) => {
    setFilters({
      ...filters,
      convenience: {
        ...filters.convenience,
        [key]: !filters.convenience?.[key],
      },
    });
  };

  const selectRules = (key: keyof Rules, value: boolean) => {
    setFilters({
      ...filters,
      rules: {
        ...filters.rules,
        [key]: value == filters.rules?.[key] ? undefined : value,
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* TODO: Smaller button if not landing page */}
        {isLandingPage ? (
          <div className="flex gap-2 cursor-pointer">
            <Filter className="h-6 w-6 text-grey" />
            <span className="font-medium">Filters</span>
          </div>
        ) : (
          <Button></Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-full sm:w-[28vw] flex-col bg-white space-y-2 p-2 focus:outline-none"
      >
        <div className="flex flex-col items-center border-b border-gray-300 pb-2">
          <span className="text-xl font-semibold">Filters</span>
          <span>Find your best places</span>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <div className="flex flex-col border-b border-gray-300 pb-2">
            <span className="font-medium text-left">Price range</span>
            <span className="text-xs text-left">Price/month</span>
            <div className="flex justify-around pt-1">
              <InputField
                name="Minimum"
                value={filters.minPrice?.toString() || ''}
                placeholder="$0"
                onChange={(e) =>
                  handlePriceChange('minPrice', e.target.valueAsNumber)
                }
                onBlur={() => selectPrice('minPrice', filters.minPrice!)}
              />
              <InputField
                name="Maximum"
                value={filters.maxPrice?.toString() || ''}
                placeholder="$4500+"
                onChange={(e) =>
                  handlePriceChange('maxPrice', e.target.valueAsNumber)
                }
                onBlur={() => selectPrice('maxPrice', filters.maxPrice!)}
              />
            </div>
          </div>

          <div className="flex flex-col border-b border-gray-300 pb-2">
            <span className="font-medium text-left">Availability</span>
            <div className="flex flex-wrap justify-around gap-2 pb-2 pt-1">
              <DatePickerFilterButton text="Check in" field="startDate" />
              <DatePickerFilterButton text="Check out" field="endDate" />
            </div>
          </div>

          <div className="flex flex-col border-b border-gray-300 pb-2">
            <span className="font-medium text-left">Basic information</span>
            <span className="text-xs text-left">Type of house</span>
            <div className="flex flex-wrap gap-2 pb-2 pt-1">
              <FilterButton
                text="House"
                icon={House}
                selected={filters.houseInfo?.houseType === HouseType.HOUSE}
                onClick={() => selectHouseInfo('houseType', HouseType.HOUSE)}
              />
              <FilterButton
                text="Apartment"
                icon={Building}
                selected={filters.houseInfo?.houseType === HouseType.APT}
                onClick={() => selectHouseInfo('houseType', HouseType.APT)}
              />
            </div>
            <span className="text-xs text-left">Type of place</span>
            <div className="flex flex-wrap gap-2 pb-2 pt-1">
              <FilterButton
                text="Entire place"
                icon={KeyRound}
                selected={filters.houseInfo?.placeType === PlaceType.ENTIRE}
                onClick={() => selectHouseInfo('placeType', PlaceType.ENTIRE)}
              />
              <FilterButton
                text="Private room"
                icon={LockKeyhole}
                selected={filters.houseInfo?.placeType === PlaceType.PRV}
                onClick={() => selectHouseInfo('placeType', PlaceType.PRV)}
              />
              <FilterButton
                text="Shared room"
                icon={LockKeyholeOpen}
                selected={filters.houseInfo?.placeType === PlaceType.SHARED}
                onClick={() => selectHouseInfo('placeType', PlaceType.SHARED)}
              />
            </div>
            <span className="text-xs text-left">Type of bathroom</span>
            <div className="flex flex-wrap gap-2 pb-2 pt-1">
              <FilterButton
                text="Private bathroom"
                icon={Bath}
                selected={filters.bathroomInfo?.privateAccessible === 1}
                onClick={() => selectBathroomInfo('privateAccessible')}
              />
              <FilterButton
                text="Shared bathroom"
                icon={ShowerHead}
                selected={filters.bathroomInfo?.shared === 1}
                onClick={() => selectBathroomInfo('shared')}
              />
            </div>
            <div className="flex justify-around">
              <InputField
                name="Number of guests"
                value={
                  filters.bedroomInfo?.maxGuests
                    ? filters.bedroomInfo?.maxGuests.toString()
                    : ''
                }
                placeholder="0"
                onChange={(e) =>
                  selectBedroomInfo('maxGuests', e.target.valueAsNumber)
                }
              />
              <InputField
                name="Number of bedrooms"
                value={
                  filters.bedroomInfo?.bedrooms
                    ? filters.bedroomInfo?.bedrooms.toString()
                    : ''
                }
                placeholder="0"
                onChange={(e) =>
                  selectBedroomInfo('bedrooms', e.target.valueAsNumber)
                }
              />
            </div>
          </div>

          <div className="flex flex-col border-b border-gray-300 pb-2">
            <span className="font-medium text-left">Essentials</span>
            <div className="flex flex-wrap gap-2 pb-2 pt-1">
              <FilterButton
                text="Wifi"
                icon={Wifi}
                selected={filters.amenities?.wifi === true}
                onClick={() => selectAmenities('wifi')}
              />
              <FilterButton
                text="Kitchen"
                icon={CookingPot}
                selected={filters.amenities?.kitchen === true}
                onClick={() => selectAmenities('kitchen')}
              />
              <FilterButton
                text="Laundry"
                icon={WashingMachine}
                selected={filters.amenities?.laundry === true}
                onClick={() => selectAmenities('laundry')}
              />
              <FilterButton
                text="Parking"
                icon={CircleParking}
                selected={filters.amenities?.parking === true}
                onClick={() => selectAmenities('parking')}
              />
              <FilterButton
                text="Air conditioner"
                icon={ThermometerSnowflake}
                selected={filters.amenities?.airConditioning === true}
                onClick={() => selectAmenities('airConditioning')}
              />
              <FilterButton
                text="Near public transportation"
                icon={TramFront}
                selected={filters.convenience?.publicTransport === true}
                onClick={() => selectConvenience('publicTransport')}
              />
              <FilterButton
                text="Near supermarket"
                icon={Store}
                selected={filters.convenience?.supermarket === true}
                onClick={() => selectConvenience('supermarket')}
              />
              <FilterButton
                text="Disability friendly"
                icon={Accessibility}
                selected={filters.convenience?.disabilityFriendly === true}
                onClick={() => selectConvenience('disabilityFriendly')}
              />
            </div>
          </div>

          <div className="flex flex-col border-b border-gray-300 pb-2">
            <span className="font-medium text-left">House rules</span>
            <div className="flex flex-wrap gap-2 pb-2 pt-1">
              <FilterButton
                text="Pet allowed"
                icon={Fish}
                selected={filters.rules?.noPet === false}
                onClick={() => selectRules('noPet', false)}
              />
              <FilterButton
                text="Pet prohibited"
                icon={FishOff}
                selected={filters.rules?.noPet === true}
                onClick={() => selectRules('noPet', true)}
              />
              <FilterButton
                text="Smoking allowed"
                icon={Cigarette}
                selected={filters.rules?.noSmoking === false}
                onClick={() => selectRules('noSmoking', false)}
              />
              <FilterButton
                text="Smoking prohibited"
                icon={CigaretteOff}
                selected={filters.rules?.noSmoking === true}
                onClick={() => selectRules('noSmoking', true)}
              />
              <FilterButton
                text="Party allowed"
                icon={PartyPopper}
                selected={filters.rules?.noParty === false}
                onClick={() => selectRules('noParty', false)}
              />
              <FilterButton
                text="Party prohibited"
                icon={MegaphoneOff}
                selected={filters.rules?.noParty === true}
                onClick={() => selectRules('noParty', true)}
              />
              <FilterButton
                text="Drug allowed"
                icon={Cannabis}
                selected={filters.rules?.noDrug === false}
                onClick={() => selectRules('noDrug', false)}
              />
              <FilterButton
                text="Drug prohibited"
                icon={Siren}
                selected={filters.rules?.noDrug === true}
                onClick={() => selectRules('noDrug', true)}
              />
              <FilterButton
                text="Guest allowed"
                icon={UserRoundCheck}
                selected={filters.rules?.noGuest === false}
                onClick={() => selectRules('noGuest', false)}
              />
              <FilterButton
                text="Guest prohibited"
                icon={UserRoundX}
                selected={filters.rules?.noGuest === true}
                onClick={() => selectRules('noGuest', true)}
              />
            </div>
          </div>

          <div
            className="flex align-center cursor-pointer"
            onClick={() => setFilters({})}
          >
            <Trash2 className="h-4 w-4 text-grey" />
            <span className="font-medium text-left text-xs px-1">
              Clear all
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
