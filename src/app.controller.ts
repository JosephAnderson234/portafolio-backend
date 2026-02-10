import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
	Project as ProjectModel,
	Skill as SkillModel,
} from './generated/prisma/client';
import { ProjectService } from './project.service';
import { SkillService } from './skill.service';
@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly projectService: ProjectService,
		private readonly skillService: SkillService,
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('projects/:id')
	async getProjectById(@Param('id') id: string): Promise<ProjectModel> {
		return this.projectService.project({ id: Number(id) });
	}

	@Get('projects')
	async getProjects(): Promise<ProjectModel[]> {
		return this.projectService.projects({});
	}

	@Post('skills')
	async createSkill(
		@Body() skillData: { name: string },
	): Promise<SkillModel> {
		const { name } = skillData;
		return this.skillService.createSkillWithName(name);
	}
}
