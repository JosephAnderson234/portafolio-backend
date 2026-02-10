import { Injectable } from '@nestjs/common';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
@Injectable()
export class PrismaService extends PrismaClient {
	constructor() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		const pool = new pg.Pool({
			connectionString: process.env.DATABASE_URL,
		});
		const adapter = new PrismaPg(pool);
		super({ adapter });
	}
}
