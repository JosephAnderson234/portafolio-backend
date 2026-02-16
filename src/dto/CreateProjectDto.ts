export interface CreateProjectDto {
	name: string;
	description: string;
	result?: string;
	skill_id: number;
	framework_id: number;
}
