import Blog from "./blog"

class Centroid {
  blogs: Blog[]
  data: number[]
  changed: boolean
  constructor(blog?: Blog[], data?: number[], changed?: boolean) {
    this.blogs = blog || []
    this.data = data || []
    this.changed = changed || false
  }

  clearBlogs() {
    this.blogs = []
  }

  dataEquals(data: number[]) {
    return this.data.every((value, i) => value === data[i])
  }
}

export default Centroid