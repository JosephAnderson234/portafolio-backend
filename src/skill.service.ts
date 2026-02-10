/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Skill, Prisma } from './generated/prisma/client';

@Injectable()
export class SkillService {
	constructor(private prisma: PrismaService) {}
	async skill(
		skillWhereUniqueInput: Prisma.SkillWhereUniqueInput,
	): Promise<Skill | null> {
		return this.prisma.skill.findUnique({
			where: skillWhereUniqueInput,
		});
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async skills(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.SkillWhereUniqueInput;
		where?: Prisma.SkillWhereInput;
		orderBy?: Prisma.SkillOrderByWithRelationInput;
	}): Promise<Skill[]> {
		const { skip, take, cursor, where, orderBy } = params;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.prisma.skill.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}
	async createSkill(data: Prisma.SkillCreateInput): Promise<Skill> {
		return this.prisma.skill.create({
			data,
		});
	}

	async createSkillWithName(name: string): Promise<Skill> {
		return this.prisma.skill.create({
			data: { name },
		});
	}

	async updateSkill(params: {
		where: Prisma.SkillWhereUniqueInput;
		data: Prisma.SkillUpdateInput;
	}): Promise<Skill> {
		const { where, data } = params;
		return this.prisma.skill.update({
			data,
			where,
		});
	}

	async deleteSkill(where: Prisma.SkillWhereUniqueInput): Promise<Skill> {
		return this.prisma.skill.delete({
			where,
		});
	}
}
