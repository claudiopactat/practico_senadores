let estadisticas={
    republicanos:[],
    totalRepublicanos: 0,
    democratas:[],
    totalDemocratas: 0,
    independientes:[],
    totalIndependientes: 0
}

function guardarPartidos(){
    
    // Todos los republicanos:
    members.forEach(member=>{
        if(member.party=='R'){
            estadisticas.republicanos.push(member)
            estadisticas.totalRepublicanos = estadisticas.republicanos.length
        }
        
    })

    // Todos los democratas:
    members.forEach(member=>{
        if(member.party=='D'){
            estadisticas.democratas.push(member)
            estadisticas.totalDemocratas = estadisticas.democratas.length
        }
        
    })

    // Todos los independientes:
    members.forEach(member=>{
        if(member.party=='ID'){
            estadisticas.independientes.push(member)
            estadisticas.totalIndependientes = estadisticas.independientes.length
        }
    })
}

guardarPartidos()