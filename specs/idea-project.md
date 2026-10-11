# Organisation des plantes de la maison

L'objectif est de créer des fiches produits avec différentes informations : 

- Les informations de la plante (nom, espèces, date d'achat / création etc..)


## ( Arrosage + engrais)
- Création d'un programme d'arrosage pour une plante, suggestion IA pour savoir comment on l'arrose 

- Création d'un système de planning pour savoir quand arroser les plantes. on regroupe à la journée les mêmes plantes ensemble. 


## ( Système de prise de notes )
- Possibilité d'ajouter des notes chronologiques sur la plante, comme des posts (images + texte)


usage solo, web app sur ordinateur, une fiche par plante physique, vue du jour, tâches d'entretien génériques, priorité à l'utile, et Nest + Next + Postgres. Voici le tour suivant.




# Spéc plantes
### Arrosage adaptatif : 
Pas un rappel fixe « tous les 7 jours », mais un rythme qui tient compte de la saison, de la taille du pot et de l'exposition. Un bouton « j'ai vérifié, la terre est encore humide » décale le rappel au lieu de forcer un arrosage.

### Identification par photo :
On prend la plante en photo et l'app pré-remplit la fiche (nom, besoins en lumière, toxicité pour les chats).

### Journal visuel :
Une photo par mois pour voir la plante évoluer et repér, un stepper pour prise photo de la plante sous plusieurs angles 

### Diagnostic : 
Photo d'une feuille abîmée, et l'app suggère des causes probables (trop d'eau, cochenilles, coup de soleil).

### Pièces et lumière :
On décrit chaque pièce (orientation, luminosité) et l'app dit si la plante y est bien placée.

### Mode vacances : 
On indique ses dates et l'app génère une liste simple pour la personne qui arrose, ou un lien à partager.

### Rappels secondaires :
Rempotage, engrais au printemps, rotation du pot. Ce sont des tâches peu fréquentes qu'on oublie toujours.

### Les boutures :
Une plante « enfant » liée à sa plante mère. « Bouture » = un attribut de la plante. Un champ stade (bouture, jeune, adulte) affiché comme un badge sur la vignette. Ça colle aussi à l'idée de lien avec la plante mère : quand la bouture grandit, tu changes son stade, pas son étagère.



# Réflexion technique 

Sépare bien Espèce (la référence : description, besoins, toxicité) et Plante (ton monstera à toi : surnom, photo, pièce, taille du pot, date d'acquisition). La plante hérite des valeurs de l'espèce et peut en surcharger certaines.

Pour démarrer, un lexique d'une cinquantaine d'espèces d'intérieur courantes, rédigé à la main et bien structuré, vaut mieux qu'une API externe incomplète. Tu maîtrises le contenu et le format.

Prévois une espèce « Inconnue » avec des valeurs par défaut. Sinon, l'utilisateur qui ne sait pas ce qu'il a reste bloqué.

## Gestion de l’eau 

Je modéliserais un intervalle de base par espèce et par période (croissance ou repos suffit au début, plutôt que 4 saisons), multiplié par des facteurs propres à la plante : taille du pot, lumière de la pièce.

Si l'utilisateur est en retard, la prochaine échéance se calcule à partir de la date réelle d'arrosage, jamais en rattrapant le retard. Surtout, l'app ne doit pas suggérer d'arroser deux fois.

'adaptation à l'utilisateur passe par un bouton « terre encore humide » : il repousse l'échéance de quelques jours et ajuste un petit coefficient personnel de la plante. Après quelques cycles, l'intervalle colle à son appartement.

Pense à l'hémisphère, ou base-toi sur les mois, si tu vises un jour l'international

## Étagère 
Ajoute une étagère par défaut « Non rangées » pour qu'aucune plante ne disparaisse.

Une pastille d'état sur chaque plante (ok, bientôt, à arroser).

Glisser une plante d'une étagère à l'autre pour la ranger, ce serait très satisfaisant à coder.

ajoute des étagères virtuelles : des vues filtrées générées automatiquement (« Boutures », « À arroser aujourd'hui », « Toxiques pour le chat »). Pour garder la lisibilité, donne-leur un style visuellement différent (par exemple en pointillés, ou rangées dans une section à part en haut). On comprend tout de suite que ce sont des raccourcis, pas des emplacements, et la collection reste propre.

Le vrai secret : les photos détouréesUne photo carrée avec son fond de cuisine casse tout l'effet. Une plante détourée (PNG transparent) posée sur la planche, en revanche, rend tout de suite « vraie étagère ». Tu peux détourer automatiquement à l'upload, par exemple avec une lib qui tourne dans le navigateur comme @imgly/background-removal.

Une alternative si tu préfères un style plus graphique : des illustrations de plantes par espèce (issues du lexique) au lieu des photos. C'est plus homogène visuellement, et la photo réelle reste sur la fiche.
Tu veux que je te montre une maquette rapide d'une étagère en CSS pour voir le rendu ?

Peut être illustration graphique sur les étagères et détourage sur la fiche de la photo pour un effet plus immersif ! 




## Authentification
Oui, exactement. C'est le même mécanisme HTTP Basic Auth que le .htpasswd d'Apache. Avec Nginx, c'est d'ailleurs littéralement un fichier .htpasswd (auth_basic + auth_basic_user_file). Caddy, lui, stocke simplement le hash du mot de passe directement dans sa config au lieu d'un fichier séparé.
