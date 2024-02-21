export type optionsType = {
    name : string,
    lat : number,
    lon : number
}
export type forecastType = {
    city :{
        name:string
        country: string
        sunrise: string
        sunset: string
    }
    list : [
        {
            dt: number
            main: {
                temp: number
                temp_max: number
                temp_min : number
                flees_like: number
                humidity: number
                pressure : number
            }
            weather:[
                {
                    main: string
                    icon: string
                    description: string
                }
            ]
            wind : {
                speed : number
                gust: number
                deg: number
            }
            clouds: {
                all: number
            }
            pop : number
            visibility: number
        }
    ]
}