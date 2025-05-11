interface CabinProps {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string | FileList;
}

interface AddUserProps {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

interface SettingsProps {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}
