import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProjectFramework } from '@prisma/client';

@Injectable()
export class ProjectFrameworkService {
	constructor(private prisma: PrismaService) {}

	async addFrameworkToProjectById(
		id_project: number,
		id_framework: number
	): Promise<ProjectFramework> {
		const [project, framework] = await Promise.all([
			this.prisma.project.findUnique({ where: { id: id_project } }),
			this.prisma.framework.findUnique({ where: { id: id_framework } })
		]);
		if (!project || !framework) {
			throw new NotFoundException('Project or Framework not found');
		}
		return this.prisma.projectFramework.create({
			data: {
				projectId: id_project,
				frameworkId: id_framework
			}
		});
	}
}
