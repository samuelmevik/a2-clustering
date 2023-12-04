import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html"
import heatMapReader from "./dataset/reader";
import { toBlog, occurences } from "./dataset/parser";
import { assignBlogsToCentroid, clearBlogs, createRandomCentroids, updateCentroids } from "./algos/k-means";
import BaseHTML from "./components/base-html";
import CentroidList from "./components/centroid-list";
import Box from "./components/box";
import BoxDivider from "./components/box-divider";
import Blog from "./models/blog";
import Cluster from "./models/Cluster";
import { pearson } from "./algos/similarity";
import ClusterList from "./components/cluster";

const app = new Elysia()


const file = Bun.file("src/dataset/blogdata.txt")
if (!file.exists()) {
  throw new Error("File not found")
}

const [crudeWords, ...crudeBlogs] = await heatMapReader(file)
const [_dump, ...blogWords] = crudeWords
const blogs = toBlog(crudeBlogs)

app.use(html()).get("/", () => {
  return (
    <BaseHTML>
      <body class="max-w-2xl mx-auto px-4 mt-6">
        <Box>
          <a href="/k">Goto K kluster</a>
          <br />
          <a href="/h">Goto H kluster</a>
        </Box>
      </body>

    </BaseHTML>
  )
})

app.use(html()).get("/k", () => {
  return (
    <BaseHTML>
      <body class="max-w-2xl mx-auto px-4 mt-6">
        <Box>
          <BoxDivider>
            <div id="content">
              <p>There are no blogs to show</p>
            </div>
            <form
              class="flex flex-col space-y-2 max-w-sm mx-auto"
              hx-post="api/k-cluster"
              hx-target="#content"
              hx-swap="innerHTML"
            >
              <input type="number" name="centroids" id="centroids" />
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </form>
          </BoxDivider>
        </Box>
      </body>
    </BaseHTML>
  )
})

app.use(html()).get("/h", () => {
  return (
    <BaseHTML>
      <body class="max-w-2xl mx-auto px-4 mt-6">
        <Box>
          <p
            hx-get="api/hi-cluster"
            hx-trigger="load"
            hx-target="closest p"
            hx-swap="outerHTML"
          >Loading...</p>
        </Box>
      </body>
    </BaseHTML>
  )
})

app.use(html()).post("api/k-cluster", async ({ body }) => {
  const centroids = createRandomCentroids(body.centroids, occurences(blogWords, blogs))
  assignBlogsToCentroid(centroids, blogs)
  do {
    updateCentroids(centroids, blogWords)
    clearBlogs(centroids)
    assignBlogsToCentroid(centroids, blogs)
  } while (centroids.some(centroid => centroid.changed))

  return (
    <CentroidList centroids={centroids} />
  )
},
  {
    body: t.Object({
      centroids: t.Numeric()
    })
  }
)

app.use(html()).get("/api/hi-cluster", async () => {
  const clusters = []
  for (const blog of blogs) {
    clusters.push(new Cluster(blog))
  }

  while (clusters.length > 1) {
    let clusterA: Cluster | undefined, clusterB: Cluster | undefined
    let closest = Infinity
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        const distance = pearson(clusters[i].blog.data, clusters[j].blog.data);
        if (distance < closest) {
          clusterA = clusters[i];
          clusterB = clusters[j];
          closest = distance;
        }
      }
    }
    if (!clusterA || !clusterB) {
      continue
    }
    const merged = clusterA.merge(blogWords, clusterB, closest);
    clusters.splice(clusters.indexOf(clusterA), 1);
    clusters.splice(clusters.indexOf(clusterB), 1);
    clusters.push(merged);
  }
  const [lastCluster] = clusters
  return <ClusterList cluster={lastCluster} indent={0} />
})

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

