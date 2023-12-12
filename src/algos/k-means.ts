import { pearson } from "./similarity";
import { occurences } from "../dataset/parser";
import Blog from "../models/blog";
import Centroid from "../models/centroid";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function createRandomCentroids(k: number, occurences: number[][]) {
  const centroids: Centroid[] = [];
  for (let i = 0; i < k; i++) {
    const centroid = new Centroid();
    for (const occurence of occurences) {
      centroid.data.push(randomInt(Math.min(...occurence), Math.max(...occurence)));
    }
    centroids.push(centroid);
  }
  return centroids;
}

export function assignBlogsToCentroid(centroids: Centroid[], blogs: Blog[]) {
  for (const blog of blogs) {
    const scores = centroids.map(centroid => pearson(blog.data, centroid.data));
    const min = Math.min(...scores);
    const index = scores.indexOf(min);
    centroids[index].blogs.push(blog);
  }
}

export function updateCentroids(centroids: Centroid[], words: string[]) {
  for (const centroid of centroids) {
    const occurency = occurences(words, centroid.blogs)
    const avg = occurency.map(entry => entry.reduce((value, acc) => value + acc, 0) / entry.length)
    centroid.changed = !centroid.dataEquals(avg)
    centroid.data = avg
  }
}

export function clearBlogs(centroids: Centroid[]) {
  for (const centroid of centroids) {
    centroid.clearBlogs()
  }
}