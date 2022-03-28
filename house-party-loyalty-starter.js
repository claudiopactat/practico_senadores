
var app = new Vue({
    el: '#app',
    data: {
        // obtenemos los datos
        //members: data.results[0].members,
        members: [],

        // miembros de los partidos (tabla 1)
        totalRepublicanos: 0,
        totalDemocratas: 0,
        totalIndependientes: 0,
        total: 0,
        
        // porcentaje de votos (tabla 1)
        votosRep: 0,
        votosDem: 0,
        votosInd: 0,
        votosTotal: 0,

        // miembros least loyal (tabla 2)
        cantLoyal: 0,
        miembrosLeastLoyal: [],

        // miembros most loyal (tabla 3)
        miembrosMostLoyal: [],
    },

    methods: {

        // Primera tabla:
        cantidadPorPartido(){
            // Todos los republicanos:
            this.members.filter(member=>{
                if(member.party=='R'){
                    this.totalRepublicanos +=  1
                }
            })
            // Todos los democratas:
            this.members.filter(member=>{
                if(member.party=='D'){
                    this.totalDemocratas +=  1
                }
            })
            // Todos los independientes:
            this.members.filter(member=>{
                if(member.party=='ID'){
                    this.totalIndependientes +=  1
                }
            })
            // Total de miembros
            this.members.forEach(member => {
                this.total += 1
            });
        },

        votosPorPartido(){
            // Calculo de votos del partido republicano
            this.members.forEach(elemento=> {
                if(elemento.party == 'R'){
                    this.votosRep += elemento.votes_with_party_pct
                }
            })

            this.votosRep = this.votosRep / ((this.members.filter(elemento => elemento.party == 'R')).length)
            
            // Calculo de votos del partido democrata
            this.members.forEach(elemento=> {
                if(elemento.party == 'D'){
                    this.votosDem += elemento.votes_with_party_pct
                }
            })

            this.votosDem = this.votosDem / ((this.members.filter(elemento => elemento.party == 'D')).length)
            
            // Calculo de votos del partido independiente
            this.members.forEach(elemento=> {
                if(elemento.party == 'ID'){
                    this.votosInd += elemento.votes_with_party_pct
                }
            })
            
            if(this.votosInd == 0){
                this.votosInd = 0
            }else{
                this.votosInd = this.votosInd / (this.members.filter(elemento => elemento.party == 'ID').length)
            }
            
            // Total de votos, promedio
            if(this.votosInd == 0){
                this.votosTotal = ((this.votosRep + this.votosDem + this.votosInd) / 3)
            }else{
                this.votosTotal = ((this.votosRep + this.votosDem) / 3)
            }
            
            // Pasamos todo a porcentaje
            this.votosRep = this.votosRep.toFixed(2) + ' %'
            this.votosDem = this.votosDem.toFixed(2) + ' %'
            this.votosInd = this.votosInd.toFixed(2) + ' %'
            this.votosTotal = this.votosTotal.toFixed(2) + ' %'
        },

        leastLoyal(){
            this.cantLoyal = Math.floor((this.totalRepublicanos + this.totalDemocratas + this.totalIndependientes) * 0.10)
            
            this.members.forEach(member => {
                this.miembrosLeastLoyal.push(member)    
            })
            

            this.miembrosLeastLoyal.sort((a, b)=> {
                if(b.votes_with_party_pct < a.votes_with_party_pct){
                    return -1
                }
                
            })
        },

        mostLoyal(){
            
            this.members.forEach(member => {
                this.miembrosMostLoyal.push(member)    
            })


            this.miembrosMostLoyal.sort((a, b)=> {
                if(a.votes_with_party_pct < b.votes_with_party_pct){
                    return -1
                }
                
            })

            

            console.log(this.miembrosMostEngaged)

            console.log(this.members)

        },

        filterLeastLoyal(){
            let aux = []
            
            for (let index = 0; index < this.cantLoyal; index++) {
                aux.push(this.miembrosLeastLoyal[index])
            }

            this.miembrosLeastLoyal = aux
        },

        filterMostLoyal(){
            let aux = []

            for (let index = 0; index < this.cantLoyal; index++) {
                aux.push(this.miembrosMostLoyal[index])
            }

            this.miembrosMostLoyal = aux
        },

    },

    computed: {
        filterStates(){
            return this.members.filter(member =>{
                //(checkeds.includes(this.party)) || 
                if(member.state == this.select || this.select == "all")
                return member.state
            })
        },
    },

    created(){
        let endpoint = `https://api.propublica.org/congress/v1/113/house/members.json`
        var misCabeceras = new Headers({"X-API-Key":"C0oposE3pso6DD7nMfzfpQ8veydVg9MqFx70rY9R"});
        var miInit = { headers: misCabeceras };

        console.log('Inicio del programa');

        fetch(endpoint, miInit)

        .then(function(response) {
            return response.json();
        })

        .then(function(myJson) {
            app.members = myJson.results[0].members

            app.cantidadPorPartido()
            app.votosPorPartido()
            app.leastLoyal()
            app.mostLoyal()

            app.filterLeastLoyal()
            app.filterMostLoyal()
        });

        console.log('Fin del programa');
    }
})


fetch