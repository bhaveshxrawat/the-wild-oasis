interface CabinProps {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}

interface CabinPropsLocal extends CabinProps {
  image: FileList;
}
