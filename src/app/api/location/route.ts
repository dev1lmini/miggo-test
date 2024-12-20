export const dynamic = "force-static"
export const revalidate = 20

const DEFAULT_VELOCITY =  27597
const DEFAULT_PERIOD = 92.88

export async function GET() {
  const res = await fetch("http://api.open-notify.org/iss-now.json", {
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()

  const response = {
    ...data,
    position: {
      latitude: +data.iss_position.latitude,
      longitude: +data.iss_position.longitude,
      velocity: DEFAULT_VELOCITY,
      period: DEFAULT_PERIOD
    }
  }

  return Response.json(response)
}
