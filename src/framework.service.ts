import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Framework, Prisma } from '@prisma/client';

@Injectable()
export class FrameworkService {
	constructor(private prisma: PrismaService) {}
	async framework(
		frameworkWhereUniqueInput: Prisma.FrameworkWhereUniqueInput
	): Promise<Framework | null> {
		return this.prisma.framework.findUnique({
			where: frameworkWhereUniqueInput
		});
	}

	async frameworks(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.FrameworkWhereUniqueInput;
		where?: Prisma.FrameworkWhereInput;
		orderBy?: Prisma.FrameworkOrderByWithRelationInput;
	}): Promise<Framework[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.framework.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy
		});
	}
	async createFramework(
		data: Prisma.FrameworkCreateInput
	): Promise<Framework> {
		return this.prisma.framework.create({
			data
		});
	}

	async createFrameworkWithName(name: string): Promise<Framework> {
		return this.prisma.framework.create({
			data: { name }
		});
	}

	async updateFramework(params: {
		where: Prisma.FrameworkWhereUniqueInput;
		data: Prisma.FrameworkUpdateInput;
	}): Promise<Framework> {
		const { where, data } = params;
		return this.prisma.framework.update({
			data,
			where
		});
	}

	async deleteFramework(
		where: Prisma.FrameworkWhereUniqueInput
	): Promise<Framework> {
		return this.prisma.framework.delete({
			where
		});
	}
}
