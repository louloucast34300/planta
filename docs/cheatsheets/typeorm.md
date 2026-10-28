# TypeORM — Cheat Sheet

## Entité

```ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()                                   // table "user"
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'varchar', unique: true })
  email: string

  @Column({ type: 'varchar', nullable: true })   // nullable → type TS `| null`
  bio: string | null

  @Column({ type: 'boolean', default: true })
  active: boolean

  @CreateDateColumn()  createdAt: Date      // rempli automatiquement à l'insert
  @UpdateDateColumn()  updatedAt: Date      // mis à jour automatiquement à chaque save
}
```

## Injecter le repository (dans Nest)

```ts
// user.module.ts
imports: [TypeOrmModule.forFeature([User])]

// user.service.ts
constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
```

## Lire

| Méthode | Retour | Quand l'utiliser |
|---|---|---|
| `find(options?)` | `User[]` | liste avec filtres, tri, pagination |
| `findBy({ active: true })` | `User[]` | liste avec un simple filtre `where` |
| `findOne(options)` | `User \| null` | un seul résultat, avec options (relations, select…) |
| `findOneBy({ id })` | `User \| null` | un seul résultat avec un simple `where` |
| `findOneByOrFail({ id })` | `User` | lance une erreur si rien n'est trouvé |
| `count({ where })` / `exists({ where })` | `number` / `boolean` | compter / vérifier |

```ts
await repo.find({
  where: { active: true },                 // AND
  // where: [{ name: 'A' }, { name: 'B' }] // tableau = OR
  order: { createdAt: 'DESC' },
  select: { id: true, name: true },
  skip: 0, take: 20,                       // pagination
})
```

### Opérateurs de `where`

```ts
import { Like, ILike, In, Not, IsNull, MoreThan, LessThan, Between } from 'typeorm'

where: { name: ILike('%ali%') }           // ILIKE (insensible à la casse, Postgres)
where: { id: In(['1', '2']) }
where: { bio: IsNull() }
where: { bio: Not(IsNull()) }
where: { createdAt: MoreThan(new Date('2025-01-01')) }
```

## Créer

```ts
const user = repo.create({ name: 'Alice', email: 'a@x.io' })   // construit l'objet, pas de requête SQL
await repo.save(user)                                          // INSERT, renvoie l'entité complète (id, dates…)
```

## Mettre à jour

```ts
// 1. preload + save (recommandé pour un PATCH)
const user = await repo.preload({ id, ...dto })   // charge l'entité depuis la base et fusionne dto ; null si l'id n'existe pas
if (!user) throw new NotFoundException()
await repo.save(user)                             // UPDATE, renvoie l'entité à jour

// 2. Rapide, sans charger l'entité (renvoie UpdateResult, pas l'entité)
await repo.update({ id }, { name: 'Bob' })
```

`save()` déclenche les hooks et `@UpdateDateColumn`. `update()` exécute une requête SQL directe.

## Supprimer

```ts
await repo.remove(user)        // à partir d'une entité chargée
await repo.delete({ id })      // directement par critère (DeleteResult)
```

## `save` vs `insert` / `update` / `delete`

| | `save` / `remove` | `insert` / `update` / `delete` |
|---|---|---|
| Charge / vérifie l'entité | oui | non |
| Renvoie | l'entité | un `*Result` brut |
| Hooks, cascades | oui | non |
| Performance | moins rapide | plus rapide |

## Relations

### `@ManyToOne` / `@OneToMany` (plusieurs posts → un user)

```ts
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm'
import { User } from '../users/user.entity.js'

@Entity()
export class Post {
  // côté "many" : c'est lui qui porte la clé étrangère en base
  @ManyToOne(() => User, (user) => user.posts, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })     // nom de la colonne FK ; référence par défaut la clé primaire de User
  user: User | null

  @Column({ type: 'uuid', nullable: true })   // même colonne exposée : lire/écrire l'id sans charger User
  userId: string | null
}

@Entity()
export class User {
  @OneToMany(() => Post, (post) => post.user)  // optionnel, aucune colonne en base
  posts: Post[]
}
```

- La cible de la FK vient de `() => User` : TypeORM pointe sur sa `@PrimaryColumn`/`@PrimaryGeneratedColumn`.
- Pour viser une autre colonne : `@JoinColumn({ name: 'userEmail', referencedColumnName: 'email' })`.
- `@JoinColumn` est optionnel sur `@ManyToOne` (nom auto `userId`), mais il le rend explicite.
- `@Column` + `@JoinColumn` avec le même `name` = une seule colonne en base, deux façons d'y accéder.

### `onDelete` (quand la ligne référencée est supprimée)

| Valeur | Effet sur les posts quand le user est supprimé |
|---|---|
| `'RESTRICT'` / `'NO ACTION'` (défaut) | suppression refusée tant qu'il reste des posts |
| `'CASCADE'` | les posts sont supprimés aussi |
| `'SET NULL'` | `userId` passe à `null` (colonne `nullable` obligatoire) |

### Charger une relation

```ts
await repo.find({ relations: { user: true } })            // jointure, post.user rempli
await repo.findOne({ where: { id }, relations: { user: true } })
await repo.save(repo.create({ title, userId }))           // écrire via l'id seul
```

Sans `relations`, `post.user` vaut `undefined` (mais `post.userId` est toujours là).

## Notes perso

<!-- QueryBuilder, transactions, migrations… à ajouter au fil du projet -->
