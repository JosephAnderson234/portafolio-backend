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
	async addSkillsToProjectById(
		id_project: number,
		id_skills: number[]
	): Promise<void> {
		const project = await this.prisma.project.findUnique({
			where: { id: id_project }
		});
		if (!project) {
			throw new NotFoundException('Project not found');
		}
		const skills = await this.prisma.skill.findMany({
			where: { id: { in: id_skills } }
		});
		if (skills.length !== id_skills.length) {
			throw new NotFoundException('One or more skills not found');
		}
		const projectSkillsData = skills.map((skill) => ({
			name: project.name,
			projectId: id_project,
			skillId: skill.id
		}));
		await this.prisma.projectSkills.createMany({
			data: projectSkillsData,
			skipDuplicates: true
		});
	}
}
