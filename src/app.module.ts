import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ProjectService } from './project.service';
import { PrismaService } from './prisma.service';
import { SkillService } from './skill.service';
import { ProjectSkillService } from './projectskill.service';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [AppController],
	providers: [
		AppService,
		ProjectService,
		SkillService,
		PrismaService,
		ProjectSkillService
	]
})
export class AppModule {}
