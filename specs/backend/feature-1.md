# feature n°1

## Création d'une plante :


```typescript
+ = "libre d'ajout"
$$ = "controlé par data extérieure (ex: select)"
? = "facultatif"


type Plant : {
    id: string
    name: string; +
    species_id: string; $$
    dates: {
        purchase: date ?+
        first_potting: date ?+
        repotting: date ?+
        previous_repotting: date ?+
        last_watering: date ?+ 
        previous_watering: date ?+
    }
    images: {
        featured_image:string; ?+
        gallery: string[]; ?+
    }
}


type Species : {
    id: string
    name: string; +
    description: string; ?+
    maintenance: string; ?+
}

```