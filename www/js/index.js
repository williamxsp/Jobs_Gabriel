/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    prizes:[
    {
        'name': 'Shampoo',
        'image': 'Shampoo.png'
    },

    {
        'name': 'Creme',
        'image': 'Creme.png'
    },

    {
        'name': 'Máscara',
        'image': 'Mascara.png'
    },

    {
        'name': 'Condicionador',
        'image': 'Condicionador.gif'
    },

    {
        'name': 'Elizatis',
        'image': 'Elizatis.png'
    },
    ]
    ,

    podeGanhar:false,
    podeGanhar : false,
    premio : 2, //premio padrao se podeGanhar == true
    gerarSorteio: function()
    {
        var sorteio = [app.premio, app.premio, app.premio];
       if(app.podeGanhar)
       {
        $.jSlots.setSorteio(sorteio);
    }
    else
    {

        sorteio[0] = sorteio[1] = sorteio[2] = Math.floor( Math.random() * (1 + app.prizes.length - 1) ) + 1;

        for (var i = 1; i < sorteio.length;) {
            var numero = Math.floor( Math.random() * (1 + app.prizes.length - 1) ) + 1;
            var repetido = false;
            for (var j = 0; j < sorteio.length; j++) {
                if (sorteio[j] == numero)
                {
                    repetido = true;
                    break;
                }

            };

            if(!repetido)
            {
                sorteio[i] = numero;
                i++;
            }

        };
    }
    return sorteio;
},
loadPrizes:function(prizes)
{
 for (var i = 0; i < 3; i++) {
    var div = document.createElement('div');
    var ul = document.createElement('ul');
    ul.setAttribute('data-id', i);
    for(k in prizes){
        var li = document.createElement('li');
        li.innerHTML = "<img src='img/"+prizes[k].image+"' >";
        ul.appendChild(li);
    }
    div.appendChild(ul);
    slots.appendChild(div);
};
},

rollOut:function()
{
    $('#slots ul').each(function(k, el)
    {
        $(el).css({top: -(Math.random()*app.prizes.length)*app.slotHeight*10});
    });
},
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        app.loadPrizes(app.prizes);

        $('#slots ul').jSlots({  
            spinner : '#push',  // CSS Selector: element to bind the start event to  
            winnerNumber : 4, 
             number : 1,          // Number: number of slots  
            spinEvent : 'GO', // String: event to start slots on this event  
            onStart : function(){
                $("#slots img").addClass('rolling');
            },    // Function: runs on spin start,  
            onEnd : function(){
                $("#slots img").removeClass('rolling');
            },      // Function: run on spin end. It is passed (finalNumbers:Array). finalNumbers gives the index of the li each slot stopped on in order.  
            onWin : $.noop,      // Function: run on winning number. It is passed (winCount:Number, winners:Array, finalNumbers:Array)  
            easing : 'easeOutSine',    // String: easing type for final spin. I recommend the easing plugin and easeOutSine, or an easeOut of your choice.  
            time : 5000,         // Number: total time of spin animation  
            loops : 10            // Number: times it will spin during the animation  
        }); 



$(function(){
            $("#push").draggable({ // Can't use revert, as we animate the original object
        //revert: true,

        axis: "y",
        
        create: function(){
            // When the draggable is created, save its starting
            // position into a data attribute, so we know where we
            // need to revert to.
            var $this = $(this);
            $this.data('starttop',$this.position().top);
            $this.data('height',$this.height());
            console.log($this.height());
            app.slotHeight = $("#slots").height();
        },
        stop: function(){
            // When dragging stops, revert the draggable to its
            // original starting position.
            var $this = $(this);
            $this.css({
                top: $this.data('starttop')
            });
            $(this).css({height:$this.data('height')});
            $(this).addClass('animate');
            app.rollOut();

            sorteio = app.gerarSorteio();
            $(this).trigger('GO');


        },
        start:function(event, ui){
            $(this).removeClass('animate');
        },
        drag: function(event, ui){
            // During dragging, animate the original object to
            // follow the invisible helper with custom easing.
            $this = $(this);
            if(ui.helper.position().top < $this.data('starttop') || ui.helper.position().top > 200)
                return false; 

            $(this).css({height:$this.data('height')-(ui.helper.position().top/5)})

            $(this).css({
                top: ui.helper.position().top
            });
        }
    });
});
}
};
