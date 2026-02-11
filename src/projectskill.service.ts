import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProjectSkills } from '@prisma/client';

@Injectable()
export class ProjectSkillService {
	constructor(private prisma: PrismaService) {}
	async addSkillToProjectById(
		id_project: number,
		id_skill: number
	): Promise<ProjectSkills> {
		const [project, skill] = await Promise.all([
			this.prisma.project.findUnique({ where: { id: id_project } }),
			this.prisma.skill.findUnique({ where: { id: id_skill } })
		]);

		if (!project) {
			throw new NotFoundException('Project not found');
		}
		if (!skill) {
			throw new NotFoundException('Skill not found');
		}

		return this.prisma.projectSkills.create({
			data: {
				name: project.name,
				projectId: id_project,
				skillId: id_skill
			}
		});
	}
}
