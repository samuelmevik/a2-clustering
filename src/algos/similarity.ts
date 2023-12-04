export function pearson(a: number[], b: number[]) {
  let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0

  for (let i = 0; i < a.length; i++) {
    sum1 += a[i]
    sum2 += b[i]
    sum1Sq += Math.pow(a[i], 2)
    sum2Sq += Math.pow(b[i], 2)
    pSum += a[i] * b[i]
  }

  const num = pSum - (sum1 * sum2 / a.length)
  const den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / a.length) * (sum2Sq - Math.pow(sum2, 2) / a.length))

  if (den === 0) {
    return 0
  }

  return 1 - num / den
}