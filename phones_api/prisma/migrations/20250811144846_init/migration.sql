-- CreateTable
CREATE TABLE "public"."Phone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "battery" DECIMAL(65,30) NOT NULL,
    "brand" JSONB,
    "ram" INTEGER NOT NULL,
    "storgae" INTEGER NOT NULL,
    "process" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bodySize" DECIMAL(65,30) NOT NULL,
    "camera" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" DECIMAL(65,30),
    "display" TEXT NOT NULL,
    "avaliableColors" TEXT[],

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);
