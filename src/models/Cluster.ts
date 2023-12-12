import { occurences } from "../dataset/parser";
import Blog from "./blog";

class Cluster {
  blog: Blog;
  left?: Cluster;
  right?: Cluster;
  parent?: Cluster;
  distance?: number;

  constructor(blog: Blog, distance?: number,) {
    this.blog = blog;
    this.distance = distance || 0;
  }

  merge(words: string[], other: Cluster, distance: number) {
    const occurency = occurences(words, [this.blog, other.blog])
    const avg = occurency.map(entry => entry.reduce((value, acc) => value + acc, 0) / entry.length)
    const newCluster = new Cluster(new Blog("Cluster", avg), distance)
    newCluster.left = this;
    newCluster.right = other;
    this.parent = newCluster;
    return newCluster;
  }
}

export default Cluster;