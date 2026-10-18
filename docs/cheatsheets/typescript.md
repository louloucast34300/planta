# TypeScript — Cheat Sheet

## Types de base

```ts
let name: string = 'Alice'
let age: number = 30
let active: boolean = true
let tags: string[] = ['a', 'b']
let pair: [string, number] = ['x', 1]   // tuple
let anything: unknown                   // préférer à `any` : oblige à vérifier le type
let nothing: null | undefined
```

## `type` vs `interface`

```ts
type User = { id: string; name: string; email?: string }   // `?` = optionnel
interface Post { id: string; title: string; authorId: string }

interface Admin extends User { role: 'admin' }   // héritage d'interface
type Admin2 = User & { role: 'admin' }           // intersection de types
```

Les deux se valent pour décrire un objet. `type` est nécessaire pour les unions et les types utilitaires.

## Unions & littéraux

```ts
type Status = 'draft' | 'published' | 'archived'
type Id = string | number

function show(id: Id) {
  if (typeof id === 'string') id.toUpperCase()   // narrowing : TS sait que c'est une string
}
```

## Types utilitaires

```ts
type User = { id: string; name: string; email: string; password: string }
```

| Utilitaire | Résultat | Quand l'utiliser |
|---|---|---|
| `Partial<User>` | tous les champs optionnels | données d'un update (PATCH) |
| `Required<User>` | tous les champs obligatoires | l'inverse de `Partial` |
| `Pick<User, 'id' \| 'name'>` | uniquement `id` et `name` | garder quelques champs |
| `Omit<User, 'password'>` | tout sauf `password` | retirer des champs (réponse API) |
| `Readonly<User>` | champs non modifiables | objets immuables |
| `Record<string, number>` | `{ [key: string]: number }` | dictionnaire / map |
| `ReturnType<typeof fn>` | type de retour de `fn` | réutiliser un type sans le redéclarer |
| `Awaited<Promise<User>>` | `User` | déballer une Promise |
| `NonNullable<string \| null>` | `string` | retirer `null` / `undefined` |

```ts
type CreateUser = Omit<User, 'id'>
type UpdateUser = Partial<Omit<User, 'id'>>   // on peut combiner les utilitaires
type PublicUser = Omit<User, 'password'>
```

## Génériques

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}
first<number>([1, 2])   // T = number (souvent déduit automatiquement)

type ApiResponse<T> = { data: T; error?: string }
const res: ApiResponse<User[]> = { data: [] }
```

## Fonctions & async

```ts
const add = (a: number, b: number): number => a + b

async function getUser(id: string): Promise<User> { /* ... */ }

function log(msg: string): void { console.log(msg) }
```

## Classes (très utilisées par Nest)

```ts
class UserService {
  constructor(private readonly repo: UserRepo) {}   // crée et assigne this.repo automatiquement

  private secret = 'x'      // accessible seulement dans la classe
  protected base = 'y'      // accessible dans la classe et ses sous-classes
  public name = 'z'         // public par défaut
}
```

## Opérateurs utiles

```ts
user?.email               // optional chaining : undefined si user est null/undefined
user.email ?? 'n/a'       // valeur par défaut si null/undefined (contrairement à ||, garde '' et 0)
user!.email               // "je garantis que ce n'est pas null" (à éviter)
value as User             // assertion de type (à éviter si possible)
```

## `typeof` / `keyof`

```ts
const config = { port: 3000, host: 'localhost' }
type Config = typeof config          // { port: number; host: string }
type ConfigKey = keyof Config        // 'port' | 'host'
```

## Notes perso

<!-- À compléter au fil du projet -->
