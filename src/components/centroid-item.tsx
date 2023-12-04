import Centroid from "../models/centroid";
import BlogItem from "./blog-item";

export default function CentroidItem({ centroid, index }: { centroid: Centroid, index: number }) {

  return (
    <details class=" rounded-lg">
      <summary class="font-semibold bg-blue-200 px-4 py-2  text-lg cursor-pointer">Centroid {index + 1}, with {centroid.blogs.length} blogs!</summary>
      <ul class=" bg-blue-100">
        {centroid.blogs.map(blog => <BlogItem blog={blog} />)}
      </ul>
    </details>
  )
}