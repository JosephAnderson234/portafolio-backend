import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
	Project as ProjectModel,
	ProjectSkills,
	Skill as SkillModel,
	Framework as FrameworkModel
} from '@prisma/client';
import { ProjectService } from './project.service';
import { SkillService } from './skill.service';
import { FrameworkService } from './framework.service';
import { type CreateProjectDto } from './dto/CreateProjectDto';
@Controller()
export class AppController {
	constructor(
		private readonly appService: AppService,
		private readonly projectService: ProjectService,
		private readonly skillService: SkillService,
		private readonly frameworkService: FrameworkService
	) {}

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('projects/:id')
	async getProjectById(
		@Param('id') id: string
	): Promise<ProjectModel | null> {
		return this.projectService.project({ id: Number(id) });
	}

	@Get('projects')
	async getProjects(): Promise<ProjectModel[]> {
		return this.projectService.projects({});
	}
	@Post('projects')
	async createProject(
		@Body() projectData: CreateProjectDto
	): Promise<ProjectSkills> {
		return await this.projectService.createProjectMethod(projectData);
	}

	@Post('skills')
	async createSkill(
		@Body() skillData: { name: string }
	): Promise<SkillModel> {
		const { name } = skillData;
		return this.skillService.createSkillWithName(name);
	}

	@Post('frameworks')
	async createFramework(
		@Body() frameworkData: { name: string }
	): Promise<FrameworkModel> {
		const { name } = frameworkData;
		return this.frameworkService.createFrameworkWithName(name);
	}
}
