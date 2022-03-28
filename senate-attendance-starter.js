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

        // miembros least engaged (tabla 2)
        cantLeast: 0,
        miembrosLeastEngaged: [],

        // miembros most engaged (tabla 3)
        cantMost: 0,
        miembrosMostEngaged: [],
    },

    mounted() {
        
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

        leastEngaged(){
            this.cantEngaged = Math.floor((this.totalRepublicanos + this.totalDemocratas + this.totalIndependientes) * 0.10)
            
            this.members.forEach(member => {
                this.miembrosLeastEngaged.push(member)    
            })
            

            this.miembrosLeastEngaged.sort((a, b)=> {
                if(b.missed_votes_pct < a.missed_votes_pct){
                    return -1
                }
                
            })

            

            console.log(this.miembrosLeastEngaged)

        },

        mostEngaged(){
            
            this.members.forEach(member => {
                this.miembrosMostEngaged.push(member)    
            })


            this.miembrosMostEngaged.sort((a, b)=> {
                if(a.missed_votes_pct < b.missed_votes_pct){
                    return -1
                }
                
            })

            

            console.log(this.miembrosMostEngaged)

            console.log(this.members)

        },

        filterLeastEngaged(){
            let aux = []
            
            for (let index = 0; index < this.cantEngaged; index++) {
                aux.push(this.miembrosLeastEngaged[index])
            }

            this.miembrosLeastEngaged = aux
        },

        filterMostEngaged(){
            let aux = []

            for (let index = 0; index < this.cantEngaged; index++) {
                aux.push(this.miembrosMostEngaged[index])
            }

            this.miembrosMostEngaged = aux
        },

    },

    created(){
        let endpoint = `https://api.propublica.org/congress/v1/113/senate/members.json`
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
            app.leastEngaged()
            app.mostEngaged()

            app.filterLeastEngaged()
            app.filterMostEngaged()
        });

        console.log('Fin del programa');
    }

})



