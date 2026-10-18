---
name: cheatsheets
description: Enrichit les cheat sheets de docs/cheatsheets/ (TypeScript, TypeORM, NestJS…). À utiliser quand une notion technique absente des cheat sheets apparaît dans la conversation, ou quand l'utilisateur demande d'ajouter une notion à ses cheat sheets.
---

# Cheat sheets

L'utilisateur apprend NestJS, TypeORM et TypeScript. Il construit au fil du projet ses aide-mémoire dans `docs/cheatsheets/` (un fichier par techno : `typescript.md`, `typeorm.md`, `nestjs.md`…).

## 1. Repérer une notion nouvelle

Une **notion** est un concept réutilisable d'une techno du projet : une méthode (`findAndCount`), un décorateur (`@UseGuards`), un type utilitaire (`Extract`), un pattern (transaction, relation `ManyToOne`). Ce n'est pas un détail propre au code de Planta.

Elle est **nouvelle** quand un `grep` dans `docs/cheatsheets/` ne trouve pas d'entrée qui la couvre.

## 2. Proposer, sans interrompre

Termine d'abord la tâche en cours. À la fin de ta réponse, propose l'ajout en une seule ligne et regroupe toutes les notions nouvelles :

> 📒 Nouvelles notions : `findAndCount` (TypeORM), `@UseGuards` (NestJS). Je les ajoute à tes cheat sheets ?

Si l'utilisateur refuse une notion, ne la propose plus dans cette conversation.

## 3. Ajouter (après accord)

- Place la notion dans la section existante qui lui correspond, ou crée une section `##` avant `## Notes perso`.
- Pour une techno sans fichier (Zod, Docker…), crée `docs/cheatsheets/<techno>.md` en reprenant la structure des autres fichiers.
- Format : un snippet court et une ligne qui dit quand l'utiliser, ou une ligne de tableau si la section en contient déjà un.
- Utilise des exemples génériques (`User`, `Post`), jamais le domaine Planta.
- Suis les conventions du backend : DTO Zod avec `@Body({ schema })`, imports ESM en `.js`.
- Rédige en français.

C'est terminé quand chaque notion acceptée a une entrée dans le bon fichier, sans recopier une entrée existante.
