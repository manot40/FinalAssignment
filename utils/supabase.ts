import { createClient } from "@supabase/supabase-js";

const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const sbToken = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (
  typeof sbUrl === "undefined" ||
  typeof sbToken === "undefined" ||
  sbUrl === "" ||
  sbToken === ""
)
  throw new Error("Supabase URL and Token is not provided in environment vars");

const supabase = createClient(sbUrl, sbToken);

export default supabase;
