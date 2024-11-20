import { drizzle } from "drizzle-orm/d1";
import * as v from "valibot";
import { visitsTable } from "./db/schema";

const Body = v.object({
	url: v.pipe(v.string(), v.url()),
	// 結局公開するので意味ないが、間違って送信するのを防ぐ意味もあり一応。
	key: v.string(),
});

const resForHuman = `
<center>
	<p>
		Hello from Cloudflare Worker!
	</p>
	<p>
		please refer to README at 
		<a href="https://github.com/ut-code/festival-visitor-tracker-worker">
			GitHub
		</a>
		for how to use.
	</p>
</center>`;

const bareapp = {
	async fetch(req: Request, env: Env, _ctx: unknown): Promise<Response> {
		if (req.method !== "POST") {
			const res = new Response(resForHuman);
			res.headers.append("Content-Type", "text/html");
			return res;
		}
		const body = v.parse(Body, await req.json());
		if (
			body.key !==
			"2e0c7cad39e09314a46f217c6107f96e08bd13984cd4ae4c29d96f5db440dba8"
		)
			return new Response("key validation failed");
		const db = drizzle(env.DB);
		await db.insert(visitsTable).values({
			url: body.url,
			at: new Date(),
		});
		return new Response("ok");
	},
};

export default bareapp;
