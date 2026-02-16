import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Project, Prisma } from '@prisma/client';
import { CreateProjectDto } from './dto/CreateProjectDto';
import { SkillService } from './skill.service';
import { ProjectSkillService } from './projectskill.service';
import { ProjectFrameworkService } from './projectframework.service';

@Injectable()
export class ProjectService {
	constructor(
		private prisma: PrismaService,
		private skill: SkillService,
		private projectSkill: ProjectSkillService,
		private projectFramework: ProjectFrameworkService
	) {}
	async project(
		projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput
	): Promise<Project | null> {
		return this.prisma.project.findUnique({
			where: projectWhereUniqueInput
		});
	}

	async projects(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.ProjectWhereUniqueInput;
		where?: Prisma.ProjectWhereInput;
		orderBy?: Prisma.ProjectOrderByWithRelationInput;
	}): Promise<Project[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.project.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy
		});
	}
	async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
		return this.prisma.project.create({
			data
		});
	}

	async createProjectMethod(data: CreateProjectDto): Promise<Project> {
		const { name, description, result, skill_id, framework_id } = data;
		const created = await this.createProject({ description, name, result });
		await this.projectSkill.addSkillToProjectById(created.id, skill_id);
		await this.projectFramework.addFrameworkToProjectById(
			created.id,
			framework_id
		);
		return created;
	}

	async updateProject(params: {
		where: Prisma.ProjectWhereUniqueInput;
		data: Prisma.ProjectUpdateInput;
	}): Promise<Project> {
		const { where, data } = params;
		return this.prisma.project.update({
			data,
			where
		});
	}

	async deleteProject(
		where: Prisma.ProjectWhereUniqueInput
	): Promise<Project> {
		return this.prisma.project.delete({
			where
		});
	}
}
