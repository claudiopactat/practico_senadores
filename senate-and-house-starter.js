
var app = new Vue({
    el: '#app',
    data: {
        members: [],
        select: "all",
        check: ["D","R","ID"],
    },
    
    computed: {

        filterStates(){
            return this.members.filter(member =>{ 
                if(member.state == this.select || this.select == "all"){
                    if (this.check.includes(member.party)) {
                        return member.state    
                    }
                }
            })
        },
    },

    created(){
        let senado = ''

        if (document.title.includes('Senate-Congress-113')) {
            senado = 'senate'
        }
        else {
            senado = 'house'
        }

        let endpoint = `https://api.propublica.org/congress/v1/113/${senado}/members.json`
        var misCabeceras = new Headers({"X-API-Key":"C0oposE3pso6DD7nMfzfpQ8veydVg9MqFx70rY9R"});
        var miInit = { headers: misCabeceras };

        console.log('Inicio del programa');

        fetch(endpoint, miInit)

        .then(function(response) {
            return response.json();
        })

        .then(function(myJson) {
            app.members = myJson.results[0].members
        });

        console.log('Fin del programa');
    }

})


