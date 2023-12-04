import Blog from "../models/blog";

export default function BlogItem({ blog }: { blog: Blog }) {
  return (
    <li class="leading-6 px-3 text-gray-800">
      {blog.name}
    </li>
  )
}