import Cluster from "../models/Cluster";

export default function ClusterList({ cluster, indent }: { cluster: Cluster, indent: number }) {
  const hasChildren = cluster.left && cluster.right
  if (!hasChildren) {
    return (
      <p class={`font-semibold bg-blue-200 px-4 py-2  text-lg cursor-pointer ml-[${indent}px]`}>{cluster.blog.name}</p>
    )
  }
  return (
    <div>
      <details class="rounded-lg">
        <summary class={`font-semibold bg-blue-200 px-4 py-2  text-lg cursor-pointer ml-[${indent}px]`}>{cluster.blog.name}</summary>
        <div class=" bg-blue-100">
          {<ClusterList cluster={cluster.left!} indent={indent + 10} />}
          {<ClusterList cluster={cluster.right!} indent={indent + 10} />}
        </div>
      </details>
    </div>
  )
}