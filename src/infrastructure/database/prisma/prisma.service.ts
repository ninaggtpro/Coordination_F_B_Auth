import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Service Prisma pour la gestion de la connexion à la base de données
 * 
 * Note: @prisma/adapter-pg est nécessaire uniquement pour :
 * - PostgreSQL en environnement serverless/edge
 * - Connexions via des pools spécifiques
 * 
 * Pour PostgreSQL standard (Docker), l'adapter n'est pas requis.
 * Prisma se connecte directement via DATABASE_URL.
 * 
 * La doc NestJS recommande ConfigModule au lieu de 'dotenv/config' direct.
 * @see https://docs.nestjs.com/recipes/prisma
 * @see https://docs.nestjs.com/techniques/configuration
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Version avec adapter (pour serverless/edge)
  // constructor() {
  //   const adapter = new PrismaPg({
  //     connectionString: process.env.DATABASE_URL!,
  //   });
  //   super({ adapter });
  // }

  /**
   * Initialisation du module NestJS
   * Établit la connexion à la base de données au démarrage de l'application
   */
  async onModuleInit() {
    await this.$connect();
  }
}

