export const dynamic = "force-static"
export const revalidate = 20

export async function GET() {
  const res = await fetch("http://api.open-notify.org/iss-now.json", {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()

  return Response.json(data)
}
