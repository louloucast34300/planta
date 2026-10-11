import { apiConnect } from "./heath.action"



export const HealthView = async () => {
    const plants: any = await apiConnect()
    console.log(plants)
    return (
        <div>
            {plants?.map((plant: any) => {
                return (
                    <div key={plant.id}>
                        {plant.name}
                    </div>
                )
            })}
        </div>
    )
}