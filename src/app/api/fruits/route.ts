import { NextRequest, NextResponse } from "next/server";
/**
 * {
 *   "apple": 10,
 *   "banana": 20,
 *   "cherry": 30,
 * }
 */
const fruitStore = new Map<string, number>();

export async function GET() {
  return new NextResponse(JSON.stringify(Object.fromEntries(fruitStore)), {
    status: 200,
  });
}

export interface PostFruitPayload {
  fruit: string;
  quantity: number;
}

/**
 * envoi un payload avec un furit et une quantité
 * et ajoute le fruit et la quantité au fruitStore
 * et retourne le fruitStore
 */
export async function POST(req: NextRequest) {
  const data: PostFruitPayload = await req.json();
  // normalment on devrait valider que la donnée est valide et donc de type PostFruitPayload
  // sinon on retourne une erreur
  const { fruit, quantity } = data;
  fruitStore.set(fruit, (fruitStore.get(fruit) ?? 0) + quantity);
  return new NextResponse(JSON.stringify(Object.fromEntries(fruitStore)), {
    status: 200,
  });
}

// export async function DELETE(req: NextRequest) {
//   const { fruit } = await req.json();
//   fruitStore.delete(fruit);
//   return new NextResponse(JSON.stringify(fruitStore), { status: 200 });
// }
