/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Project, Prisma } from './generated/prisma/client';

@Injectable()
export class ProjectService {
	constructor(private prisma: PrismaService) {}
	async project(
		projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
	): Promise<Project | null> {
		return this.prisma.project.findUnique({
			where: projectWhereUniqueInput,
		});
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async projects(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.ProjectWhereUniqueInput;
		where?: Prisma.ProjectWhereInput;
		orderBy?: Prisma.ProjectOrderByWithRelationInput;
	}): Promise<Project[]> {
		const { skip, take, cursor, where, orderBy } = params;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.prisma.project.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}
	async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
		return this.prisma.project.create({
			data,
		});
	}

	async updateProject(params: {
		where: Prisma.ProjectWhereUniqueInput;
		data: Prisma.ProjectUpdateInput;
	}): Promise<Project> {
		const { where, data } = params;
		return this.prisma.project.update({
			data,
			where,
		});
	}

	async deleteProject(
		where: Prisma.ProjectWhereUniqueInput,
	): Promise<Project> {
		return this.prisma.project.delete({
			where,
		});
	}
}
