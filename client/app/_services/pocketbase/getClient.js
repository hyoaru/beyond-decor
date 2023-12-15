import Pocketbase from "pocketbase"

const pocketbase = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
export default function getClient() { return pocketbase }