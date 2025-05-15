export async function GET() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "An error occurred" }, { status: 500 });
  }
}
