import Blog from "../models/blog"


export function toBlog(crudeBlogs: string[][]) {
  return crudeBlogs.map(([name, ...data]) =>
    new Blog(name, data.map(value => parseInt(value)))
  )
}

export function occurences(words: string[], blogs: Blog[]) {
  return words.map((_word, i) => blogs.map(other => other.data[i]))
}

export function occurences2(words: string[], data: number[][]) {
  return words.map((_word, i) => data.map(other => other[i]))
}