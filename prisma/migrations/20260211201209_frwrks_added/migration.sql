-- CreateTable
CREATE TABLE "ProjectFramework" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "frameworkId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectFramework_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Framework" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Framework_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Framework_name_key" ON "Framework"("name");

-- AddForeignKey
ALTER TABLE "ProjectFramework" ADD CONSTRAINT "ProjectFramework_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectFramework" ADD CONSTRAINT "ProjectFramework_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "Framework"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
