export default function processInclusions(inclusions){
  return inclusions.split(',')
    .map((inclusion) => inclusion.trim())
    .filter((inclusion) => inclusion.length > 0)
}