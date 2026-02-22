export interface CreateProjectDto {
	name: string;
	description: string;
	result?: string;
	skills_id: number[];
	frameworks_id: number[];
}
