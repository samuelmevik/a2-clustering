import Centroid from "../models/centroid";
import CentroidItem from "./centroid-item";

export default function CentroidList({ centroids }: { centroids: Centroid[] }) {
  return (
    <div class="w-full px-8 mx-auto mt-2 space-y-1  lg:max-w-md">
      {centroids.map((centroid, i) => <CentroidItem centroid={centroid} index={i} />)}
    </div>
  )
}