
angular.module('app')
.component('home', {
    template: '<div ng-view></div>',
    controller: function($http, $location, toastr){
        let local = this;
        local.trails = [];
        local.trailtypes = [];
        local.agegroups = {
            one: 30,
            two: 60,
            three:100
        }
        local.data = {
            age: null,
            days: null,
            intent: null
        }
        local.screenone = {};
        local.screenone.screenTwo = function(){
            if(!local.data.age || !local.data.days || 
                !local.data.intent){
                toastr.error("Please fill fields below", "Error", {
                    "timeOut": "1000",
                    "extendedTimeout": "0"
                });
            }else{
                processData();
                $location.path('/screentwo');
            }   
        }

        local.screentwo = {};
        local.screentwo.screenThree = function(){
            let trailSelected = [];
            angular.forEach(local.trails, (value,key)=>{
                value.forEach((trail)=>{
                    if(trail.select)
                    trailSelected.push(trail);
                })
            });
            if(local.data.days < trailSelected.length){
                toastr.error("You selected more trails than duration of your trip", "Error", {
                    "timeOut": "1000",
                    "extendedTimeout": "0"
                });
                return;
            }else if(local.data.days > trailSelected.length){
                toastr.error("You selected less trails than duration of your trip", "Error", {
                    "timeOut": "1000",
                    "extendedTimeout": "0"
                });
                return;
            }
            if(trailSelected.length > 0){
                makeItinerary(trailSelected);
                $location.path('/screenthree');
            }
               
        }
        local.screenthree = {};

        function processData(){
            angular.forEach(local.trails, (el)=>{
                el.forEach((trail)=>{
                    trail.select = false;
                })
            });

            local.trailtypes.forEach((el)=>{
                el.show = false;
            })

            //if only 1 day, do the easiest trail
            if(local.data.days == 1){
                local.trailtypes[0].show = true;
            }
            //if 2 days depending on age, can do 1 easy and 
            //1 tough
            else if(local.data.days == 2){
                local.trailtypes[0].show = true;
                if(local.data.age < local.agegroups.one)
                    local.trailtypes[3].show = true;
                else if(local.data.age < local.agegroups.two)
                    local.trailtypes[2].show = true;
                else if(local.data.age < local.agegroups.three)
                    local.trailtypes[1].show = true;
            //if more number of days, depending on age, 
            //can do several trails
            }else{
                if(local.data.age < local.agegroups.one){
                    local.trailtypes.forEach((el)=>{
                        el.show = true;
                    })
                }else if(local.data.age < local.agegroups.two){
                   for(let i=0;i<local.trailtypes.length-1;i++){
                       local.trailtypes[i].show = true;
                   }
                }else if(local.data.age < local.agegroups.three){
                    for(let i=0;i<local.trailtypes.length-2;i++){
                        local.trailtypes[i].show = true;
                    } 
                }
            }
        }

        function makeItinerary(trailSelected){
                local.screenthree.days = [];
                //on first day travel to Yosemite
                local.screenthree.days.push({
                    name: 0,
                    steps: ["8am: Start from San Franscisco and travel for 3 hours."]
                });
                local.screenthree.days[0].steps.push("12pm: Have lunch for an hour or so.");
                let next = trailSelected.shift();
                local.screenthree.days[0].steps.push("2pm: Hike at "+next.name+" for "+
                next.distance+" for "+next.time+" hour(s).");

                //if only 1 day, start back on the same day
                if(local.data.days ==1){
                    local.screenthree.days[0].steps.push((2+next.time)+
                    "pm: Start back for San Franscisco.");
                    return;
                }
                else {
                    //else check in at your hotel
                    local.screenthree.days[0].steps.push((2+next.time)+
                    "pm:Check in at your hotel.");
                    //day 2
                    local.screenthree.days[1] = {
                        name: 1,
                        steps: ["7am: Start your day with some breakfast."]
                    };
                    next = trailSelected.pop();
                    let hike = "8am: Hike at "+
                    next.name+" for "+next.distance+" for "+next.time+" hour(s).";
                    
                    //add previous time to get next start time
                    let nexttime = (8+next.time) > 12?8+next.time-12:8+next.time;
                    let time = (8+next.time) > 12?"pm":"am";
                    if(nexttime<=3){
                        local.screenthree.days[1].steps.push(hike);
                        local.screenthree.days[1].steps.push(nexttime+time+": Have lunch.");
                        nexttime = (2+nexttime) > 12?2+nexttime-12:2+nexttime;
                        time = 8+next.time+2 > 12?"pm":"am";
                    }else{
                        hike+="Have lunch on the way.";
                        local.screenthree.days[1].steps.push(hike);
                    }
    
                    
                    //add previous time to get next time
                    if(local.data.days == 2){   
                        local.screenthree.days[1].steps.push(nexttime+time+": Start back for San Franscisco.");
                    }else{
                        local.screenthree.days[1].steps.push(nexttime+time+": Explore the village and hotel campus!");
                        local.screenthree.days[1].steps.push("7pm: Time for dinner!");
                        for(let i=2;i<local.data.days-1;i++){
                            local.screenthree.days[i] = {
                                name: i,
                                steps: ["7am: Start your day with some breakfast."]
                            };
                            //get next hike
                            next = trailSelected.pop();
                            let hike = "8am: Hike at "+next.name+" for "+
                            next.distance+" for "+next.time+" hour(s).";
                            


                            nexttime = (8+next.time) > 12?8+next.time-12:8+next.time;
                            time = (8+next.time >12)?"pm":"am";
                            if(nexttime <= 3){
                                local.screenthree.days[i].steps.push(hike);
                                local.screenthree.days[i].steps.push(nexttime+time+": Have lunch.");
                                
                                nexttime = nexttime + 2;
                                time = (8+next.time+2 >12)?"pm":"am";
                            }else{
                                local.screenthree.days[i].steps.push(hike+"Have lunch on the way.");
                            }
                            
                            //explore other activities for the remaining time
                            local.screenthree.days[i].steps.push(nexttime+time+
                                ": Explore the village and hotel campus!");
                            local.screenthree.days[i].steps.push("7pm: Time for dinner!");
                        }
                        local.screenthree.days[local.data.days-1] = {
                            name: local.data.days-1,
                            steps: ["7am: Start your day with some breakfast."]
                        };
                        
                        next = trailSelected.shift();
                        let hike = "8am: Hike at "+next.name+" for "+
                        next.distance+" for "+next.time+" hour(s).";

                        nexttime = (8+next.time) > 12?8+next.time-12:8+next.time;
                        time = (8+next.time >12)?"pm":"am";
                        if(nexttime <= 3){
                            local.screenthree.days[local.data.days-1].
                            steps.push(hike);
                    
                            local.screenthree.days[local.data.days-1].
                                steps.push(nexttime+time+": Have lunch.");

                            nexttime = nexttime + 2;
                            time = (8+next.time+2 >12)?"pm":"am";
                        }else{
                            local.screenthree.days[local.data.days-1].
                            steps.push(hike+"Have lunch on the way.");
                        }

                        
                        
                        local.screenthree.days[local.data.days-1].
                            steps.push(nexttime+time+": Start back for San Franscisco.");
                    }
            }
            
        }

        local.$onInit= function(){
            $http({
                method: 'GET',
                url: '/api/trails'
            }).then((resp)=>{
                local.trails = resp.data;
                local.trailtypes = Object.keys(local.trails).map((el)=>{
                    return {
                        name: el,
                        show: false
                    }
                })
            })
        }
      
    }
})