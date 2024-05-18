
export async function GET(
  request: Request,
  { params } : { params: { name: string } }
) {
  const { name } = params;
  return new Response(`Hello, ${name}!`);
  
}