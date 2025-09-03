import { NextResponse } from "next/server";

export async function POST(req) {
  const { url } = await req.json();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": "facebook-video-download1.p.rapidapi.com"
    }
  };

  const apiUrl = `https://facebook-video-download1.p.rapidapi.com/getvideo?url=${encodeURIComponent(url)}`;

  const response = await fetch(apiUrl, options);
  const data = await response.json();

  return NextResponse.json({
    title: data.title,
    thumbnail: data.thumbnail,
    downloadUrl: data.sd || data.hd,
  });
}
