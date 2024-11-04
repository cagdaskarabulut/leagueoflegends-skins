import { sql } from "@vercel/postgres";

export default async function handler(request, response) {
  try {
    const script = `update public.commercial set click_count=click_count+1 where project='leagueoflegends-skins';`;

    let data = await sql.query(script);
    return response.status(200).json("successfully saved");
  } catch (error) {
    return response.status(500).json({ error });
  }
}
