import { NextRequest, NextResponse } from "next/server";

/**
 * Ça va ressembler à ça :
 * {
 *   bananes: 4,
 *   fraises: 2,
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
 * On va envoyer un payload avec un fruit et une quantité,
 * que l'on va ajouter au `fruitStore`.
 */
export async function POST(req: NextRequest) {
	const data: PostFruitPayload = await req.json();
	// En vrai, on valide que la donnée est bien de type `PostFruitPayload`.
	// Sinon, on retourne une bonne erreur.
	const { fruit, quantity } = data;
	fruitStore.set(fruit, (fruitStore.get(fruit) ?? 0) + quantity);
	console.log(JSON.stringify(Object.fromEntries(fruitStore)));
	return new NextResponse(JSON.stringify(Object.fromEntries(fruitStore)), {
		status: 200,
	});
}
